import { createBlock } from "@/util";

class MarkDownElement extends HTMLElement {
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
        markdown = createBlock(markdown, "ol", /\n\d+./gm, "•");

        //Unordered List
        markdown = createBlock(markdown, "ul", /\n[*+-] /gm, "•");

        this.innerHTML = markdown
            .replace(/(^[*-]+$)/gm, "<hr/>")                                        //Horizontal Rule
            .replace(/^\s*#{1} (.*?)$/gim, '<h3>$1</h3>')                           //Headers 1
            .replace(/^\s*#{2} (.*?)$/gim, '<h4>$1</h4>')                           //Headers 2
            .replace(/^\s*#{3} (.*?)$/gim, '<h5>$1</h5>')                           //Headers 3
            .replace(/^\s*#+ (.*?)$/gim,   '<h6>$1</h6>')                           //Headers 4+
            .replace(/[*_]{2}([^*_].*?)[*_]{2}/gm, '<strong>$1</strong>')           //Bold
            .replace(/[*_]{1}(.*?)[*_]{1}/gm, '<em>$1</em>')                        //Italics
            .replace(/^\s*•(.*)$/gm, '<li>$1</li>')                                 //List Item
            .replace(/!\[(.*?)\]\((.*?)\)/gm, "<img alt='$1' src='$2' />")          //Image
            .replace(/\[(.*?)\]\((.*?)\)/gm, "<a href='$2' target='_blank'>$1</a>") //Links
            .replace(/`(.*?)`/gm, "<code>$1</code>")                                //Code lines
            .replace(/\n$/gim, '<br/>')                                             //Line Break
            .replace(/(<br\/>)+$/g, '')                                             //Remove all trailing breaks
    }
}

customElements.define("mark-down", MarkDownElement);