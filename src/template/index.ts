import { Content, Context, createContent as _} from "Engine";
import { RenderFunction, RenderUpdate } from "Engine/View";
import HttpError, { getMessage } from "Engine/HttpError";

function showMenu(){
    const menu = document.querySelector("#top-nav-menu") as HTMLElement;

    if(menu){
        if( menu.style.display ) {
            menu.style.display = "";
        } else {
            menu.style.display = "flex";
        }
    } else {
        console.warn("Unable to find menu!");
    }
}

export default function WireFrame(navList:Content):RenderFunction{
    return function Template(content:Content){
        return _("header", 
            _("a", {class: "skip", href:"#main"}, "Skip Link"),
            Navigation(navList),
        ) + _("noscript", "Javascript is currently needed to view some pages.")
          + _("main", {id: "main"}, content) + Footer();
    }
}

export function NavLink(href:string, title:string):Content{
    return  _("li",
        _("a", {class: "top-nav-item", href:href}, title)
    );
}

export function HamburgerButton():Content {
    return _("button",
        {
            id: "top-nav-button",
            ariaLabel: "Show/Hide Navigation",
            ariaHaspopup: "menu",
            onclick: showMenu
        },
        _("div"),
        _("div"),
        _("div")
    );
}

function Navigation(list:Content):Content {
    return _("nav", {id:"top-nav-bar"},
        HamburgerButton(),
        _("a", {id: "top-nav-title", class: "top-nav-item", href: "/"}, "Alex.Malotky.net"),
        _("ul", {id: "top-nav-menu"}, list)
    );
}

function Footer():Content {
    return _("footer", 
        _("p", _("strong", "Where to find me:")),
        _("p",
            _("a", {href:"https://github.com/Malotkya", target:"_blank"},
                _("img", {src: "/media/github.svg", alt:"GitHub", class:"icon"} )
            ),
            " ",
            _("a", {href:"https://www.linkedin.com/in/amalotky/", target:"_blank"},
                _("img", {src: "/media/linkedin.svg", alt:"LinkedIn", class:"icon"} )
            ),
            " ",
            _("a", {href:"mailto: Malotkya@outlook.com"},
                _("img", {src: "/media/email.png", alt:"Email", class:"icon"} )
            )
        )
    )
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