import Engine, {Content} from "Engine";
import View from "Engine/View";
import Template, { NavLink } from "./template";
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

import Home from "./routes/home";
import About from "./routes/about";
import Portfolio from "./routes/portfolio";
import Pokemon from "./routes/pokemon";

app.use(Home);
app.use(About);
app.use(Portfolio);
app.use(Pokemon);

navBar.push(NavLink(Portfolio.path, "Protfolio"));
navBar.push(NavLink(About.path, "About Me"));

export default app;