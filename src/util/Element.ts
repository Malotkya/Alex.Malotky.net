/** /util/Element
 * 
 * @author Alex Malotky
 */
export type Element = string|number|boolean|undefined|HTMLElement|HTMLSelectElement|HTMLInputElement|null|Array<Element>;

/** Creates HTML Element
 * 
 * Streamlines creating an HTML element, assigning attributes, and adding children.
 * 
 * @param {string} name 
 * @param {any} attributes 
 * @param {Array} children 
 * @returns 
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(name:K, attributes?:Record<string, any>|Element, ...children:Array<Element>):HTMLElementTagNameMap[K]
export function createElement(name:string, attributes?:Record<string, any>|Element, ...children:Array<Element>):HTMLElement
export function createElement(name:string, attributes:any = {}, ...children:Array<Element>): HTMLElement{
    if(typeof attributes !== "object" || attributes instanceof HTMLElement || Array.isArray(attributes)) {
        children.unshift(attributes);
        attributes = {};
    }
    
    const element = document.createElement(name);
    for(let name in attributes){
        if(typeof attributes[name] === "boolean"){
            element.toggleAttribute(name, attributes[name])
        } else {
            element.setAttribute(name, String(attributes[name]));
        }
    }

    appendChildren(element, children);
    return element;
}

/** Recursivly Append Children Elements
 * 
 * @param {HTMLElement} element 
 * @param {Array<Element>} children 
 */
export function appendChildren(element:HTMLElement|HTMLSelectElement, children:Array<Element>):void {
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