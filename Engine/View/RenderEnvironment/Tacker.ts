import { findOrCreateElement } from "Engine/Web";
import { AttributeList } from "../Html/Attribute";

export default class Tracker {
    private _defaults:Dictionary<AttributeList>;
    private _current:Dictionary<Element>;
    private _name:string;

    constructor(head:HTMLElement, name:string){
        this._defaults = {};
        this._current = {};
        this._name = name;

        for(const element of Array.from(head.querySelectorAll(name))){
            const name = element.getAttribute("name");
            if(name){
                const defaults:Dictionary<string|undefined> = {};
                for(let att of element.getAttributeNames()){
                    defaults[att] = element.getAttribute(name) || undefined;
                }
                this._defaults[name] = defaults;
                this._current[name] = element;
            }
        }
    }

    update(updates:Dictionary<AttributeList|string>){
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

        //Loop through tags to add
        for(let name of lstUpdate){
            this._current[name] = findOrCreateElement(`${this._name}[name='${name}']`, "head");
            Tracker.updateElement(this._current[name], updates[name]);
        }
    }

    private static updateElement(element:Element, defaults:AttributeList, update:AttributeList = {}){
        const lstDefault = Object.getOwnPropertyNames(defaults);
        const lstUpdate = Object.getOwnPropertyNames(update);

        if(typeof update === "string"){
            update = {
                content: update
            };
        }
        
        for(let name of element.getAttributeNames()) {
            const index = lstUpdate.indexOf(name);

            if(index !== -1){
                element.setAttribute(name, update[name]);
                lstUpdate.splice(index, 1);

            } else if(lstDefault.indexOf(name) !== -1){
                element.setAttribute(name, defaults[name]);

            } else {
                element.removeAttribute(name);
            }
        }

        for(let name of lstUpdate){
            element.setAttribute(name, update[name]);
        }
    }
}