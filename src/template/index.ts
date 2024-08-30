import { Content, Context, createContent as _} from "Engine";
import { RenderUpdate, RenderFunction } from "Engine/View";
import HttpError, { getMessage } from "Engine/HttpError";

export default function WireFrame(navList:Content):RenderFunction{
    return function Template(content:Content){
        return _("header", 
            _("a", {class: "skip", href:"#main"}, "Skip Link"),
            Navigation(navList),
        ) + _("main", {id: "main"}, content) + Footer();
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

export function ErrorContent(err:any, ctx:Context):RenderUpdate {
    switch (typeof err){
        case "string":
            err = new HttpError(500, err);
            break;

        case "bigint":
            err = new HttpError(Number(err));
            break;

        case "number":
            err = new HttpError(err);
            break;

        case "object":
            if( !(err instanceof Error) ){
                if( err.message === undefined || (err.status === undefined && err.code == undefined) ){
                    err = new HttpError(500, JSON.stringify(err));
                }
            }
            break;

        default:
            err = new HttpError(500, "An unknown Error occured!");
    }

    const status = err.code || err.status || 500;
    const message = `${status}: ${err.message}`;

    return {
        head: {
            title: getMessage(status) || "Error"
        },
        body: _("p", {class: "error"}, message),
        update: {
            error: message
        },
        error: {
            message: err.message,
            stack: err.stack,
            cause: err.cause,
            status: status
        }
    };
}