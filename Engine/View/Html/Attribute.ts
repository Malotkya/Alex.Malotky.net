import AriaGlobalAttributes from "./Aria";
import { Enumerable } from "./Types";

type Attribute = string|number|boolean|Array<string>;
export default Attribute;

/** Build Attributes String
 * 
 * Helper function that converts an Attribute or Init into a string.
 * 
 * @param {Dictionary<Attribute>} attributes 
 * @returns {stirng}
 */
export function buildAttributesString(attributes:Dictionary<unknown>):string {
    let output:string = "";
    for(let raw in attributes){
        const name = convertName(raw);
        const value = attributes[raw];

        switch (typeof value){
            case "string":
                if(value !== "")
                    output += name+"=\""+value+"\" ";
                break;

            case "number":
                if(!isNaN(value))
                    output += name+"=\""+value+"\" ";
                break;

            case "boolean":
                if(name.indexOf("aria") >= 0){
                    output += name+"=\""+value?"true":"false"+"\" ";
                } else if(value) {
                    output += name+" "
                }
                break;

            case "object":
                if(Array.isArray(value)){
                    output += name+"=\""+value.join(" ")+"\" "

                    break;
                }

            default:
                output += name+"=\""+String(value)+"\" ";
        }
    }
    return output;
}

/** Convert Attribute Name
 * 
 * converts camel case names to dash/kebab case.
 * 
 * @param {string} name 
 * @returns {string}
 */
export function convertName(name:string):string {
    const matches = name.match(/[A-Z]/g);

    for(let char of matches || []){
        name.replace(char, ("-"+char).toLocaleLowerCase());
    }

    return name;
}

//https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
export interface GlobalAttributes extends AriaGlobalAttributes {
    accesskey?:string,
    autocapitalize?: "none"|"off"|"sentences"|"on"|"words"|"characters",
    autofocus?:boolean,
    class?:string|Array<string>,
    contenteditable?:Enumerable|"plaintext-only",
    /* data-*?: any */
    dir?: "ltr"|"rtl"|"auto",
    draggable?: Enumerable,
    enterkeyhint?: "enter"|"done"|"go"|"next"|"previous"|"search"|"send",
    exportparts?:string|Array<string>,
    hidden?: boolean|"until-found",
    id?: string,
    inert?: boolean,
    inputmode?: "none"|"text"|"decimal"|"numeric"|"tel"|"search"|"email"|"url",
    is?: string,
    itemid?: string,
    itemprop?: string,
    itemref?: string,
    itemscope?: string,
    itemtype?: string,
    lang?: string,
    nonce?: string,
    part?: string|Array<string>,
    popover?: boolean,
    role?: "toolbar"|"tooltip"|"feed"|"math"|"presentation"|"note"|"scrollbar"|"searchbox"|"separator"|"slider"|"spinbutton"|"switch"|"tab"|"tabpanel"|"treeitem"|"combobox"|"menu"|"menubar"|"tablist"|"tree"|"treegrid",
    slot?: string,
    spellcheck?: boolean,
    style?: string, /*Style Array??*/
    tabindex?: number,
    title?: string,
    translate?: "yes"|"no",
    //virtualkeyboardpolicy?: "auto"|"manual",
}