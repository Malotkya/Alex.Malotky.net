/** Template Engine
 * 
 * Render html from template html files.
 * 
 * @author Alex Malotky
 */

//Constants used by file
const TEMPLATE_REGEX = /{{(.*?)}}/gm
const TEMPLATE_DIRECTORY = "templates/"

const FUNCTIONS = {
    include: templateEngine,
    forEach: forEach
}

/** Syncrous Template Engine 
 * 
 * Should only be wrapped in a promise.
 * 
 * @param {string} filename 
 * @param {any} args 
 * @returns {string}
 */
export default function templateEngine(filename: string, args?: any): string{
    const html = getFile(filename);
    const buffer = split(html.toString());
    return compile(buffer, args);
}

/** Split String
 * 
 * Splits the string into seperate componenets and escapes special characters.
 * 
 * @param {string} template 
 * @returns {Array<string>}
 */
export function split(template: string): Array<string>{
    if(typeof template !== "string")
        throw new Error("Template must be a string!");

    let escapes = template.match(TEMPLATE_REGEX);
    if(escapes) {
        const buffer = [];

        for(let e of escapes){
            let index = template.indexOf(e);
            if(index > 0){
                let temp = template.substring(0, index);
                buffer.push(temp.replace("`", "\`"));
                template = template.slice(index + e.length);
            }
            buffer.push(e.replace(TEMPLATE_REGEX, "${$1}"));
        }

        if(template)
            buffer.push(template);

        return buffer;
    }

    return [template];
}

/** Complie back into String
 * 
 * @param {Array<string>} buffer 
 * @param {any} args 
 * @returns {string}
 */
export function compile(buffer: Array<string>, args?: any): string{
    if(typeof args === "undefined")
        args = {};
        
    const string = buffer.join("");

    const objectNames =  Object.keys(args);
    const objectValues = Object.values(args);

    const functionNames = Object.keys(FUNCTIONS);
    const functionValues = Object.values(FUNCTIONS);

    while (true){
        try {
            return new Function(...functionNames, ...objectNames,
                `return \`${string}\`;`)(...functionValues, ...objectValues);

        } catch(error){
            if(typeof error.message === "string"){
                const index = error.message.indexOf(" is not defined");
                if(index > 0){
                    objectNames.push(error.message.substring(0, index));
                    objectValues.push("undefined");
                } else {
                    throw error;
                }
            } else {
                throw error;
            }
        }
    }
    
}

/** Get File (Syncronus)
 * 
 * @param {string} filename 
 * @returns {String} 
 */
function getFile(filename: string): String{
    const request = new XMLHttpRequest()
    request.open("GET", TEMPLATE_DIRECTORY+filename, false);
    request.send();

    if(request.status !== 200)
        throw new Error("Unable to load file: " + request.statusText);

    return new String(request.response);
}

function forEach(arr:Array<any>, loopCallback:(value:any, index:string)=>string, emptyCallback:()=>string){
    
    if(arr.length === 0){
        if(emptyCallback)
            return emptyCallback();
        return "";
    }

    let buffer: string = "";
    for(let i in arr)
        buffer += loopCallback(arr[i], i);

    return buffer;
}