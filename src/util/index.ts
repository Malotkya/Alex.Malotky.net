/** /util
 * 
 * @author Alex Malotky
 */

//Date Formatting Constants
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

/** Format Date Function
 * 
 * @param {Date|number|string} date 
 * @param {string} format  %Y   - year as 4 char string
 *                         %y   - year as 2 char string
 *                         %M-n - month as a number
 *                         %M   - month as a string
 *                         %m   - month as abreviated string
 *                         %D   - Date of month
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
export function formatDate(date:string|Date|number|undefined|null, format:string, ifNull?:string):string {
    if(date === null){
        return  ifNull || "null";

    } else if(date === undefined){
        return ifNull || "undefined";

    } else if(date === "") {
        return ifNull || "empty";

    } else {
        switch(typeof date){
            case "string":
                date = date.replace(/-/g, "/");
            
            case "number":
                date = new Date(date);
                break;
        }
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

/**
    * Used to replce elemets in the string because javascript regex won't work
    * with multiline regex.
    *
    * @param {string} string - the markdown string
    * @param {string} element - html element to insert
    * @param {RegExp} regex - regex for where to split the markdown
    * @param {string} dilimiter - optional dilimiter for sub elements
    */
export function createBlock(string:string, element:string, regex:RegExp, dilimiter?:string){
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

/** Mark Down Element
 * 
 */
interface MarkdownElement {
    name:string,
    attributes?:string,
    lines:string[]|string
}

//Const used by getMarkdownElement function
const ZERO       = "0".charCodeAt(0);
const NINE       = "9".charCodeAt(0);
const HEADER     = "#".charCodeAt(0);
const LIST_STAR  = "*".charCodeAt(0);
const LIST_DASH  = "-".charCodeAt(0);
const FORMAT     = "`".charCodeAt(0);
const BLOCKQUOTE = "&".charCodeAt(0);
const TABLE      = "|".charCodeAt(0);

/** getMarkdownElement
 * 
 * @param {string} line 
 * @returns {MarkdownElement|null}
 */
function getMarkdownElement(line:string):MarkdownElement|null {
    const first = line.charCodeAt(0);
    line = line.substring(1);

    if (first === HEADER) { 
        let char = line.charAt(0);
        let count = 3;
        while(char === "#") {
            ++count;
            char = line.charAt(0,);
            line = line.substring(1);
        }

        if(char !== " ")
            return null;

        if(count > 6)
            count = 6;

        return {
            name: `h${count}`,
            lines: line
        }

    } else if (first === FORMAT){
        return {
            name: "pre",
            lines: [line]
        }

    } else if(first >= ZERO && first <= NINE) {
        const next = line.charAt(0);
        const space = line.charAt(1);

        if(next !== ")" && next !== ".")
            return null;

        if(space !== " ")
            return null;

        return {
            name: "ol",
            lines: ["<li>"+line.substring(2)+"</li>"]
        }

    } else if(first === LIST_STAR) {
        if(line.charAt(0) !== " ")
            return null;

        return {
            name: "ul",
            lines: ["<li>"+line.substring(1)+"</li>"]
        }

    } else if (first === LIST_DASH) {
        if(line.charAt(0) !== " ")
            return null;

        return {
            name: "ul",
            attributes: "dash",
            lines: ["<li>"+line.substring(1)+"</li>"]
        }
        
    } else if(first === BLOCKQUOTE) {
        if(line.slice(0, 4) !== "gt; ")
            return null;

        return {
            name: "blockquote",
            lines: [line.substring(4)]
        }

    } else if(first === TABLE) {
        const end = line.length-1;
        if(line.charCodeAt(end) === TABLE) {
            return {
                name: "table",
                lines: [line.substring(0, end)]
            }
        }

        return null;
    }

    return null;
}

/** getAttributesForTable
 * 
 * @param table 
 */
function getAttributesForTable(table:string[]):string[]|null {
    if(table.length < 2)
        return null;

    const test = table[1].split("|");
    const output = [];
    let valid = true;

    for(const value of test){
        if(value.match(/^ ?:-+: ?$/)) {
            output.push("center");
        } else if(value.match(/^ ?-+: ?$/)) {
            output.push("right")
        } else if(value.match(/^ ?:-+ ?$/)) {
            output.push("left")
        } else if(value.match(/^ ?-+ ?$/) === null){
            valid = false;
            break;
        }
    }

    if(valid){
        table.splice(1, 1);
        return output;
    }

    return null;
}

/** format Markdown Elements
 * 
 * @param {MarkdownElement} element 
 * @returns {string}
 */
function formatMarkdownElements(element:MarkdownElement):string {
    let open:string, close:string, content:string = "";
    if(element.name === "table") {
        open = element.name;
        close = element.name;

        const table = typeof element.lines === "string"
            ? element.lines.split("\n")
            : element.lines;

        let attributes = getAttributesForTable(table);
        if(attributes) {
            const head = table.shift()!.split("|");
            content += "<tr>";

            for(let index=0; index<head.length; ++index){
                const value = head[index];
                const att = attributes[index];

                content += `<th${att? ` class="${att}"`: ""}>${value}</th>`
            }

            content += "</tr>";
        } else {
            attributes = [];
        }

        for(const string of table){
            const row = string.split("|");
            content += "<tr>";

            for(let index=0; index<row.length; index++){
                const att = attributes[index];
                content += `<td${att? ` class="${att}"`: ""}>${row[index]}</td>`
            }
            content += "</tr>"
        }

    } else {
        open = element.name;
        close = element.name;

        if(element.attributes){
            open += ` class="${element.attributes}"`;
        }

        if(Array.isArray(element.lines)) {
            content = element.lines.join("");
        } else {
            content = element.lines;
        }
    }

    return `<${open}>${content}</${close}>`
}


export function MarkDown(markdown:string):string {
    const input:Array<string> = markdown
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')                            //Escape Html
        .replace(/(^[*-]+$)/gm, "<hr/>")                                        //Horizontal Rule
        .replace(/[*_]{2}([^*_].*?)[*_]{2}/gm, '<strong>$1</strong>')           //Bold
        .replace(/[*_]{1}(.*?)[*_]{1}/gm, '<em>$1</em>')                        //Italics
        .replace(/!\[(.*?)\]\((.*?)\)/gm, "<img alt='$1' src='$2' />")          //Image
        .replace(/\[(.*?)\]\((.*?)\)/gm, "<a href='$2' target='_blank'>$1</a>") //Links
        .replace(/`(.*?)`/gm, "<code>$1</code>")                                //Code lines
            .split("\n");
    const output:Array<MarkdownElement> = [];

    for(let string of input){

        if(string.trim()){
            const element = getMarkdownElement(string);

            if(element){
    
                if(output.length > 0) {
                    const last = output.pop()!;

                    if(last.name === element.name && last.attributes === element.attributes){
                        if(Array.isArray(last.lines)) {
                            last.lines = last.lines.concat(element.lines);
                            output.push(last);
                        } else {
                            output.push(last);
                            output.push(element);
                        }

                    } else {
                        if(Array.isArray(last.lines)) {
                            last.lines = last.lines.join("\n");
                        }

                        output.push(last);
                        output.push(element);
                    }

                } else {
                    output.push(element);
                }
    
            } else {
                output.push({
                    name: "p",
                    lines: string
                });
            }

        } else if(output.length > 0) {
            const last = output.pop()!;

            if(Array.isArray(last.lines)) {
                last.lines = last.lines.join("\n");
            }

            output.push(last);
        }
    } 

    return output.map(formatMarkdownElements).join("");
}

export function sleep(n:number = 1):Promise<void> {
    return new Promise((r)=>setTimeout(r, n));
}