/** /tmplate/navBar
 * 
 * @author Alex Malotky
 */
import { Content, createElement as _} from "zim-engine";

/** Nav Link Item
 * 
 * @param {string} href 
 * @param {string} title 
 * @returns {Content}
 */
export function NavLink(href:string, title:string):Content{
    return  _("li",
        _("a", {class: "top-nav-item", href:href}, title)
    );
}

/** Hamburger Button
 * 
 * @returns {Content}
 */
export function HamburgerButton():Content {
    return _("button",
        {
            id: "top-nav-button",
            ariaLabel: "Show/Hide Navigation",
            ariaHaspopup: "menu"
        },
        _("div"),
        _("div"),
        _("div")
    );
}

/** Navigation Bar
 * 
 * @param {Content[]} list 
 * @returns {Content}
 */
export default function Navigation(list:Content[]):Content {
    return _("nav", {id:"top-nav-bar"},
        _("a", {id: "top-nav-title", class: "top-nav-item", href: "/"}, "Alex.Malotky.net"),
        HamburgerButton(),
        _("div", {class: "top-nav-menu-wrapper"},
            _("ul", {id: "top-nav-menu"}, list)
        )
    );
}