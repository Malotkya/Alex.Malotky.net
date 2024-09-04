/** /Engine/View
 * 
 * @author Alex Malotky
 */
import HTMLElement, {HtmlDocument, compressContent, HTMLInit} from "./Html";
import { HeadInit, HeadUpdate, mergeInitWithUpdate } from "./Html/Head";
import {AttributeList} from "./Html/Attributes";

export type RenderFunction = (update:RenderContent)=>HTMLElement;

export type RenderContent = HTMLElement|Array<RenderContent>;
export interface RenderUpdate {
    head?: HeadUpdate,
    body?: RenderContent
    update?:Dictionary<RenderContent>,
    error?: {
        message:string,
        cause?:unknown,
        stack?:string,
        status?:number,
    },
    redirect?:string
}

/** View Class
 * 
 */
export default class View{
    #defaultHead:HeadInit;
    #defaultContent:RenderFunction;
    #attribute:AttributeList;

    /** Constructor
     * 
     * @param {Array<ElementTag>} headTags 
     * @param {RenderFunction} stationaryContent 
     * @param {AttributeList} attributes 
     */
    constructor(attributes:HTMLInit = {}, headInit:HeadInit = {}, stationaryContent:RenderFunction = compressContent){

        if(typeof attributes !== "object")
            throw new TypeError("Invalid Attributes!");

        if(typeof headInit !== "object")
            throw new TypeError("Invalid Head Attributes");

        if(typeof stationaryContent !== "function")
            throw new TypeError("Stationary content must be in the form of a function!");

        this.#defaultContent = stationaryContent;
        this.#attribute = attributes;
        this.#defaultHead = headInit;
    }

    /** Render Content Update
     * 
     * @param {ContentUpdate} update 
     * @returns {string}
     */
    render(update:RenderUpdate):string{
        return HtmlDocument(this.#attribute, mergeInitWithUpdate(this.#defaultHead, update.head), this.#defaultContent(update.body || []));
    }
}