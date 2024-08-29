import Engine, {Content} from "Engine";
import View from "Engine/View";
import Template, { NavLink } from "./template";

const navBar:Array<Content> = []

const app = new Engine(new View(
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
            {src: "/script.js", defer: true}
        ]
    },
    (update)=>Template(navBar, update)
));

import Home from "./routes/home";
import About from "./routes/about";
import Portfolio from "./routes/portfolio";
import Pokemon from "./routes/pokemon";

app.use(Home.Path, Home.Router);
app.use(About.Path, About.Router);
app.use(Portfolio.Path, Portfolio.Router);
app.use(Pokemon.Path, Pokemon.Router);

navBar.push(NavLink(Portfolio.Path, "Protfolio"));
navBar.push(NavLink(About.Path, "About Me"));

export default app;