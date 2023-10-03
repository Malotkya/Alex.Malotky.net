
/** App/Navbar.ts
 * 
 * @author Alex Malotky
 */
import {Router} from "..";
import { findOrCreateNode } from "../Core";
import { createHambergerButton, createMenuList, createNavTitle } from "./html";

/** Navigation Bar Class
 * 
 */
export default class NavBar{
    private _list: HTMLElement;
    private _home: HTMLElement;

    /** Constructor w/ selector string.
     * 
     */
    constructor(){

        let target = findOrCreateNode("nav", "header");

        if(typeof target === "undefined")
            throw new Error("Unable to find NavBar!");
        
        this._home = createNavTitle("Alex.Malotky.net");
        target.appendChild(this._home);

        let button = createHambergerButton();
        target.appendChild(button);

        this._list = createMenuList();
        target.appendChild(this._list);
        
        //Toggle the list display
        button.addEventListener("click", event=>{
            event.stopPropagation();
           if(this._list.style.display){
                this._list.style.display = "";
           } else {
                this._list.style.display = "flex";
           }
        })

        document.addEventListener("click", event=>{
            this._list.style.display = "";
        });
    }

    /** Routeing Event Listener Callback
     * 
     * Used to call app._route() when navbar is clicked.
     * 
     * @param {EventListener} callback 
     */
    public routeEvent(callback: EventListener): void{
        if(typeof callback !== "function")
            throw new TypeError("Event Listener must be a Function");

        this._home.addEventListener("click", event=>{
            this._list.style.display = "";
            callback(event)
        });

        this._list.addEventListener("click", event=>{
            this._list.style.display = "";
            callback(event);
        });
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
        this._list.appendChild(item);
    }
}