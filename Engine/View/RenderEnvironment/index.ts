import {RenderUpdate, Content} from "..";
import { compressContent } from "../Html";
import { getRouteInfo, hashObject } from "./Util";
import { HeadUpdate } from "../Html/Head";
import HeadEnvironment from "./Head";
import { HEADER_KEY, HEADER_VALUE } from "../../Util";


interface FetchOptions extends RequestInit{
    headers?:Dictionary<string>
}

interface Event {
    type:string,
    listener:EventListener
}

export default class RenderEnvironment {
    private _head:HeadEnvironment;
    private _headHash:number;
    private _bodyHash:number;
    private _events:Array<Event>;

    private _routing:boolean;
    private _delay:{url:string|URL, body?:FormData}|undefined;

    /** Render Environment Constructor
     * 
     */
    constructor(){
        this._routing = false;
        this._head = new HeadEnvironment();
        this._headHash = 0;
        this._bodyHash = 0;
        this._events = [];
    }

    /** Main Route Handler
     * 
     * Returns if there is an anchor to scroll too.
     * 
     * @param {FormData} body 
     * @returns {Promise<string>}
     */
    async handler(body?:FormData):Promise<string>{
        this._routing = true;
        const {anchor, path} = getRouteInfo(window.location.href);

        try {
            const data = await RenderEnvironment.fetch(path, {body});
            if(data.redirect){
                window.history.pushState({}, "", data.redirect);
                return this.handler();
            }
            await this.update(data);
        } catch (e){
            console.error(e);
            //window.location.reload();
        }

        this._routing = false;

        if(this._delay){
            const {url, body} = this._delay;
            window.history.pushState({}, "", url);
            this._delay = undefined;
            return this.handler(body);
        }

        return anchor;
    }

    /** Route to locale page.
     * 
     * @param {string|URL} url 
     * @param {FormData} body 
     */
    route(url:string|URL, body?:FormData){
        if(!this._routing) {
            window.history.pushState({}, "", url);
            this.clear();
            this.handler(body).then(anchor=>{
                this.scroll(anchor);
            })
        } else {
            this._delay = {url, body};
        }
    }

    /** Scroll to Element
     * 
     * @param {string} id
     */
    scroll(id:string){
        if(id){
            const element = document.getElementById(id);
            if(element){
                element.scrollIntoView();
            }
        }
    }

    /** Open External Link
     * 
     * @param {string|URL} href
     */
    link(href:string|URL){
        window.open(href, '_blank' , 'noopener,noreferrer')
    }

    /** Run Script
     * 
     * @param script 
     */
    run(script:string) {
        new Function("env", script)(this);
    }

    /** Add Event
     * 
     * @param update 
     */
    event(type:string, listener:EventListener){
        if(typeof type !== "string")
            throw new TypeError("Unknown event!");

        if(typeof listener !== "function")
            throw new TypeError("Unknown listener!");

        this._events.push({type, listener});
        window.addEventListener(type, listener);
    }

    /** Update Environment
     * 
     * @param {RenderUpdate} update 
     */
    async update(update:RenderUpdate){
        if(update.head){
            await this.updateHead(update.head);
        }
        if(update.body){
            this.updateBody(update.body);
        }
    }

    /// Private Update Methods ///

    /** Update Head
     * 
     * @param {HeadUpdate} update 
     */
    private async updateHead(update:HeadUpdate) {
        const hash = hashObject(update);
        if(hash === this._headHash){
            return console.info("Head didn't change!");
        }

        await this._head.update(update);
        this._headHash = hash;
    }

    /** Update Body
     * 
     */
    private updateBody(update:Dictionary<Content>) {
        const hash = hashObject(update);
        const scripts: Array<string> = [];

        if(hash === this._bodyHash){
            return console.info("Body didn't change!");
        }

        for(const id in update){
            const element = document.getElementById(id);
            if(element){
                const value = compressContent(update[id]);
                RenderEnvironment.render(element, value);
                const match = value.match(/<script.*?>.*?<\/script.*?>/gi);
                if(match){
                    scripts.push(...match);
                }
            } else {
                console.warn(`Unable to find element with id '${id}'!`);
            }
        }

        this.scripts(scripts);
        this._bodyHash = hash;
    }

    /** Run Scripts
     * 
     * @param {RegExpMatchArray} update 
     */
    private scripts(update:Array<string>){
        for(let script of update) {
            this.run(script.replace(/^<script.*?>(.*?)<\/script.*?>$/gi, "$1"));
        }
    }

    /** Clear Events
     * 
     */
    private clear(){
        while(this._events.length > 0){
            const {type, listener} = this._events.pop()!;
            window.removeEventListener(type, listener);
        }
    }

    /// Static FunctionS ///

    /** Assign Render Content to Target
     * 
     * @param {HTMLElement} target 
     * @param {RenderContent} content 
     */
    static render(target:HTMLElement&{value?:string}, content:Content){

        if(target.value){ //If it takes value.

            if(typeof content === "object"){
                target.value = JSON.stringify(content);
            } else {
                target.value = String(content);
            }

        } else {
            
            const append = (value:Content) => {
                if(Array.isArray(value)){
                    for(let c of value){
                        append(c);
                    }
                } else {
                    target.innerHTML += value;
                }
            } //Append

            target.innerHTML = "";
            append(content);
        }
    }

    /** Fetch Wrapper
     * 
     * @param {stirng|URL} url 
     * @param {FetchOptions} opts 
     * @returns {Promise<RenderUpdate>}
     */
    static async fetch(url:string|URL, opts:FetchOptions):Promise<RenderUpdate> {
        if(opts.headers === undefined)
            opts.headers = {};
        opts.headers[HEADER_KEY] = HEADER_VALUE;

        try {
            const response = await fetch(url, opts);

            if(response.headers.get(HEADER_KEY) !== HEADER_VALUE) {
                throw new Error("Did not recieve an update response!");
            } else if(response.headers.get("Content-Type") !== "application/json") {
                throw new Error("Did not recieve JSON response!");
            }

            const data:RenderUpdate = await response.json();
            
            if(data.redirect === undefined && data.head === undefined && data.body === undefined && data.update === undefined){
                throw new Error("Recieved either an empty or invalid response!");
            }

            return data;
        } catch (e){
            throw e;
        }
        
    }
}