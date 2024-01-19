/**
    * Used to replce elemets in the string because javascript regex won't work
    * with multiline regex.
    *
    * @param {string} string - the markdown string
    * @param {string} element - html element to insert
    * @param {RegExp} regex - regex for where to split the markdown
    * @param {string} dilimiter - optional dilimiter for sub elements
    */
function createBlock(string:string, element:string, regex:RegExp, dilimiter?:string){
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

export default class MarkDownElement extends HTMLElement {
    constructor(innerHTML?:string){
        super();
        if(innerHTML)
            this.innerHTML = innerHTML;
    }

    connectedCallback(){
        let markdown = this.innerHTML;
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

        this.innerHTML = markdown
            .replace(/(^[*-]+$)/gm, "<hr/>")                               //Horizontal Rule
            .replace(/^\s*#{1} (.*?)$/gim, '<h3>$1</h3>')                  //Headers 1
            .replace(/^\s*#{2} (.*?)$/gim, '<h4>$1</h4>')                  //Headers 2
            .replace(/^\s*#{3} (.*?)$/gim, '<h5>$1</h5>')                  //Headers 3
            .replace(/^\s*#+ (.*?)$/gim,   '<h6>$1</h6>')                  //Headers 4-6
            .replace(/[*_]{2}([^*_].*?)[*_]{2}/gm, '<strong>$1</strong>')  //Bold
            .replace(/[*_]{1}(.*?)[*_]{1}/gm, '<em>$1</em>')               //Italics
            .replace(/^\s*•(.*)$/gm, '<li>$1</li>')                        //List Item
            .replace(/!\[(.*?)\]\((.*?)\)/gm, "<img alt='$1' src='$2' />") //Image
            .replace(/\[(.*?)\]\((.*?)\)/gm, "<a href='$2'>$1</a>")        //Links
            .replace(/`(.*?)`/gm, "<code>$1</code>")                       //Code lines
            .replace(/\n$/gim, '<br/>');                                   //Line Break
        }
}