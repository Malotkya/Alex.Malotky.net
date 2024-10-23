const TEXT_DELAY = 15;//ms

export default class AnimatedText extends HTMLElement {
    private _text: string[];

    constructor(){
        super();
        this._text = [];
    }

    disconnectedCallback(){
        this.textContent += this._text.join("");
        this._text = [];
    }

    connectedCallback(){
        this._text = this.innerText.split("");
        this.innerText = "";

        const placeChar = () => {

            if(this.isConnected){
                this.textContent += this._text.splice(0,1).join("");
        
                if(this._text.length > 0)
                    window.setTimeout(placeChar, TEXT_DELAY);
            }
        }

        placeChar();
    }
}

customElements.define("animated-text", AnimatedText);