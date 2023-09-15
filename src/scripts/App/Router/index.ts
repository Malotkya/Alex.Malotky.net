import Content from "../Core/Content"
import Path from "./Path";
import { sleep } from "..";
import {makeErrorMessage} from "../Core/App_Base";
import Route from "./Route";


/** Router Class
 * 
 * @author Alex Malotky
 */
export default class Router extends Content{
    private _route: Route;
    private _render: (args:any)=>Promise<string>|string;
    private _load: (args:any)=>Promise<void>|void;
    private _connected: (args:any)=>Promise<void>|void;
    private _ready: (args:any)=>Promise<void>|void

    constructor(route: string, title: string, description:string){
        super(title, description);

        if(typeof route === "string"){
            this._route = new Route(route);
        } else {
            throw new Error("Route must be a string!");
        }

        this._ready = ()=>undefined;
    }

    

    /** On Load Event Callback
     * 
     * This event is called when the page loads before rendering html.
     * 
     * @param {Function} callback 
     */
    public onLoad(callback:(args:any)=>Promise<any>|any): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._load = callback;
    }

    /** On Render Event Callback
     * 
     * This event is called when the page is rendering html.
     * 
     * @param {Function} callback 
     */
    public onRender(callback:(args:any)=>Promise<string>|string): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._render = callback;
    }

    /** On Connected Event Callback
     * 
     * This event is called once the html is rendered.
     * 
     * @param {Function} callback 
     */
    public onConnected(callback:(args:any)=>Promise<any>|any): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._connected = callback;
    }

    /** On Ready Event Callback
     * 
     * This event is called once the html has been drawn.
     * 
     * @param {Function} callback 
     */
    public onReady(callback:(args:any)=>Promise<void>|void): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._ready = callback;
    }

    /** Call Load Event.
     * 
     */
    protected async Load(args: any):Promise<void>{
        if(this._load)
            await this._load(args);
    }

    /** Call Render Event.
     * 
     */
    protected async Render(args: any):Promise<string>{
        if(this._render) {
            return await this._render(args);
        } else {
            if(this._string)
                return this._string;
        }
        
        throw new Error("No content to be rendered!");
    }

    /** Call Connected Event.
     * 
     */
    protected async Connect(args: any):Promise<void>{
        if(this._connected)
            await this._connected(args);
    }

    /** Call Ready Event.
     * 
     */
    protected async Ready(args: any):Promise<void>{
        if(this._ready)
            await this._ready(args);
    }

    /** Render to Element
     * 
     * Displays content after the transition out and executes javascript
     * after the transition in.  Will return any script elements that need
     * to be deleted on loading a new page.
     * 
     * @param {HTMLElement} target 
     * @returns {void}
     */
    public renderDisplay(target: HTMLElement): Promise<void>{
        return new Promise(async(resolve, reject)=>{
            let content:string;
            /** Content Time Out
             * 
             * Gives the content about half a second to render checking
             * event 5 milliseconds.
             * 
             * @returns {string}
             */
            function contentTimeOut(): Promise<string> {
                return new Promise(async(res,rej)=>{
                    let counter = 100;
                    while( true ){ //(--counter > 0) ){
                        if(content)
                            res(content);
                        await sleep(5);
                    }
                        
                    //rej(new Error("Content rendering has timed out!"))
                })
            }

            /** Error Handler
             * 
             * @param {any} error 
             */
            function handleError(error: any): void{
                target.ontransitionend = undefined;
                target.innerHTML = makeErrorMessage(error, 500);
                target.style.opacity ="";
                reject(error);
            }

            const args: any = this._route.args;
            try {
                //Callback for when transition OUT is finished
                target.ontransitionend = async() => {

                    try {
                        //Callback for when transiton IN is finished
                        target.ontransitionend = async() => {

                            target.ontransitionend = undefined;

                            await this.Ready(args);
                            resolve();
                        }

                        //Set content to page.
                        target.innerHTML = await contentTimeOut();

                        this.Connect(args);

                        //Start transition IN
                        target.style.opacity = "";
                    } catch(err: any){
                        handleError(err);
                    }
                    
                }

                this.Load(args);

                //Start transition OUT
                target.style.opacity = "0";

                //Get HTML
                content = await this.Render(args);
            }catch(err: any){
                handleError(err);
            }
        });
    }

    /** Checks if the route matches the url
     * 
     * May be changing to allow variables within the url
     * 
     * @param {Path} path 
     * @returns {boolean}
     */
    public matches(path: Path): boolean{
        return this._route.match(path);
    }

    /** Get Hypertext Reference
     * 
     */
    get href(): string{
        return "/".concat(this._route.value);
    }
}