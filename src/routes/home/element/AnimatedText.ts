const TEXT_DELAY = 15;//ms

export default class AnimatedText extends HTMLElement {
    private _text: string;
    private _running:boolean;

    constructor(text:string = ""){
        super();

        this._text = text;
        this._running = false;
    }

    static get observedAttributes(){
        return ["text"]
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "text"){
            this._text = newValue;
        }
    }

    connectedCallback(){
        if(!this._running) {

            this._running = true;
            let index:number = 0;
            this.innerText = "";

            const placeChar = () => {
                this.textContent += this._text[index++];
        
                if(index < this._text.length)
                    window.setTimeout(placeChar, TEXT_DELAY);
                else
                    this._running = false;
            }

            placeChar();
        }
    }
}

customElements.define("animated-text", AnimatedText);