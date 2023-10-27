import { Card } from "../Edit/CardInputElemet";

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
    }

    private get name():HTMLElement {
        const span = document.createElement("span");
        span.className = "name";
        span.innerHTML = this._title;
        return span;
    }

    private get foil():HTMLElement {
        if(this._foil) {
            const div = document.createElement("div");
            div.className = "foil";
            return div;
        }
    } 

    private get images(): Array<HTMLElement>{
        const list: Array<HTMLElement> = [];

        if(this._images.length !== 0){

            for(let side in this._images){
                const img = document.createElement("img");
                img.alt = `${this._name} ${side}`;
                img.src = this._images[side];
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

customElements.define("card-list-element", CardElement, { extends: "li" });