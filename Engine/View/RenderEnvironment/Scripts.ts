import { AttributeList } from "../Html/Attributes";
import Tracker from "./Tacker";

export default class Scripts {
    private _defaults:Dictionary<AttributeList>;
    protected _current:Dictionary<Element>;

    constructor(head:HTMLElement){
        this._defaults = {};
        this._current = {};

        for(const element of Array.from(head.querySelectorAll("script"))){
            const name = element.getAttribute("name");
            if(name){
                const defaults:Dictionary<string|undefined> = {};
                for(let att of element.getAttributeNames()){
                    defaults[att] = element.getAttribute(att) || undefined;
                }
                this._defaults[name] = defaults;
                this._current[name] = element;
            }
        }
    }

    update(updates:Dictionary<AttributeList>):Promise<void>{
        const lstDefault = Object.getOwnPropertyNames(this._defaults);
        const lstUpdate = Object.getOwnPropertyNames(updates);

        //Loop over current tags
        for(let name in this._current){
            const index = lstUpdate.indexOf(name);

            //If being updated
            if( index !== -1){
                Tracker.updateElement(this._current[name], this._defaults[name], updates[name]);
                lstUpdate.splice(index, 1);

            //If had default value
            } else if(lstDefault.indexOf(name) !== -1){
                Tracker.updateElement(this._current[name], this._defaults[name]);

            //Is being removed
            } else {
                this._current[name].parentElement!.removeChild(this._current[name]);
                delete this._current[name];
            }
        }

        const waits: Array<Promise<void>> = [];
        const head = document.querySelector("head")!;

        //Loop through tags to add
        for(let name of lstUpdate){
            const script = document.createElement("script");
            script.setAttribute("name", name);
            Tracker.updateElement(script, updates[name]);

            this._current[name] = script;
            head.appendChild(script);
            waits.push(new Promise(res=>{
                script.addEventListener("load", ()=>res());
            }));
        }

        return new Promise((res, rej)=>{
            Promise.all(waits).then(()=>res()).catch(rej);
        });
    }
}