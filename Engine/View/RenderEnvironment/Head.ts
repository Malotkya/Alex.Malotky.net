import {findOrCreateElement} from "./Util";
import { HeadUpdate } from "../Html/Head";
import { AttributeList } from "../Html/Attribute";
import Tracker from "./Tacker";

export default class HeadEnvironment {
    private _meta:Tracker;
    private _links:Tracker;
    private _styles:Tracker;
    private _scripts:Tracker;

    private _title:HTMLTitleElement;
    private _defaultTitle:string;

    constructor(){
        const head = findOrCreateElement("head");

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
    }

    update(update:HeadUpdate) {
        if(this._defaultTitle === ""){
            this._title.textContent = update.title || "";
        } else if(update.title === undefined || update.title === ""){
            this._title.textContent = this._defaultTitle;
        } else {
            this._title.textContent = this._defaultTitle + " | " + update.title;
        }

        const meta:Dictionary<AttributeList> = {};
        for(let name in update.meta){
            meta[name] = {
                content: update.meta[name]
            };
        }

        if(update.meta){
            this._meta.update(meta);
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