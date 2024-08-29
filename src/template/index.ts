import { Content, createContent as _} from "Engine";
import { RenderUpdate } from "Engine/View";

export default function WireFrame(navList:Content, content:Content){
    return _("header", 
        _("a", {class: "skip", href:"#main"}, "Skip Link"),
        Navigation(navList),
    ) + _("main", content) + Footer();
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
            "aria-label": "Show/Hide Navigation",
            "aria-haspopup": "menu"
        },
        _("div"),
        _("div"),
        _("div")
    );
}

function Navigation(list:Content):Content {
    return _("nav", {id:"top-nav-bar"},
        _("a", {id: "top-nav-title", class: "top-nav-item", href: "/"}, "Alex.Malotky.net"),
        HamburgerButton(),
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
            _("a", {href:"https://www.linkedin.com/in/amalotky/", target:"_blank"},
                _("img", {src: "/media/linkedin.svg", alt:"LinkedIn", class:"icon"} )
            ),
            _("a", {href:"mailto: Malotkya@outlook.com"},
                _("img", {src: "/media/email.png", alt:"Email", class:"icon"} )
            )
        )
    )
}

export function ErrorContent(status:number, message:string):RenderUpdate {
    const string = `${status}: ${message}`;

    return {
        head: {
            title: string
        },
        body: _("h2", {class:"error"}, string)
    };
}