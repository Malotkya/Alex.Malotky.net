/** /Engine/View
 * 
 * @author Alex Malotky
 */
import {HtmlDocument, compressContent, HTMLInit} from "./Html";
import Content from "./Html/Element/Content";
import { HeadInit, HeadUpdate, mergeUpdateToInit, mergeUpdateToUpdate } from "./Html/Head";
import {AttributeList} from "./Html/Attributes";

export type RenderFunction = (update:RenderContent)=>Content;

export type RenderContent = Content|Array<Content>;
export interface RenderUpdate {
    head?: HeadUpdate,
    body?: RenderContent
    update?:Dictionary<RenderContent>,
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

    /** Render Content
     * 
     * @param {ContentUpdate} update 
     * @returns {string}
     */
    render(update:RenderUpdate):string{
        return HtmlDocument(this.#attribute, mergeUpdateToInit(this.#defaultHead, update.head), this.#defaultContent(update.body || []));
    }

    /** Update Content
     * 
     * @param {ContentUpdate} update
     * @returns {string}
     */
    update(update:RenderUpdate):RenderUpdate {
        update.head = mergeUpdateToUpdate(this.#defaultHead, update.head);
        update.body = compressContent(update.body);
        return update;
    }
}