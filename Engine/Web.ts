import RenderEnvironment from "./View/RenderEnvironment";
export {RenderEnvironment};

/** Find Or Create Element
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