import Router from "./Router";

/** Navigation Bar Class
 * 
 * @author Alex Malotky
 */
export default class NavBar{
    private _list: HTMLElement;
    private _home: HTMLElement;

    /** Constructor w/ selector string.
     * 
     * @param {string} id 
     */
    constructor(id: string){
        let target = document.querySelector(id);

        if(typeof target === "undefined")
            throw new Error("Unable to find NavBar!");

        this._list = target.querySelector("#top-nav-menu");
        this._home = target.querySelector("#top-nav-title");

        if(typeof this._list === "undefined") {
            throw new Error("Unable to find nav list!");
        }

        if(typeof this._home === "undefined") {
            throw new Error("Unable to find nav title!");
        }

        let button = target.querySelector("#top-nav-button");
        if(button){
            button.addEventListener("click", ()=>{
               if(this._list.style.display){
                    this._list.style.display = "";
               } else {
                    this._list.style.display = "flex";
               }
            })
        } else {
            throw new Error("Unable to find nav button!");
        }

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
    routeEvent(callback: EventListener){
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