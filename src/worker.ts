/** /worker
 * 
 * @author Alex Malotky
 */
import jwt from '@tsndr/cloudflare-worker-jwt';
import Engine, {Authorization} from "zim-engine";
import Template, { NavLink, ErrorContent } from "./template";
import {parse, serialize} from "cookie";

const MAX_LOGIN_AGE = 604800;
const {SECRET} = require("./secrets.json");
const [navBar, view] = Template();

const app = new Engine();
app.view(view, false);

//Authentication Handler
const auth = new Authorization();
auth.get(async(req)=>{
    const {auth} = parse(req.headers.get("Cookie") || "");

    if(typeof auth !== "string")
        return null;

    if( !(await jwt.verify(auth, SECRET)) )
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
        }, SECRET);
    
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
    let status  = Number(err.status);
    let message = String(err.message);

    if(isNaN(status))
        status = 500;

    ctx.status(status)
        .render(ErrorContent(status, message))
});

import Home from "./routes/home";
import Resume from './routes/resume';
import About from "./routes/about";
import Portfolio from "./routes/portfolio";
import Pokemon from "./routes/pokemon";
import Login, {Logout} from "./routes/login";
import Magic from "./routes/magic";
import Blog from './routes/blog';

app.use(Home);
app.use(Resume);
app.use(About);
app.use(Portfolio);
app.use(Pokemon);
app.use(Magic);
app.use(Login);
app.use(Logout);
app.use(Blog);

navBar.push(NavLink(Resume.path, "Resume"));
navBar.push(NavLink(Portfolio.path, "Protfolio"));
navBar.push(NavLink(About.path, "About Me"));
navBar.push(NavLink(Blog.path, "Blog"));

//export default app;
export default {
    fetch(req:Request, env:Env){
        return app.fetch(req, env);
    }
};