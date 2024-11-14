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

export function MarkDown(markdown:string):string {
    //Escape Html;
    markdown = markdown.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    //Code Block
    markdown = createBlock(markdown, "pre", /\n`/gm);

    //Blockquotes
    markdown = createBlock(markdown, "blockquote", /\n&gt;/gm);

    //Ordered List
    markdown = createBlock(markdown, "ol", /\n\s*\d+./gm, "•");

    //Unordered List
    markdown = createBlock(markdown, "ul", /\n\s*[*+-] /gm, "•");

    return markdown
        .replace(/(^[*-]+$)/gm, "<hr/>")                                        //Horizontal Rule
        .replace(/^#{1} (.*?)$/gim, '<h3>$1</h3>')                           //Headers 1
        .replace(/^#{2} (.*?)$/gim, '<h4>$1</h4>')                           //Headers 2
        .replace(/^#{3} (.*?)$/gim, '<h5>$1</h5>')                           //Headers 3
        .replace(/^#+ (.*?)$/gim,   '<h6>$1</h6>')                           //Headers 4+
        .replace(/[*_]{2}([^*_].*?)[*_]{2}/gm, '<strong>$1</strong>')           //Bold
        .replace(/[*_]{1}(.*?)[*_]{1}/gm, '<em>$1</em>')                        //Italics
        .replace(/^•(.*)$/gm, '<li>$1</li>')                                 //List Item
        .replace(/!\[(.*?)\]\((.*?)\)/gm, "<img alt='$1' src='$2' />")          //Image
        .replace(/\[(.*?)\]\((.*?)\)/gm, "<a href='$2' target='_blank'>$1</a>") //Links
        .replace(/`(.*?)`/gm, "<code>$1</code>")                                //Code lines
        .replace(/\n$/gim, '<br/>')                                             //Line Break          
}

export function sleep(n:number = 1):Promise<void> {
    return new Promise((r)=>setTimeout(r, n));
}