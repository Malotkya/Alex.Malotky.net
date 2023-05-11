import Router from "./Router";

/** Navigation Bar Class
 * 
 * @author Alex Malotky
 */
export default class NavBar{
    private _list: HTMLElement;

    /** Constructor w/ selector string.
     * 
     * @param {string} target 
     */
    constructor(target: string){
        this._list = document.querySelector(target);
        if(typeof this._list === "undefined")
            throw new Error("Unable to find NavBar!");
    }

    /** Routeing Event Listener Callback
     * 
     * Used to call app._route() when navbar is clicked.
     * 
     * @param {EventListener} callback 
     */
    routeEvent(callback: EventListener){
        this._list.addEventListener("click", callback);
        let title = document.querySelector("#top-nav-title");
        if(title)
            title.addEventListener("click", callback);
    }

    /** Add link to router in navigation bar.
     * 
     * @param {Router} router 
     */
    add(router: Router){
        let item = document.createElement("li");
        let link = document.createElement("a");
        link.className = "top-nav-item";
        link.href = router.href;
        link.textContent = router.title;
        item.appendChild(link);
        this._list.appendChild(item);
    }
}