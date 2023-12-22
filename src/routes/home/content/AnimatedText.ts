const TEXT_DELAY = 15;//ms

export default class AnimatedText extends HTMLElement {
    private _text: string;

    constructor(text:string){
        super();

        this._text = text;
    }

    connectedCallback(){
        this.innerText = "";
        let index:number = 0;

        const placeChar = () => {
            this.textContent += this._text[index++];
    
            if(index < this._text.length)
                window.setTimeout(placeChar, TEXT_DELAY);
        }
        placeChar();
    }
}

customElements.define("animated-text", AnimatedText);