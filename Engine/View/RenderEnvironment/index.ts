import {RenderUpdate, RenderContent} from "..";
import { getRouteInfo, findOrCreateElement } from "./Util";
import { HeadUpdate } from "../Html/Head";
import HeadEnvironment from "./Head";


interface FetchOptions {
    method?: string
    body?: FormData
    headers?:Dictionary<string>
}

export default class RenderEnvironment {
    private _head:HeadEnvironment;
    private _main:HTMLElement;

    private _routing:boolean;
    private _delay:{url:string|URL, body?:FormData}|undefined;

    /** Render Environment Constructor
     * 
     */
    constructor(){
        
        this._routing = false;
        this._head = new HeadEnvironment();
        this._main = findOrCreateElement("#main");
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
            if(data.head){
                this.updateHead(data.head);
            }
            if(data.body){
                this.updateBody(data.body);
            }
            if(data.update){
                this.updateChanges(data.update);
            }
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

    /// Private Update Methods ///

    private updateHead(update:HeadUpdate) {
        this._head.update(update);
    }

    private updateBody(update:RenderContent) {
        RenderEnvironment.render(this._main, update);
    }

    private updateChanges(update:Dictionary<RenderContent>){
        for(const id in update){
            const element = document.getElementById(id);
            if(element) {
                RenderEnvironment.render(element, update[id]);
            } else {
                console.warn(`Unable to find element with id '${id}'!`)
            }
                
        }
    }

    /// Static FunctionS ///

    /** Assign Render Content to Target
     * 
     * @param {HTMLElement} target 
     * @param {RenderContent} content 
     */
    static render(target:HTMLElement&{value?:string}, content:RenderContent){
        const insert = (value:string) => {
            if(target.value){
                target.value = value;
            } else {
                target.innerHTML = value;
            }
        }
        if(Array.isArray(content)){
            for(let c of content){
                RenderEnvironment.render(target, c);
            }
        } else if(typeof content === "string"){
            insert(content);
        } else {
            insert(String(content));
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
        opts.headers["Content-Type"] = "application/json";

        const response = await fetch(url, opts);

        if(response.headers.get("Content-Type") !== "application/json") {
            throw new Error("Did not recieve JSON response!");
        }

        if(!response.ok) {
            throw await response.json();
        }

        const data:RenderUpdate = await response.json();
        if(data.head === undefined && data.body === undefined && data.update === undefined){
            throw new Error("Recieved either an empty or invalid response!");
        }

        return data;
    }
}