/** /App/Core.ts
 * 
 * @author Alex Malotky
 */
import Route from "./Router/Route";
import Context from "./Context";
import { findOrCreateElement } from "../../../util/Elements";

const CSS_TRANSITION_TIME = 500;//ms

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
    private _history: Array<string>;

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
        window.route = (href:string, body?:BodyData) => this.route(href, body);

        window.addEventListener("resize", ()=>this.fireChildReadyEvents());

        this._history = [];
        this._loadingError = [];
        this._routing = false;
    }

    /** Path Handler Function
     * 
     * Loads content, title, and description.
     */
    private handler(timeout:number = CSS_TRANSITION_TIME, body?:BodyData): Promise<void>{
        return new Promise((resolve, reject)=>{
            this._routing = true;
            const context = new Context(window.location, body);
            this._target.style.opacity = "0";

            context.onDone((newPath?:string, body?:any)=>{
                if(newPath) {
                    if(newPath === "back")
                        newPath = this.back;

                    this.go(newPath, 0, body);
                    this._routing = false;
                    resolve();
                } else {
                    this.display(context).then(()=>{
                        this._routing = false;
                        resolve();
                    }).catch(reject);
                }

                
            }, timeout);           

            this.handle(context).catch((error:any)=>{
                context.body = makeErrorMessage(error);
                context.title = "Error";
                context.info = "";

                if(error.additional)
                    console.error(error.additional);
                console.error(error);

                context.done();
            });
        });
    }

    /** Route Clicked Function
     * 
     * This function currently only triggers on navbar clicks,
     * I am unsure if I will be adding this to other internal links.
     * 
     * @param {string} href 
     * @param {BodyData} body
     */
    protected route(href: string = "/", body?:BodyData): void{
        if(!this._routing && this._loadingError.length === 0){
            this.go(href, undefined, body);
        }
    }

    private go(href: string, timeout?: number, body?:BodyData){
        const {path, anchor} = this.getRouteInfo(href);

        this.back = path;
        window.history.pushState({}, "", href);

        this.handler(timeout, body).then(()=>{
            if(anchor)
                this.scroll(anchor);
        }).catch(console.error);
        
    }

    public get back():string{
        for(let i = this._history.length-1; i>=0; i--){
            if(this._history[i] !== this.pathname)
                return this._history[i];
        }

        return "/";
    }

    public set back(value:string) {
        if(value !== this._history[this._history.length-1])
            this._history.push(value);
    }

    /** Start App Function
     * 
     */
    private start(): void{
        try {
            this._title = findOrCreateElement("title", "head");
            this._target = findOrCreateElement("main");
            this._description = findOrCreateElement("meta[name='description'", "head");

        } catch (err){
            this.failed(err);
        }

        this._defaultTitle = this._title.textContent || "";
        this._defaultContent = this._description.getAttribute("content") || "";

        this._history.push(this.pathname);

        

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

    /** Scroll to element
     * 
     * @param {string} id 
     */
    protected scroll(id: string):void{
        const target = document.getElementById(id);
        if(target)
            target.scrollIntoView();
    }

    /** Open link
     * 
     * Will open the link in a new tab.
     * 
     * @param {string} href 
     */
    protected link(href:string):void{
        window.open(href, '_blank' , 'noopener,noreferrer');
    }

    /** App Loading Failed
     * 
     * @param {any} err
     */
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

    /** Fire Ready Child Events
     * 
     */
    private fireChildReadyEvents(): void{
        this._target.querySelectorAll("*").forEach((node:HTMLElement)=>{
            try {
                if(node.readyCallback)
                    node.readyCallback();
            } catch (e) {
                console.error(e);
            }
        });
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

    /** Display Context
     * 
     * @param {Context} context  
     */
    private display(context: Context): Promise<void>{
        return new Promise((resolve, reject)=>{   
            //Set all values.
            this.body = context.body;
            this.title = context.title;
            this.description = context.info;

            //Run code after transition.
            window.setTimeout(() => {              
                try {
                    this.fireChildReadyEvents();
                    resolve();
                } catch (e){
                    reject(e);
                }
                
            }, CSS_TRANSITION_TIME);
    
            //Start Transition In
            this._target.style.opacity = "";
        });
    }

    /** Body Setter
     * 
     */
    protected set body(value: HTMLElement){
        this._target.innerHTML = "";

        while(value.firstChild) {
            this._target.appendChild(value.firstChild);
        }
            
    }

    /** Title Setter
     * 
     */
    protected set title(value: string){
        if(typeof value === "undefined" || value === ""){
            value = this._defaultTitle;
        } else if(this._defaultTitle !== ""){
            value = this._defaultTitle.concat(" | ", value);
        }

        this._title.textContent = value;
    }

    /** Description Setter
     * 
     */
    protected set description(value: string){
        if(typeof value === "undefined" || value === ""){
            value = this._defaultContent;
        }

        this._description.setAttribute("content", value);
    }

    /** Hostname Getter
     * 
     */
    public get hostname(): string{
        return window.location.hostname;
    }

    /** Pathname Getter
     * 
     */
    public get pathname():string{
        return window.location.pathname;
    }

    /** Port Getter
     * 
     */
    public get port():string {
        return window.location.port;
    }

    /** Get Routing Info
     * 
     * @param {string} href 
     * @returns {path:string, anchor:string}
     */
    protected getRouteInfo(href:string):{path:string,anchor:string}{
        let regex:string = "(https?://" + this.hostname;

        const port:string = this.port;
        if(port !== "80" && port !== "443")
            regex += ":" + port;

        href = href.replace(new RegExp(regex+")"), "");

        const index:number = href.indexOf("#");
        if(index < 0){
            return {
                path: href,
                anchor: ""
            };
        } else if(index === 0){
            return {
                path: "",
                anchor: href
            };
        } else {
            return {
                path: href.substring(0, index),
                anchor: href.substring(index+1)
            };
        }
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

