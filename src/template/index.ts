import { Content, createContent as _, View} from "Engine";
import { getMessage } from "Engine/HttpError";
import { RenderUpdate } from "Engine/View";
import Navigation, {NavLink} from "./navBar";
import Footer from "./footer";

export {NavLink};

export default function Template():[Array<Content>, View]{
    const navBar:Array<Content> = [];
    return [
        navBar,
        new View(
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
            (content:Content) => [
                _("header", 
                    _("a", {class: "skip", href:"#main"}, "Skip Link"),
                    Navigation(navBar),
                ),
                _("noscript", "Javascript is currently needed to view some pages."),
                _("main", {id: "main"}, content),
                Footer()
            ]
        )
    ]
}

export function ErrorContent(status:number, message:string):RenderUpdate {
    message = `${status}: ${message}`;
    return {
        head: {
            title: getMessage(status) || "Error"
        },
        body: _("p", {class: "error", id: "error"}, message),
        update: {
            error: message
        }
    }
}