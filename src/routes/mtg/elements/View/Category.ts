import {Card} from "../../../../util/Scryfall";
import CardElement from "./Card";

export default class CategoryView extends HTMLElement {
    private _name:string;
    private _list: Array<Card>;

    constructor(name:string, list:Array<Card>){
        super();
        this.className = "category";

        this._name = name;
        this._list = list;
    }

    public connectedCallback(){
        this.innerHTML = "";

        const header = document.createElement("h2");
        header.textContent = this._name;
        this.appendChild(header);

        const list = document.createElement("ul");
        this.appendChild(list);

        for(let card of this._list)
            list.appendChild(new CardElement(card));
    }
}

customElements.define("category-view", CategoryView, {extends: "section"});