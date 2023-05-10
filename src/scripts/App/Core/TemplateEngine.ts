/** Template Engine
 * 
 * Render html from template html files.
 * 
 * @author Alex Malotky
 */

//Constants used by file
const TEMPLATE_REGEX = /{{(.*?)}}/gm
const SYMBOLS_REGEX = /(?<=[\s{(,])[\w_$]+?(?=[\s?:}),=])/gm
const TEMPLATE_DIRECTORY = "templates/"

const FUNCTIONS = {
    include: templateEngine,
    forEach: forEach
}

interface Template{
    buffer: Array<string>
    expectations: Array<string>
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
    const template = split(getFile(filename).toString());
    const symbols = Object.fromEntries(template.expectations.map(k => [k, null]));
    return compile(template.buffer, {...symbols, ...args});
}

/** Split String
 * 
 * Splits the string into seperate componenets and escapes special characters.
 * 
 * @param {string} template 
 * @returns {Template}
 */
export function split(template: string): Template{
    if(typeof template !== "string")
        throw new Error("Template must be a string!");

    const buffer: Array<string> = [];
    let expected: Array<string> = [];

    let escapes = template.match(TEMPLATE_REGEX);
    if(escapes) {
        
        for(let e of escapes){
            let index = template.indexOf(e);
            if(index > 0){
                let temp = template.substring(0, index);
                buffer.push(temp.replace("`", "\`"));
                template = template.slice(index + e.length);
            }
            buffer.push(e.replace(TEMPLATE_REGEX, "${$1}"));
            expected = expected.concat(e.match(SYMBOLS_REGEX));
        }

        if(template)
            buffer.push(template);

    } else {
        buffer.push(template);
    }

    return {
        buffer: buffer,
        expectations: expected
    };
}

/** Complie back into String
 * 
 * @param {Array<string>} buffer 
 * @param {any} args 
 * @returns {string}
 */
export function compile(buffer: Array<string>, args?: any): string{
    args = {...args, ...FUNCTIONS};

    let names =  Object.keys(args);
    let values = Object.values(args);

    const string = buffer.join("");

    return new Function(...names, `return \`${string}\`;`)(...values);
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