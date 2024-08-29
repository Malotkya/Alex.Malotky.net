import Attribute, {buildAttributesString} from "../Attribute";
import { HTMLContent } from "../Types";
import Content, {compressContent} from "./Content";


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
type SelfClosing = typeof SELF_CLOSING[number]

/** Create HTML Content
 * 
 * @param {string} name 
 * @param {Dictionary<Attribute>} attributes 
 * @param {Array<Element|Content>} children 
 * @returns {Element}
 */
export function createElement(name:SelfClosing, attributes?:Dictionary<Attribute>):Element
export function createElement(name:string, attributes?:Dictionary<Attribute>|Element|Content, ...children:Array<Element|Content>):Element
export function createElement(name:string, attributes:Dictionary<Attribute>|Element|Content = {}, ...children:Array<Element|Content>):Element {
    //@ts-expect-error
    const selfClosing = SELF_CLOSING.indexOf(name) >= 0;

    if(typeof attributes !== "object" || Array.isArray(attributes)) {
        children.unshift(attributes);
        attributes = {};
    }

    if(selfClosing && children.length > 0)
        throw new Error("Self closing Element cannot have children!");

    let attString:string = buildAttributesString(attributes);

    if(selfClosing) {
        return "<"+name+" "+attString+"/>";
    }
    
    return "<"+name+" "+attString+">"+compressContent(children)+"</"+name+">";
}

