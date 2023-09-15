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
    private _defaultTitle: string;
    private _defaultContent: string;

    //HTML elements
    private _title: HTMLElement;
    private _target: HTMLElement;
    private _description: HTMLElement;

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
    private _handler(): void{
        let location:string = window.location.pathname;
    
        let r = this._getRouter(location);

        if(this._description)
            this._description.setAttribute("content", r.description !== ""? r.description: this._defaultContent);

        if(this._title)
            this._title.textContent = (r.title !== ""? r.title + " | ": "") + this._defaultTitle;

        r.renderDisplay(this._target)
            .catch(console.error);
    }

    /** Route Clicked Function
     * 
     * This function currently only triggers on navbar clicks,
     * I am unsure if I will be adding this to other internal links.
     * 
     * @param {Event} event 
     */
    protected _route(event?: any): void{
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
    private _getRouter(url: string): Content{
        for(let router of this._routes){
            if(router.matches(url))
                return router;
        }

        let fourzerofour = new Content("404", "");
        fourzerofour.set(makeErrorMessage(`Unable to find '${url}'`, 404));
        return fourzerofour;
    }

    /** Start App Function
     * 
     */
    private _start(): void{
        this._title = document.querySelector("title");
        this._target = document.querySelector("main");
        this._description = document.querySelector("meta[name='description'");

        this._defaultTitle = this._title.textContent;
        this._defaultContent = this._description.getAttribute("content");

        this._handler();

        if(this._ready)
            this._ready();
    }

     /** On Ready Event Callback
     * 
     * @param {Function} callback
     */
    public onReady(callback: Function): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");
            
        this._ready = callback;
    }
}

/** Make Error Message
 * 
 * Prints easy to read error message for html page.
 * 
 * @param {any|string} error 
 * @param {string|number} code
 * @returns {string}
 */
export function makeErrorMessage(error: any|string, code?: string|number): string{
    let message: string;
    if(typeof error === "string"){
        message = error;
    } else {
        message = error.message || "An unknown error occured!";
    }

    if(typeof code === "undefined") {
        code = error.code || "Error";
    }
    
    return `<h1 class="error">${code}: ${message}</h1>`;
}