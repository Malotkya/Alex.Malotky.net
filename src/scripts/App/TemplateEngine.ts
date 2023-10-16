/** App/TemplateEngine.ts
 * 
 * Render html from template html files.
 * 
 * @author Alex Malotky
 */

//Regex thanks to (Regex101.com)
const TEMPLATE_CODE_REGEX = /{%(.*?)%}/gs
const TEMPLATE_STRING_REGEX = /{{([^\n]*?)}}/gs
const ECHO_REGEX = /echo\s(.*\(.*?\).*)+;/gs;
const AWAIT_REGEX = (name:string) => new RegExp(`^\\s*(${name}\\(.*?\\))`, "gs");

//Other constants
const TEMPLATE_DIRECTORY = "/templates/"
const INCLUDED_FUNCTIONS = {
    include: templateEngine,
    forEach: forEach,
    formatDate: formatDate,
    markdown: markdownToHTML,
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
    "e.line = e.line || trace",
    "rej(e)",
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

    const instructions = createTemplateInstructions(await getFile(filename));
    return compileTemplateInstructions(instructions, filename, args);
}

/** General String Cleaning
 * 
 * Removes unnecesary white space.
 * Excapes prohibited keywords.
 * Injects await infront of included functions.
 * 
 * @param {string} string 
 * @returns {string}
 */
function generalCleaning(string:string):string{
    string = string.replace(/\s+/gm, " ").trim();

    for(let keyword of BAD_KEYWORDS)
        string = string.replace(keyword, "_"+keyword);

    for(let name in INCLUDED_FUNCTIONS){
        const regex = AWAIT_REGEX(name)
        string = string.replace(regex, "await $1");
    }

    return string;
}

/** Clean Code String
 * 
 * Implements echo.
 * Cleans String.
 * 
 * @param {string} string 
 * @returns {string}
 */
function cleanCode(string:string):string {
    string = generalCleaning(string)
    string = string.replace(ECHO_REGEX, "output += `{{$1}}`");
    return convertToTemplateString(string);
}

/** Clean Tempalte String
 * 
 * Wraps string in template escapes
 * Cleans String
 * 
 * @param {string} string 
 * @returns {string}
 */
function cleanTemplateString(string: string):string { 
    return "${" + generalCleaning(string) + "}";
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
            instructions.push( cleanCode(e.substring(2, e.length-2)) );
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

    let argNames =  Object.keys(args);
    let argValues = Object.values(args);

    try {
        return await new Function(...argNames, instructions.join("\n"))(...argValues);
    } catch (e: any){
        if(e instanceof TemplateError)
            throw e;
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
    for(let i in arr) {
        try {
            buffer += await loopCallback(arr[i], i);
        } catch (e){
            buffer += e.message;
        }
    }
        

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

/** Convert Markdown To HTML
 * 
 * @param {string} string 
 * @returns {string}
 */
function markdownToHTML(string:string):string {
    //Escape Html;
    string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    //Code Block
    string = createMarkdownBlock(string, "pre", /\n`/gm);

    //Blockquotes
    string = createMarkdownBlock(string, "blockquote", /\n&gt;/gm);

    //Ordered List
    string = createMarkdownBlock(string, "ol", /\n\d+\./gm, "•");

    //Unordered List
    string = createMarkdownBlock(string, "ul", /\n[*+-] /gm, "•");

    return string
        .replace(/(^[*-]+$)/gm, "<hr/>")                               //Horizontal Rule
        .replace(/^#{1,6} (.*?)$/gim, '<h3>$1</h3>')                   //Headers
        .replace(/[*_]{2}([^*_].*?)[*_]{2}/gm, '<strong>$1</strong>')  //Bold
        .replace(/[*_]{1}(.*?)[*_]{1}/gm, '<em>$1</em>')               //Italics
        .replace(/^•(.*)$/gm, '<li>$1</li>')                           //List Item
        .replace(/!\[(.*?)\]\((.*?)\)/gm, "<img alt='$1' src='$2' />") //Image
        .replace(/\[(.*?)\]\((.*?)\)/gm, "<a href='$2'>$1</a>")        //Links
        .replace(/`(.*?)`/gm, "<code>$1</code>")                       //Code lines
        .replace(/\n$/gim, '<br/>');                                   //Line Break
}

/** Create Markdown Block
 * 
 * Used to replce elemets in the string because javascript regex won't work
 * with multiline regex.
 *
 * @param {string} string
 * @param {string} element
 * @param {RegExp} regex
 * @param {string} dilimiter
 * @returns {string}
 */
function createMarkdownBlock(string:string, element:string, regex:RegExp, dilimiter?:string):string {
    let split = string.split(regex);
    let output = split[0] + '\n';
    let inBlock = false;
    for(let i = 1; i < split.length; i++) {
        if( !inBlock ) {
            output += `<${element}>\n`;
            inBlock = true;
        }

        if(dilimiter)
            output += dilimiter;

        let index = split[i].indexOf('\n');
        if(index === -1) {
            output += split[i] + '\n';
        } else {
            output += split[i].substring(0, index) + `</${element}>`
                + split[i].substring(index+1);
            inBlock = false;
        }
    }

    if(inBlock)
        output += `</${element}>`;

    return output;
}