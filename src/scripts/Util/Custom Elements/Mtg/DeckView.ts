import { Card } from "./Edit/CardInputElemet";
import CategoryView from "./View/Category";
import Masonry from "masonry-layout";

export default class DeckView extends HTMLElement{
    private _list: Map<string, Array<Card>>;

    constructor(categories?:any){
        super();
        this._list = new Map();
        this.style.display = "block";

        if(typeof categories !== "undefined")
            this.categories = categories;
    }

    private set categories(value: any){
        for(let name in value){
            const list:Array<Card> = value[name];
            if(!Array.isArray(list))
                throw new TypeError(`'${name}' category is not formated as a list!`);

            this._list.set(name, list);
        }   
    }

    public connectedCallback(){
        if(this._list.size === 0)
            this.categories = JSON.parse(this.innerText);

        this.innerHTML = "";
        const categories = Array.from(this._list.entries()).sort((a,b)=>a[0].localeCompare(b[0]));
        for( let [name, list] of  categories) 
            this.appendChild(new CategoryView(name, list));

        new Masonry(this, {
            itemSelector: '.category',
            columnWidth: '.category',
            percentPosition: true
        }).layout();
    }
}

customElements.define("deck-view", DeckView);