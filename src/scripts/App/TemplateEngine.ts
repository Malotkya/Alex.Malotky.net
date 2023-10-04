/** App/TemplateEngine.ts
 * 
 * Render html from template html files.
 * 
 * @author Alex Malotky
 */

//Regex thanks to (Regex101.com)
const TEMPLATE_CODE_REGEX = /{%(.*?)%}/gs
const TEMPLATE_STRING_REGEX = /{{([^\n]*?)}}/gs
const AWAIT_REGEX = (name:string) => new RegExp(`^\\s*(${name}\\(.*?\\))`, "gs");

//Other constants
const TEMPLATE_DIRECTORY = "/templates/"
const INCLUDED_FUNCTIONS = {
    include: templateEngine,
    forEach: forEach,
    formatDate: formatDate
}

const INSTRUCTIONS_OPEN: Array<string> = [
    "return new Promise(async(res, rej)=>{",
    "let trace = 0;",
    "try {",
    "let output = '';",
];

const INSTRUCTIONS_CLOSE: Array<string> = [
    "res(output);",
    "}catch(e){",
    "rej({line: trace, message: e.message})",
    "}});",
];

const BAD_KEYWORDS = [
    "fetch",
    "await",
    "yield",
    "class",
]

class TemplateError extends Error {
    private additional: string|undefined;

    constructor(filename: string, line:number, message: string, instruction?:string){
        super(`${filename} (${line}):${message}`);

        this.additional = instruction;
    }
}

/** Syncrous Template Engine 
 * 
 * Should only be wrapped in a promise.
 * 
 * @param {string} filename 
 * @param {any} args 
 * @returns {string}
 */
export default async function templateEngine(filename: string, args?: any): Promise<string>{
    if(typeof filename !== "string")
        throw new TypeError("Filename must be a string!");

    try {
        const instructions = createTemplateInstructions(await getFile(filename));
        return compileTemplateInstructions(instructions, filename, args);
    } catch (err: any){
        if(err instanceof TemplateError)
            throw err;

        throw new TemplateError(filename, 0, err.message);
    }
}

function cleanCode(string:string):string {
    for(let keyword of BAD_KEYWORDS)
        string = string.replace(keyword, "_"+keyword);
    return string;
}

function cleanTemplateString(string: string):string {
    string = cleanCode(string);
    console.log(string);
    for(let name in INCLUDED_FUNCTIONS){
        const regex = AWAIT_REGEX(name)
        string = string.replace(regex, "await $1");
    }

       
    return "${" + string + "}";
}

/** Create Template Instructions
 * 
 * Splits the string into instructions that can be executed line by line.
 * 
 * @param {string} template 
 * @returns {Array<string>}
 */
export function createTemplateInstructions(template: string): Array<string>{
    if(typeof template !== "string")
        throw new TypeError("Template must be a string!");

    const instructions: Array<string> = [].concat(INSTRUCTIONS_OPEN);

    let escapes = template.match(TEMPLATE_CODE_REGEX);
    if(escapes) {

        for(let e of escapes){
            let index = template.indexOf(e);
            if(index > 0){
                let temp = convertToTemplateString(template.substring(0, index));
                instructions.push(`output += \`${temp}\`;`);
                instructions.push('trace++;');
            }
            instructions.push(e.substring(2, e.length-2));
            instructions.push('trace++;');
            template = template.slice(index+e.length);
        }

    }

    let temp = convertToTemplateString(template);
    instructions.push(`output += \`${temp}\`;`);

    return instructions.concat(INSTRUCTIONS_CLOSE);
}

/** Convert To Template String
 * 
 * Splits the string into seperate componenets and escapes special characters.
 * 
 * @param {string} template 
 * @returns {string}
 */
export function convertToTemplateString(template: string): string{
    if(typeof template !== "string")
        throw new TypeError("Template must be a string!");

    const buffer: Array<string> = [];

    let escapes = template.match(TEMPLATE_STRING_REGEX);
    if(escapes) {
        
        for(let e of escapes){
            let index = template.indexOf(e);
            if(index > 0){
                let temp = template.substring(0, index);
                buffer.push(temp.replace("`", "\`"));
            }
            buffer.push(cleanTemplateString(e.replace(TEMPLATE_STRING_REGEX, "$1")));

            template = template.slice(index + e.length);
        }
    }

    buffer.push(template);

    return buffer.join("").replace("\s+", " ");
}

/** Complie back into String
 * 
 * @param {Array<string>} instructions 
 * @param {any} args 
 * @returns {string}
 */
export async function compileTemplateInstructions(instructions: Array<string>,filename:string, args?: any): Promise<string>{
    args = {...args, ...INCLUDED_FUNCTIONS};

    let names =  Object.keys(args);
    let values = Object.values(args);

    try {
        return await new Function(...names, instructions.join("\n"))(...values);
    } catch (e: any){
        throw new TemplateError(filename, e.line, e.message, instructions[e.line+INSTRUCTIONS_OPEN.length]);
    }
}

/** Get File (Syncronus)
 * 
 * @param {string} filename 
 * @returns {String} 
 */
async function getFile(filename: string): Promise<string>{
    const response = await fetch(TEMPLATE_DIRECTORY+filename);

    if(response.status !== 200)
        throw new Error("Unable to load file: " + response.statusText);

    const fileText = await response.text();

    if(fileText.match("<!DOCTYPE html>"))
        throw new Error(`Unable to find '${filename}'`);

    return fileText;
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
async function forEach(arr:Array<any>, loopCallback:(value:any, index:string)=>Promise<string>|string, emptyCallback:()=>string): Promise<string>{
    if(arr && arr.length === 0){
        if(emptyCallback){
            if(typeof emptyCallback === "string")
                return emptyCallback;
            return emptyCallback();
        }
        return "";
    }

    let buffer: string = "";
    for(let i in arr) 
        buffer += await loopCallback(arr[i], i);

    return buffer;
}

// Constants used by the formatDate function.
const LONG_MONTH = [
    "January", "Febuary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]; const SHORT_MONTH = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
]; const LONG_DAY = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Tursday", "Friday", "Saturday"
]; const SHORT_DAY = [
    "Sun", "Mon", "Tue", "Wend",
    "Thur", "Fri", "Sat"
];

//Interface for firebaseDate format.
interface firebaseDate{
    seconds: number,
    nanoseconds: number
}

/** Format Date Function
 * 
 * @param {Date|firebaseDate|string} date 
 * @param {string} format: %Y   - year as 4 char string
 *                         %y   - year as 2 char string
 *                         %M-d - month as a number
 *                         %M   - month as a string
 *                         %m   - month as abreviated string
 *                         %W   - day of week as string
 *                         %w   - day of week as abreviated string
 *                         $H   - hour as number 0-23
 *                         %h   - hour as number 1-12
 *                         %N   - minute as number
 *                         $S   - second as number
 *                         $s   - milisecond as number
 * 
 * @returns {string}
 */
function formatDate(date: Date|firebaseDate|string, format: string): string{
    if(!(date instanceof Date)) {
        if(typeof date === "string")
            //For some reasone sometimes the date format is remembered rather then being refreshed,
            //we will just return it.
            return date;
        else
            date = new Date(date.seconds*1000 + date.nanoseconds/100000);
    }
        
    return format
        //Year
        .replace("%Y", date.getFullYear().toString())
        .replace("%y", date.getFullYear().toString().substring(2))

        //Month
        .replace("%M-n", date.getMonth().toString())
        .replace("%M", LONG_MONTH[date.getMonth()])
        .replace("%m", SHORT_MONTH[date.getMonth()])

        //Day/Date
        .replace("%D", date.getDate().toString())
        .replace("%W", LONG_DAY[date.getDay()])
        .replace("%w", SHORT_DAY[date.getDay()])

        //Time
        .replace("%H", date.getHours().toString())
        .replace("%h", (((date.getHours()-1)%12)+1).toString() )
        .replace("%N", date.getMinutes().toString())
        .replace("%S", date.getSeconds().toString())
        .replace("%s", date.getMilliseconds().toString());
}