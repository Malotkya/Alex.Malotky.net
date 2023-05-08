import Content from "./Content";
import Router from "../Router";

/** Base Application Class
 * 
 * This class is a layer of abstration between the application class and the window/dom elements.
 * 
 * @author Alex Malotky
 */
export default class App_Base{
    private _ready: Function;
    protected _routes: Array<Router>

    //HTML elements
    private _title: HTMLElement;
    private _target: HTMLElement;
    private _description: HTMLElement;
    private _script: HTMLElement;

    constructor(window: any){

        //Dirty trick because typscript doesn't like window.route.
        if(window) {
            window.onpopstate = () => this._handler();
            window.route = () => this._route();
            window.onload = () => this._start();
        } else
            throw new Error("App needs window to work!");

        this._routes = [];
    }

    /** Path Handler Function
     * 
     * Loads content, title, and description.
     */
    private _handler(){
        let location:string = window.location.pathname;
        if(location.length === 0)
            location = "/";
    
        let r = this._getRouter(location);

        if(this._description)
            this._description.setAttribute("content", r.description);

        if(this._title)
            this._title.textContent = r.title;

        if(this._script)
            document.body.removeChild(this._script);
    
        r.html.then(content=>{
            this._target.innerHTML = content;
            r.js.then(element=>{
                if(element instanceof HTMLElement)
                    this._script = element;
                else
                    this._script = undefined;
            }).catch(console.error);
            
        }).catch( error=>{
            this._target.innerHTML = `<h2>${error.message || "An unknown error occured!"}</h2>`;
            console.error(error);
        });
    }

    /** Route Clicked Function
     * 
     * This function currently only triggers on navbar clicks,
     * I am unsure if I will be adding this to other internal links.
     * 
     * @param {Event} event 
     */
    protected _route(event?: any){
        event = event || window.event;
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        this._handler();
    }

    /** Get Router Function
     * 
     * I may have this start returning a list with middleware in addition to routers being returned.
     * 
     * @param url 
     * @returns {Content}
     */
    private _getRouter(url: string){
        for(let router of this._routes){
            if(router.matches(url))
                return router;
        }

        let fourzerofour = new Content("404", "");
        fourzerofour.set("<h2>Unable to find: " + url + "</h2>");
        return fourzerofour;
    }

    /** Start App Function
     * 
     */
    private _start(){
        this._title = document.querySelector("title");
        this._target = document.querySelector("main");
        this._description = document.querySelector("meta[name='description'");

        this._handler();

        if(this._ready)
            this._ready();
    }

     /** On Ready Event Callback
     * 
     * @param {Function} callback
     */
    onReady(callback: Function){
        this._ready = callback;
    }
}