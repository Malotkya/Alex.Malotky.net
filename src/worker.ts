import jwt from '@tsndr/cloudflare-worker-jwt';
import Engine, {Content, Context, HttpError, Authorization} from "zim-engine";
import { getMessage } from 'zim-engine/lib/HttpError';
import Template, { NavLink, ErrorContent } from "./template";
import {parse, serialize} from "cookie";

const MAX_LOGIN_AGE = 604800;

const [navBar, view] = Template();

const app = new Engine();
app.view(view);

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
    let status:number;
    let message:string;
    switch (typeof err){
        case "string":
            status = 500;
            message = err;
            break;

        case "bigint":
            err = Number(err);

        case "number":
            status = err;
            message = getMessage(err) || "An unknown Error occured!";
            break;

        default:
            status = Number(err.code || err.status || 500);
            message = err.message || String(err);
    }

    const contentType = (ctx.request.headers.get("Accept") || "").toLocaleLowerCase();

    ctx.status(status);

    if(ctx.expectsRender() || contentType.includes("html")) {
        ctx.render(ErrorContent(status, message))
    } else if(contentType.includes("json")) {
        ctx.json({status, message});
    } else {
        ctx.text(message);
    }
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