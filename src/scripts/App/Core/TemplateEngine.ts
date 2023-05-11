/** Template Engine
 * 
 * Render html from template html files.
 * 
 * @author Alex Malotky
 */

//Regex thanks to (Regex101.com)
const TEMPLATE_CODE_REGEX = /{%(.*?)%}/gm
const TEMPLATE_STRING_REGEX = /{{(.*?)}}/gm
const SYMBOLS_REGEX = /(?<=[\s{(,])[\w_$]+?(?=[\s?:}),=])/gm

//Other constants
const TEMPLATE_DIRECTORY = "templates/"
const INCLUDED_FUNCTIONS = {
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
    const instructions = createTemplateInstructions(getFile(filename).toString());
    return compileTemplateInstructions(instructions, args );
}

/** Create Template Instructions
 * 
 * Splits the string into instructions that can be executed line by line.
 * 
 * @param {string} template 
 * @returns {TemplateString}
 */
export function createTemplateInstructions(template: string): Array<string>{
    if(typeof template !== "string")
        throw new Error("Template must be a string!");

    const instructions: Array<string> = [];
    instructions.push("let output = '';")

    let escapes = template.match(TEMPLATE_CODE_REGEX);
    if(escapes) {

        for(let e of escapes){
            let index = template.indexOf(e);
            if(index > 0){
                let temp = convertToTemplateString(template.substring(0, index));
                instructions.push(`output += \`${temp}\`;`);
            }
            instructions.push(e.substring(2, e.length-2));
            template = template.slice(index+e.length);
        }

    }

    let temp = convertToTemplateString(template);
    instructions.push(`output += \`${temp}\`;`);

    instructions.push("return output;");

    return instructions;
}

/** Convert To Template String
 * 
 * Splits the string into seperate componenets and escapes special characters.
 * 
 * @param {string} template 
 * @returns {TemplateString}
 */
export function convertToTemplateString(template: string): string{
    if(typeof template !== "string")
        throw new Error("Template must be a string!");

    const buffer: Array<string> = [];

    let escapes = template.match(TEMPLATE_STRING_REGEX);
    if(escapes) {
        
        for(let e of escapes){
            let index = template.indexOf(e);
            if(index > 0){
                let temp = template.substring(0, index);
                buffer.push(temp.replace("`", "\`"));
            }
            buffer.push(e.replace(TEMPLATE_STRING_REGEX, "${$1}"));

            template = template.slice(index + e.length);
        }
    }

    buffer.push(template);

    return buffer.join("");
}

/** Complie back into String
 * 
 * @param {Array<string>} buffer 
 * @param {any} args 
 * @returns {string}
 */
export function compileTemplateInstructions(instructions: Array<string>, args?: any): string{
    args = {...args, ...INCLUDED_FUNCTIONS};

    let names =  Object.keys(args);
    let values = Object.values(args);

    return new Function(...names, instructions.join("\n"))(...values);
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

    const response = new String(request.response);

    if(response.match("<!DOCTYPE html>"))
        throw new Error(`Unable to find: '${filename}'`);

    return response;
}

/** For Each (outdated)
 * 
 * Loop function used within templates to print objects found with the array.
 * Includes a callback to print to template if array is empty.
 * 
 * @param {Array<any>} arr 
 * @param {(any,string)=>string} loopCallback 
 * @param {()=>string} emptyCallback 
 * @returns {string}
 */
function forEach(arr:Array<any>, loopCallback:(value:any, index:string)=>string, emptyCallback:()=>string): string{
    if(arr && arr.length === 0){
        if(emptyCallback)
            return emptyCallback();
        return "";
    }

    let buffer: string = "";
    for(let i in arr)
        buffer += loopCallback(arr[i], i);

    return buffer;
}