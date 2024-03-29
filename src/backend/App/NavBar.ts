
/** App/Navbar.ts
 * 
 * @author Alex Malotky
 */
import {Router} from ".";
import { findOrCreateElement, createElement } from "../../util/Elements";

/** Navigation Bar Class
 * 
 */
export default class NavBar{
    private _list: HTMLElement;
    private _home: HTMLElement;
    private _nav: HTMLElement;
    private _route: EventListener|undefined;

    /** Constructor w/ selector string.
     * 
     */
    constructor(){

        this._nav = findOrCreateElement("nav", "header");
        
        this._home = createElement("a", {
            id: "top-nav-title",
            class: "top-nav-item",
            href: "/"
        }, "Alex.Malotky.net");
        this._nav.appendChild(this._home);

        let button = createElement("button", {id: "top-nav-button", "aria-label": "Show/Hide Navigation", "aria-haspopup": "menu"}, 
            createElement("div"),
            createElement("div"),
            createElement("div")
        );
        this._nav.appendChild(button);

        this._list = createElement("ul", {id: "top-nav-menu"});
        this._nav.appendChild(this._list);
        
        //Toggle the list display
        button.addEventListener("click", event=>{
            event.stopPropagation();
           if(this._list.style.display){
                this._list.style.display = "";
           } else {
                this._list.style.display = "flex";
           }
        });

        //Close nav
        document.addEventListener("click", event=>{
            this._list.style.display = "";
            if(this._route)
                this._route(event);
        });
    }

    /** Routeing Event Listener Callback
     * 
     * Used to call app._route() when navbar is clicked.
     * 
     * @param {EventListener} callback 
     */
    public routeEvent(callback: EventListener):void{
        if(typeof callback !== "function")
            throw new TypeError("Event Listener must be a Function");

        this._route = callback;
    }

    /** Add link to router in navigation bar.
     * 
     * @param {Router} router 
     */
    public add(router: Router):void{
        if( !(router instanceof Router) )
            throw new TypeError("router must be an instace of a Router!");

        let item = document.createElement("li");
        let link = document.createElement("a");
        link.className = "top-nav-item";
        link.href = router.href;
        link.textContent = router.title;
        item.appendChild(link);

        /*const subRouters = router.subRouters();
        if(subRouters.length > 0){
            //TODO: create drop down if router has sub-routes. 
            console.log(subRouters);
        }*/

        this._list.appendChild(item);
    }
}