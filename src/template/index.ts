/** /template
 * 
 * @author Alex Malotky
 */
import { Content, createElement as _, View, RenderUpdate} from "zim-engine";
import { getMessage } from "zim-engine/HttpError";
import Navigation, {NavLink} from "./navBar";
import Footer from "./footer";

export {NavLink};

/** Build View Template
 * 
 * @returns {[Array, View]}
 */
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
                    { charset: "utf-8" },
                    { name: "viewport",    content: "width=device-width, initial-scale=1" },
                    { name: "author",      content: "Alex Malotky" },
                    { name: "description", content: "Portfolio website for Alex Malotky." }
                ],
                links: [
                    {rel: "stylesheet", href: `/style.css?${VERSION}`}
                ],
                scripts: [
                    {src: `/bundle.js?${VERSION}`, defer: true}
                ],
                styles: [
                    {value: "html{ visibility: hidden; opacity:0; transition: opacity 250ms; }"}
                ]
            },
            (args) => [
                _("header", 
                    _("a", {class: "skip", href:"#main"}, "Skip Link"),
                    Navigation(navBar),
                ),
                _("noscript", "Javascript is needed for some pages to be viewed properly."),
                _("main", {id: "main"}, args["main"]),
                Footer()
            ]
        )
    ]
}

/** Error Content
 * 
 * @param {number} status 
 * @param {string} message 
 * @returns {RenderUpdate}
 */
export function ErrorContent(status:number, message:string):RenderUpdate {
    return {
        head: {
            title: getMessage(status) || "Error"
        },
        body: {
            main: _("p", {class: "error", id: "error"},  `${status}: ${message}`),
        },
        update: {
            error: message
        }
    }
}