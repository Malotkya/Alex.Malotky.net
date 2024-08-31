import jwt from '@tsndr/cloudflare-worker-jwt';
import Engine, {Content} from "Engine";
import View from "Engine/View";
import Template, { NavLink, ErrorContent } from "./template";
import {parse, serialize} from "cookie";
import Authorization from 'Engine/Authorization';

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
            { name: "viewport",    content: "width=device-wdith, initial-scale=1"},
            { name: "author",      content: "Alex Malotky"},
            { name: "description", content: "Portfolio website for Alex Malotky."}
        ],
        links: [
            {rel: "stylesheet", href: "/style.css"}
        ],
        scripts: [
            {src: "/bundle.js", defer: true}
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
app.error((err, ctx)=>{
    if(typeof err === "number"){
        err = new HttpError(err);
    }

    const status = err.code || err.status || 500;
    const message = err.message || String(err);

    ctx.status(status).render(ErrorContent(status, message));
    return ctx.flush();
});

import Home from "./routes/home";
import About from "./routes/about";
import Portfolio from "./routes/portfolio";
import Pokemon from "./routes/pokemon";
import Login, {Logout} from "./routes/login";
import HttpError from "Engine/HttpError";

app.use(Home);
app.use(About);
app.use(Portfolio);
app.use(Pokemon);
app.use(Login);
app.use(Logout);

navBar.push(NavLink(Portfolio.path, "Protfolio"));
navBar.push(NavLink(About.path, "About Me"));

export default app;