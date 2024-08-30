import Engine, {Content} from "Engine";
import View from "Engine/View";
import Template, { NavLink, ErrorContent } from "./template";
import {Buffer} from "node:buffer";

const navBar:Array<Content> = []

const app = new Engine();
app.view = new View(
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
);
app.auth((req)=>{
    const auth = req.headers.get("authorization");

    if(auth === null)
        return null;

    const [username, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
    return {username, password};
});
app.error((err, ctx)=>{
    if(typeof err === "number"){
        err = new HttpError(err);
    }

    const status = err.code || err.status || 500;
    const message = err.message || String(err);

    ctx.status(status).render(ErrorContent(status, message));
    return ctx.flush();
})

import Home from "./routes/home";
import About from "./routes/about";
import Portfolio from "./routes/portfolio";
import Pokemon from "./routes/pokemon";
import Login from "./routes/login";
import HttpError from "Engine/HttpError";

app.use(Home);
app.use(About);
app.use(Portfolio);
app.use(Pokemon);
app.use(Login);

navBar.push(NavLink(Portfolio.path, "Protfolio"));
navBar.push(NavLink(About.path, "About Me"));

export default app;