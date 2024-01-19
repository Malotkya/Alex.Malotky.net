export default class ToolTip extends HTMLElement {
    private _text: ToolTipText|undefined;

    constructor(text?:string){
        super();

        if(text)
            this._text = new ToolTipText(text);

        this.addEventListener("mouseover", (event:MouseEvent)=>{
            if(this._text)
                this.appendChild(this._text);
        });

        this.addEventListener("mousemove", (event:MouseEvent)=>{
            if(this._text){
                const width:number = document.body.clientWidth;
                //const height:number = ???;
    
                if(event.pageX + this._text.offsetWidth > width) {
                    this._text.style.left = `${width - this._text.offsetWidth}px`;
                } else {
                    this._text.style.left = `${event.pageX}px`;
                }
                
                this._text.style.top = `${event.pageY}px`;
            }
        });

        this.addEventListener("mouseleave", ()=>{
            if (this._text)
                this.removeChild(this._text);
        });
    }

    static get observedAttributes(){
        return ["text"]
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "text") {
            this.text = newValue;
        }
    }

    set text(value:string) {
        if(this._text){
            this._text.textContent = value;
        } else {
            this._text = new ToolTipText(value);
        }
    }

    get text(){
        if(this._text){
            return this._text.textContent;
        }

        return "";
    }
    
    connectedCallback(){
        if(this._text === undefined) {
            this._text = this.querySelector("tool-tip-text");

            if(this._text){
                this.removeChild(this._text);
            } else {
                console.warn("Unable to find tooltip text for:\n%o", this);
                return;
            }
        }

        if(this.getAttribute("aria-describedby") === null){
            if(this._text.id === "")
                this._text.id = Math.random().toString().substring(2);
    
            this.setAttribute("aria-describedby", this._text.id);
        }
    }

    
}

class ToolTipText extends HTMLElement {
    private _text: string|undefined;

    constructor(text?:string){
        super();
        this._text = text;
    }

    connectedCallback(){
        this.setAttribute("role", "tooltip");
        if(this._text)
            this.textContent = this._text;
    }
}
customElements.define("tool-tip-text", ToolTipText);