/** /App/Core.ts
 * 
 * @author Alex Malotky
 */
import Route from "./Router/Route";
import Context from "./Context";
import { SignalEnd } from "./Router";

/** Application Core Class
 * 
 * Interacts with and overrides browser functinoality.
 */
export default class Core extends Route{
    private _ready: Function;
    private _defaultTitle: string;
    private _defaultContent: string;

    //HTML elements
    private _title: HTMLElement;
    private _target: HTMLElement;
    private _description: HTMLElement;

    /** Constructor
     * 
     */
    constructor(){
        super();
        
        window.onpopstate = () => this.handler();
        window.onload = () => this.start();
        (window as any).route = () => this.route();
    }

    /** Path Handler Function
     * 
     * Loads content, title, and description.
     */
    private handler(): void{
        const context = new Context(window.location);
        this.handle(context, (error?: any) => {
            if(error && error !== SignalEnd){
                this.body = makeErrorMessage(error);
                this.title = "Error";
                this.description = "";
                console.error(error);
            } else {
                this.body = context.body;
                this.title = context.title;
                this.description = context.info;
                context.execute();
            }
        });
    }

    /** Route Clicked Function
     * 
     * This function currently only triggers on navbar clicks,
     * I am unsure if I will be adding this to other internal links.
     * 
     * @param {Event} event 
     */
    protected route(event?: any): void{
        event = event || window.event;
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        this.handler();
    }

    /** Start App Function
     * 
     */
    private start(): void{
        this._title = document.querySelector("title");
        this._target = document.querySelector("main");
        this._description = document.querySelector("meta[name='description'");

        this._defaultTitle = this._title.textContent;
        this._defaultContent = this._description.getAttribute("content");

        this.handler();

        if(this._ready)
            this._ready();
    }

     /** On Ready Event Callback
     * 
     * @param {Function} callback
     */
    public onReady(callback: Function): void{
        if(typeof callback !== "function")
            throw new TypeError("Callback must be a function!");
            
        this._ready = callback;
    }

    protected set body(value: string){
        this._target.innerHTML = value;
    }

    protected set title(value: string){
        if(typeof value === "undefined" || value === ""){
            value = this._defaultTitle;
        } else {
            value = this._defaultTitle.concat(" | ", value);
        }

        this._title.textContent = value;
    }

    protected set description(value: string){
        if(typeof value === "undefined" || value === ""){
            value = this._defaultContent;
        }

        this._description.setAttribute("content", value);
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