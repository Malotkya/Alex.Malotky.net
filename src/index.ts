import {App, Context, View, Content} from "zim-engine";
import Template, {NavLink, ErrorContent} from "./util/Templates";

import Home from "./routes/home";
import About from "./routes/about";

const app = new App();
const navBar:Array<Content> = [];

app.view(new View(
    [
        {name: "charset", content:"UTF-8"},
        {name: "viewport", content: "width=device-wdith, initial-scale=1"},
        {name: "author", content: "Alex Malotky"},
        {name: "title", content: "Alex.Malotky.Net"},
        {name: "description", content: "Portfolio website for Alex Malotky."},
        {name: "link", attributes: {rel: "stylesheet", href: "/style.css"}},
        {name: "script", attributes:{src: "/elements.js"}}
    ],
    (c:Content)=>Template(navBar, c),
    {
        lang:"en",
        dir:"ltr"
    }
));

app.errorHandler((err:any, ctx:Context)=>{
    const {
        status = 500,
        message = err || "An Unknown Error Occured!"
    } = err;

    ctx.status(status);
    ctx.render(ErrorContent(status, message));
});

//Register to App Routing
app.use(Home.Path, Home.Router);
app.use(About.Path, About.Router);

//Register to NavBar
navBar.push(NavLink(About.Path, About.Title));

export default app;