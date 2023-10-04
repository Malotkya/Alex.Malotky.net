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
    private _loadingError: Array<any>;

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

        this._loadingError = [];

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
                    if(error.additional)
                        console.error(error.additional);
                    console.error(error);
                }

                contextReady = true;
            });
        };

        this._target.ontransitionend = async() => {
            this._target.ontransitionend = undefined;

            //Wait for routing & rendering to finish
            while(!contextReady)
                await sleep();

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

        if(!this._routing && this._loadingError.length === 0){
            window.history.pushState({}, "", event.target.href);
            this.handler();
        }
    }

    /** Start App Function
     * 
     */
    private start(): void{
        try {
            this._title = findOrCreateNode("title", "head");
            this._target = findOrCreateNode("main");
            this._description = findOrCreateNode("meta[name='description'", "head");
        } catch (err){
            this.failed(err);
        }

        this._defaultTitle = this._title.textContent;
        this._defaultContent = this._description.getAttribute("content");
        if(this._defaultContent === null){
            this._defaultContent = "";
        }

        if(this._loadingError.length > 0){
            this._target.innerHTML = makeErrorMessage("App Failed to Load!");

            for(let err of this._loadingError){
                console.error(err);
            }
        } else {
            this.handler();

            if(this._ready)
                this._ready();
        }
    }

    protected failed(err: any){
        if(err)
            this._loadingError.push(err);
        else
            this._loadingError.push(new Error("Failed without a reason!"));
    }

    /** Use Middleware or Route override
     * 
     * originaly: use(path:string|Array<string> = "", middleware:Middleware|Router)
     * 
     * @param {string|Array<string>} path 
     * @param {Middleware|Router} middleware
     * @returns {Core}
     */
    public use(...args:Array<any>): Core{
        try {
            super.use(...args);
        } catch(err: any){
            this.failed(err);
        }

        return this;
    }

     /** On Ready Event Callback
     * 
     * @param {Function} callback
     */
    public onReady(callback: Function): void{
        if(typeof callback !== "function")
            this.failed( new TypeError("Callback must be a function!") );
            
        this._ready = callback;
    }

    private display(context: Context): Promise<void>{
        return new Promise((resolve, reject)=>{
            this._target.ontransitionend = async() => {
                this._target.ontransitionend = undefined
                await context.execute(context);
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
        } else if(this._defaultTitle !== ""){
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

/** Html Error Class
 * 
 */
export class HtmlError extends Error{
    private  _code:number;

    /** Constuctor
     * 
     * @param {number} code 
     * @param {string} message 
     */
    constructor(code:number, message:string){
        super(message);
        this._code = code;
    }

    /** Error Code Getter;
     * 
     */
    get code(){
        return this._code;
    }
}

/** Make Error Message
 * 
 * Builds easy to read error message for html page.
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
 * 
 * @param {number} t - time in milliseconds.
 * @returns {Promise<void>}
 */
export function sleep(t: number = 5): Promise<void>{
    return new Promise((res,rej)=>{
        window.setTimeout(res, t);
    });
}

/** Attempts to find node, and parents of node.
 * 
 * If nothing is entered, document body is reterned.
 * Will create and append node to parents if not found.
 * 
 * @param {string} name 
 * @param {Array<string>} parents 
 * @returns {HTMLElement}
 */
export function findOrCreateNode(name?:string, ...parents:Array<string>): HTMLElement{

    if(typeof name === "undefined"){
        return document.body;
    } else if(typeof name !== "string"){
        throw new TypeError(`Unknown type '${typeof name}' for query string`);
    }

    let node:HTMLElement = document.querySelector(name);
    if(node)
        return node;

    node = findOrCreateNode(...parents);

    let attributes: Array<string>;
    let index = name.indexOf("[");
    if(index > 0){
        attributes = name.replace(/.*?\[(.*?)='(.*?)'\]?/gm, "$1=$2 ").split(/\s+/gm);
        if(attributes === null){
            attributes = [];
        }
        name = name.substring(0, index);
    }

    let id:string;
    let className:string;

    index = name.indexOf("#");
    if(index >= 0) {
        id = name.substring(index+1);
        name = name.substring(0, index);
    }

    index = name.indexOf(".");
    if(index >= 0) {
        className = name.substring(index+1);
        name = name.substring(0, index);
    }

    if(name.trim().length === 0){
        name = "div";
    }

    let newNode = document.createElement(name);
    if(id)
        newNode.id = id;
    if(className)
        newNode.className = className;

    for(let string of attributes){
        string = string.trim();
        if(string.length > 3){
            const buffer = string.split("=");
            newNode.setAttribute(buffer[0], buffer[1]);
        }
    }

    node.appendChild(newNode);

    return newNode;
}