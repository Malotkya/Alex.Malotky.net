import {RenderUpdate, RenderContent} from "..";
import { findOrCreateElement } from "../../Web";
import { HeadUpdate } from "../Html/Head";
import Tracker from "./Tacker";

interface FetchOptions {
    method?: string
    body?: FormData
    headers?:Dictionary<string>
}

export default class RenderEnvironment {
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

    static async fetch(url:string, opts:FetchOptions):Promise<RenderUpdate> {
        if(opts.headers === undefined)
            opts.headers = {};
        opts.headers["Content-Type"] = "application/json";

        const response = await fetch(url, opts);

        if(!response.ok) {
            throw await response.json();
        }

        return await response.json();
    }

    private _meta:Tracker<HTMLMetaElement>;
    private _links:Tracker<HTMLLinkElement>;
    private _styles:Tracker<HTMLStyleElement>;
    private _scripts:Tracker<HTMLScriptElement>;

    private _title:HTMLTitleElement;
    private _defaultTitle:string;

    private _main:HTMLElement;

    private _routing:boolean;

    constructor(){
        const head = findOrCreateElement("head");
        this._routing = false;

        this._meta = new Tracker(head, "meta");
        this._links = new Tracker(head, "links");
        this._styles = new Tracker(head, "styles");
        this._scripts = new Tracker(head, "scripts");

        this._title = head.querySelector("title") as HTMLTitleElement;
        this._defaultTitle = this._title.textContent || "";
        
        const index = this._defaultTitle.indexOf("|");
        if(index >= 0){
            this._defaultTitle = this._defaultTitle.substring(0, index-1).trim();
        }

        this._main = findOrCreateElement("#main");
    }

    isRouting(){
        return this._routing;
    }

    async route(url:string, body?:FormData){
        this._routing = true;

        try {
            const data = await RenderEnvironment.fetch(url, {body});
            if(data.head){
                this.updateHead(data.head);
            }
            if(data.body){
                RenderEnvironment.render(this._main, data.body);
            }
            if(data.update){
                for(let name in data.update){
                    const element = document.getElementById(name);
                    if(element)
                        RenderEnvironment.render(element, data.update[name]);
                }
            }
        } catch (e){
            console.error(e);
            window.location.reload();
        }

        this._routing = false;
    }

    private updateHead(update:HeadUpdate) {
        if(this._defaultTitle === ""){
            this._title.textContent = update.title || "";
        } else if(update.title === undefined || update.title === ""){
            this._title.textContent = this._defaultTitle;
        } else {
            this._title.textContent = this._defaultTitle + " | " + update.title;
        }

        if(update.meta){
            this._meta.update(update.meta);
        }

        if(update.links){
            this._links.update(update.links);
        }

        if(update.styles){
            this._styles.update(update.styles);
        }

        if(update.scripts){
            this._scripts.update(update.scripts);
        }
    }
}