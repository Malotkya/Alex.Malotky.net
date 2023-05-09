/** Template Engine
 * 
 * Render html from template html files.
 * 
 * @author Alex Malotky
 */

//Constants used by file
const TEMPLATE_REGEX = /{{(.*?)}}/gm
const TEMPLATE_DIRECTORY = "templates/"

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
    const names =  Object.keys(args);
    const vals = Object.values(args);

    return new Function('include', ...names, `return \`${string}\`;`)(templateEngine, ...vals);
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