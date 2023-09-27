/** Application Class
 * 
 * @author Alex Malotky
 */
import Route from "./Router/Route";
import Context from "./Context";
import Router from "./Router";
import templateEngine from "./TemplateEngine";
import { SignalEnd } from "./Router/Layer";

export {Context, Router};


export default class App extends Route{
    private _ready: Function;
    private _defaultTitle: string;
    private _defaultContent: string;

    //HTML elements
    private _title: HTMLElement;
    private _target: HTMLElement;
    private _description: HTMLElement;

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
                this._target.innerHTML = makeErrorMessage(error);
                this._title.textContent = this._defaultTitle + " | Error";
                this._description = this._description;
                console.error(error);
            } else {
                this._target.innerHTML = context.body;
                this._title.textContent = this._defaultTitle + context.title === ""? "": " | " + context.title;
                this._description.setAttribute("content", context.info === ""? this._defaultContent: context.info);
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

/** Render Template File
 * 
 * Fetches template file and then renders html string.
 * 
 * @param {string} filename 
 * @param {any} args 
 * @returns {Promise<string>}
 */
export function render(filename: string, args?: any): Promise<string>{
    return new Promise((resolve, reject)=>{
        try{
            resolve(templateEngine(filename, args));
        } catch (e){
            reject(e);
        }
    })
}

/** Sleep/Wait Utility
 * 
 * Currently only used by the home page, I felt like this utility funciton should
 * be included in the app file.
 * 
 * @param {number} t - time in milliseconds.
 * @returns {Promise<void>}
 */
export function sleep(t: number): Promise<void>{
    return new Promise((res,rej)=>{
        window.setTimeout(res, t);
    });
}