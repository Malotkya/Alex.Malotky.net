import jwt from '@tsndr/cloudflare-worker-jwt';
import Engine, {Content, Context, HttpError} from "Engine";
import View from "Engine/View";
import Authorization from 'Engine/Authorization';
import Template, { NavLink, ErrorContent } from "./template";
import {parse, serialize} from "cookie";

const MAX_LOGIN_AGE = 604800;

const navBar:Array<Content> = []

const app = new Engine();
app.view(new View(
    {
        lang: "en",
        dir: "ltr"
    },
    {
        title: "Alex.Malotky.net",
        meta: [
            { charset: "utf-8"},
            { name: "viewport",    content: "width=device-width, initial-scale=1"},
            { name: "author",      content: "Alex Malotky"},
            { name: "description", content: "Portfolio website for Alex Malotky."}
        ],
        links: [
            {rel: "stylesheet", href: `/style.css?${VERSION}`}
        ],
        scripts: [
            {src: `/bundle.js?${VERSION}`, defer: true}
        ]
    },
    Template(navBar)
));

//Authentication Handler
const auth = new Authorization();
auth.get(async(req)=>{
    const {auth} = parse(req.headers.get("Cookie") || "");

    if(typeof auth !== "string")
        return null;

    if( !(await jwt.verify(auth, "secret")) )
        return null;
    
    const {payload} = jwt.decode(auth);
    return payload as User;
})
auth.set(async(res, user)=>{
    if(user === null){
        //Logout
        res.headers.set("Set-Cookie",
            serialize("auth", "", {
                httpOnly: true,
                maxAge: 0,
                sameSite: "lax",
                path: "/"
            })
        );
    } else {
        //Login
        const token = await jwt.sign({
            ...user,
            exp: Math.floor(Date.now() / 1000) + MAX_LOGIN_AGE
        }, "secret");
    
        res.headers.set("Set-Cookie",
            serialize("auth", token, {
                httpOnly: true,
                maxAge: MAX_LOGIN_AGE,
                sameSite: "lax",
                path: "/"
            })
        )
    }
    
});
app.auth(auth);

//Error Handler
app.error((err:any, ctx:Context)=>{
    switch (typeof err){
        case "string":
            err = new HttpError(500, err);
            break;

        case "bigint":
            err = new HttpError(Number(err));
            break;

        case "number":
            err = new HttpError(err);
            break;

        case "object":
            if( !(err instanceof Error) ){
                if( err.message === undefined || (err.status === undefined && err.code == undefined) ){
                    err = new HttpError(500, JSON.stringify(err));
                }
            }
            break;

        default:
            err = new HttpError(500, "An unknown Error occured!");
    }

    const status = Number(err.code || err.status || 500);
    const message = `${status}: ${err.message}`;
    const contentType = (ctx.request.headers.get("Accept") || "").toLocaleLowerCase();

    ctx.status(status);

    if(ctx.expectsRender() || contentType.includes("html")) {
        ctx.render(ErrorContent(status, message, err))
    } else if(contentType.includes("json")) {
        ctx.json({status, message});
    } else {
        ctx.text(message);
    }

    return ctx.flush();
});

import Home from "./routes/home";
import Resume from './routes/resume';
import About from "./routes/about";
import Portfolio from "./routes/portfolio";
import Pokemon from "./routes/pokemon";
import Login, {Logout} from "./routes/login";
import Magic from "./routes/magic";

app.use(Home);
app.use(Resume);
app.use(About);
app.use(Portfolio);
app.use(Pokemon);
app.use(Magic);
app.use(Login);
app.use(Logout);

navBar.push(NavLink(Resume.path, "Resume"));
navBar.push(NavLink(Portfolio.path, "Protfolio"));
navBar.push(NavLink(About.path, "About Me"));

//export default app;
export default {
    fetch(req:Request, env:Env){
        return app.fetch(req, env);
    }
};