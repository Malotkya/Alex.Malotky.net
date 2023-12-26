import { Card } from "../../../../../util/Scryfall";

export default class CardElement extends HTMLLIElement {
    private _name:string;
    private _title:string;
    private _images:Array<string>;
    private _type: string;
    private _oracle: string;
    private _foil: boolean;

    constructor(card:Card) {
        super();
        this.className = "card";
        this._name = card.name;
        this._title = `${card.count} ${card.name.replace("//", "<br>&nbsp;&nbsp;")}`
        this._images = card.image || [];
        this._type = card.typeLine || "Type Line";
        this._oracle = card.oracle || "Oracle Text";
        this._foil = card.foil;

        //Needed for apple devices
        this.addEventListener("click", ()=>this.focus());
    }

    private get name():HTMLElement {
        const span = document.createElement("span");
        span.className = "name";
        span.innerHTML = this._title;
        return span;
    }

    private get foil():HTMLElement|undefined {
        if(this._foil) {
            const div = document.createElement("div");
            div.className = "foil";
            return div;
        }
    } 

    private get images(): Array<HTMLElement>{
        const list: Array<HTMLElement> = [];

        if(this._images.length !== 0){
            const altText = split(this._name);

            for(let i=0; i<this._images.length; i++){
                const img = document.createElement("img");
                img.alt = `${altText(i)} ${side(i)}`;
                img.src = this._images[i];
                list.push(img);
            }

        } else {
            const backup = document.createElement("div");
            backup.className = "oracle";
            backup.innerHTML = `<p>${this._type}</p><p>${this._oracle}</p>`;
            list.push(backup);
        }

        return list;
    }

    private get figure(): HTMLElement{
        const wrapper = document.createElement("span");
        const figure = document.createElement("figure");
        const list = this.images;

        if(list.length > 1)
            figure.className = "doubleFace";

        const images = document.createElement("div");
        images.className = "figure";
        for(let img of list)
            images.appendChild(img);
        figure.appendChild(images);

        const foil = this.foil;
        if(foil)
            figure.appendChild(foil);

        wrapper.appendChild(figure);
        return wrapper;
    }

    public connectedCallback(){
        this.innerHTML = "";
        this.appendChild(this.name);
        this.appendChild(this.figure);
    }
}

/** Side Text
 * 
 * @param {number} s 
 * @returns {string}
 */
function side(s:number):string {
    if(s === 0)
        return "Front";

    if(s === 1)
        return "Back";

    return "Side " + s;
}

/** Split Names into Sides
 * 
 * @param {string} name 
 * @returns {Function}
 */
function split(name:string):(i:number)=>string{
    const array: Array<string> = name.split("//");
    return (s:number):string =>{
        if(s >= array.length)
            s = array.length - 1;

        return array[s];
    }
}

customElements.define("card-list-element", CardElement, { extends: "li" });