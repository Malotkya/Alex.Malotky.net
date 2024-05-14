type Element = string|number|boolean|HTMLElement|null|Array<Element>;

/** Creates HTML Element
 * 
 * Streamlines creating an HTML element, assigning attributes, and adding children.
 * 
 * @param {string} name 
 * @param {any} attributes 
 * @param {Array} children 
 * @returns 
 */
export function createElement(name:string, attributes:any = {}, ...children:Array<Element>): HTMLElement{
    if(typeof attributes === "string" || attributes instanceof HTMLElement || Array.isArray(attributes)) {
        children.unshift(attributes);
        attributes = {};
    } else if(typeof attributes !== "object"){
        throw new TypeError("Attributes must be an object!");
    }
    
    const element = document.createElement(name);
    for(let name in attributes){
        element.setAttribute(name, String(attributes[name]));
    }

    appendChildren(element, children);
    return element;
}

/** Recursivly Append Children Elements
 * 
 * @param {HTMLElement} element 
 * @param {Array<Element>} children 
 */
function appendChildren(element:HTMLElement, children:Array<Element>):void {
    for(let child of children){
        if(Array.isArray(child)){
            appendChildren(element, child);
        } else if(child instanceof HTMLElement) {
            element.appendChild(child);
        }else if(child !== null && child !== undefined) {
            element.append(String(child));
        }
    }
}

/** Attempts to find node, and parents of node.
 * 
 * If nothing is entered, document body is reterned.
 * Will create and append node to parents if not found.
 * 
 * @param {string} name 
 * @param {Array<string>} parents 
 * @returns {HTMLElement}
 */
export function findOrCreateElement(name?:string, ...parents:Array<string>): HTMLElement{

    if(typeof name === "undefined"){
        return document.body;
    } else if(typeof name !== "string"){
        throw new TypeError(`Unknown type '${typeof name}' for query string`);
    }

    let node:HTMLElement | null = document.querySelector(name);
    if(node)
        return node;

    node = findOrCreateElement(...parents);

    let attributes: Array<string>|undefined;
    let index = name.indexOf("[");
    if(index > 0){
        attributes = name.replace(/.*?\[(.*?)='(.*?)'\]?/gm, "$1=$2 ").split(/\s+/gm) || [];
        name = name.substring(0, index);
    }

    let id:string|undefined;
    let className:string|undefined;

    index = name.indexOf("#");
    if(index >= 0) {
        id = name.substring(index+1);
        name = name.substring(0, index);
    }

    index = name.indexOf(".");
    if(index >= 0) {
        className = name.substring(index+1);
        name = name.substring(0, index);
    }

    if(name.trim().length === 0){
        name = "div";
    }

    let newNode = document.createElement(name);
    if(id)
        newNode.id = id;
    
    if(className)
        newNode.className = className;

    if(attributes){
        for(let string of attributes){
            string = string.trim();
            if(string.length > 3){
                const buffer = string.split("=");
                newNode.setAttribute(buffer[0], buffer[1]);
            }
        }
    }

    node.appendChild(newNode);

    return newNode;
}