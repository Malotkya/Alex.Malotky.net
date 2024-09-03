import {buildAttributesString, AttributeList, HTMLElementAttriburesMap, HTMLClosedElementAttriburesMap} from "../Attributes";
import { HTMLContent } from "../Types";
import Content, {compressContent} from "./Content";
import CustomRegistry from "./Custom";

type Element = HTMLContent;
export default Element;


export const customElements = new CustomRegistry();

/** Create HTML Content
 * 
 * @param {string} name 
 * @param {Dictionary<Attribute>} attributes 
 * @param {Array<Element|Content>} children 
 * @returns {Element}
 */
export function createElement<K extends keyof HTMLClosedElementAttriburesMap>(name:K, attributes?:HTMLClosedElementAttriburesMap[K]):Element
export function createElement<K extends keyof HTMLElementAttriburesMap>(name:K, attributes?:HTMLElementAttriburesMap[K]|Element|Content, ...children:Array<Element|Content>):Element
export function createElement(customName:string, attributes?:AttributeList|Element|Content, ...children:Array<Element|Content>):Element 
export function createElement(name:string, attributes:AttributeList|Element|Content = {}, ...children:Array<Element|Content>):Element {

    if(typeof attributes !== "object" || Array.isArray(attributes) || attributes === null) {
        children.unshift(attributes);
        attributes = {};
    }

    const custom = customElements.extends(name);
    if(custom){
        attributes.is = name;
        name = custom;
    }

    //@ts-expect-error
    const selfClosing = SELF_CLOSING.indexOf(name) >= 0;

    if(selfClosing && children.length > 0)
        throw new Error("Self closing Element cannot have children!");

    let attString:string = buildAttributesString(attributes);

    if(selfClosing) {
        return "<"+name+" "+attString+"/>";
    }
    
    return "<"+name+" "+attString+">"+compressContent(children)+"</"+name+">";
}

