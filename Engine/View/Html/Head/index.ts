/** /Engine/View/Html/Head
 * 
 * @author Alex Malotky
 */
import HTMLElement from "..";
import { buildAttributesString } from "../Attributes";
import HeadAttributes from "../Attributes/Map/Head";
import Title, {updateTitle, TitleInit, TitleUpdate} from "./Title";
import Base, {BaseInit} from "./Base";
import Link, {LinkInit, LinkUpdate} from "./Link";
import Style, {StyleInit, StyleUpdate} from "./Style";
import Script, {ScriptInit, ScriptUpdate} from "./Script";
import Meta, {MetaInit, MetaUpdate, updateMeta} from "./Meta";


export interface HeadInit {
    base?: BaseInit,
    title?:TitleInit,
    meta?:Array<MetaInit>,
    links?:Array<LinkInit>,
    styles?:Array<StyleInit>,
    scripts?:Array<ScriptInit>
}

export interface HeadUpdate {
    title?:TitleUpdate,
    links?:Dictionary<LinkUpdate>,
    meta?:Dictionary<MetaUpdate>,
    styles?:Dictionary<StyleUpdate>,
    scripts?:Dictionary<ScriptUpdate>
}

/** Merge Init with Update
 * 
 * @param {I} init 
 * @param {U} update 
 * @returns {I}
 */
function merge<U, I extends U&{name?:string}>(init:Array<I> = [], update:Dictionary<U> = {}):Array<I> {
    const output: Array<I> = [];
    const list = Object.getOwnPropertyNames(update);

    for(let original of init){
        if(original.name){
            const index = list.indexOf(original.name);
            if(index >= 0){
                //@ts-ignore
                output.push(update[original.name]);
                list.splice(index, 0);
            } else {
                const obj = JSON.parse(JSON.stringify(original))
                delete obj.name;
                output.push(obj);
            }
        } else {
            output.push(JSON.parse(JSON.stringify(original)));
        }
    }

    for(let name of list){
        //@ts-ignore
        output.push({
            ...update[name],
        })
    }

    return output;
}

/** Merge Init With Update
 * 
 * @param {HeadInit} init 
 * @param {HeadUpdate} update 
 * @returns {HeadInit}
 */
export function mergeInitWithUpdate(init:HeadInit, update:HeadUpdate = {}):HeadInit{
    return {
        base: init.base,
        title: updateTitle(init.title, update.title),
        meta: updateMeta(init.meta, update.meta),
        //@ts-ignore
        links: merge(init.links, update.links),
        styles: merge(init.styles, update.styles),
        scripts: merge(init.scripts, update.scripts)
    };
}

/** Head Tag
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
 * @param {HeadInit} init
 * @returns {HTMLContent}
 */
export default function Head(init:HeadInit, att:HeadAttributes = {}):HTMLElement {
    let content:string = "";

    if(init.base){
        content += Base(init.base);
    }

    if(init.title){
        content += Title(init.title);
    }

    for(const i of init.meta || []){
        content += Meta(i);
    }

    for(const i of init.links || []){
        content += Link(i);
    }

    for(const i of init.styles || []){
        content += Style(i);
    }

    for(const i of init.scripts || []){
        content += Script(i);
    }

    return "<head "+buildAttributesString(att)+">"+content+"</head>";
}