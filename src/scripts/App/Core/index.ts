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
    private _routing: boolean;

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

        this._routing = false;
    }

    /** Path Handler Function
     * 
     * Loads content, title, and description.
     */
    private handler(): void{
        this._routing = true;

        const context = new Context(window.location);
        let contextReady: boolean = false;

        this._target.ontransitionstart = async() => {
            this._target.ontransitionstart = undefined;

            this.handle(context, (error?: any) => {
                if(error && error !== SignalEnd){
                    context.body = makeErrorMessage(error);
                    context.title = "Error";
                    context.info = "";
                    console.error(error);
                }

                contextReady = true;
            });
        };

        this._target.ontransitionend = async() => {
            this._target.ontransitionend = undefined;

            //Wait for routing & rendering to finish
            while(!contextReady)
                await sleep(5);

            await this.display(context);

            this._routing = false;
        }

        //Start Transition Out
        this._target.style.opacity = "0";
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

        if(!this._routing){
            window.history.pushState({}, "", event.target.href);
            this.handler();
        }
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

    private display(context: Context): Promise<void>{
        return new Promise((resolve, reject)=>{
            this._target.ontransitionend = () => {
                this._target.ontransitionend = undefined
                context.execute();
                resolve();
            }
    
            this.body = context.body;
            this.title = context.title;
            this.description = context.info;
    
            //Start Transition In
            this._target.style.opacity = "";
        });
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