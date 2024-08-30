import {buildAttributesString, AttributeList} from "../Attribute";
import { HTMLContent } from "../Types";
import Content, {compressContent} from "./Content";
import CustomRegistry from "./Custom";

type Element = HTMLContent;
export default Element;

const SELF_CLOSING = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
] as const;
type SelfClosing = typeof SELF_CLOSING[number];

export const customElements = new CustomRegistry();

/** Create HTML Content
 * 
 * @param {string} name 
 * @param {Dictionary<Attribute>} attributes 
 * @param {Array<Element|Content>} children 
 * @returns {Element}
 */
export function createElement(name:SelfClosing, attributes?:AttributeList):Element
export function createElement(name:string, attributes?:AttributeList|Element|Content, ...children:Array<Element|Content>):Element
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

