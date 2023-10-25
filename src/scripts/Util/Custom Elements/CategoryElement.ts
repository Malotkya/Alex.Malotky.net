import CardElement, {Card} from "./CardElemet";

export default class Category extends HTMLElement {
    _input: CardElement;
    _list: HTMLUListElement;
    _name: string;

    constructor(name?:string, list:string|Array<string> = []){
        super();
        this._name = name;
        this.className = "category";

        if(typeof list === "string")
            list = list.split("\n");
        
        this._list = document.createElement("ul");

        for(let line of list)
            this._list.appendChild(new CardElement(line));
        
        this._input = new CardElement();
        this._list.appendChild(this._input);
    }

    public add(card:string|CardElement){
        if(typeof card === "string")
            card = new CardElement(card);

        this._list.insertBefore(card, this._input);
    }

    get value():Array<Card>{
        const output: Array<Card> = [];

        this._list.childNodes.forEach((element:CardElement)=>{
            const value:Card = element.card;

            if(typeof value !== "undefined"){
                //Clone what we need
                output.push({
                    name: value.name,
                    count: value.count,
                    set: value.set,
                    collector_number: value.collector_number,
                    foil: value.foil,
                    image: value.image
                });
            }
        });

        return output;
    }

    public connectedCallback(){
        const header = document.createElement("h3");
        
        if(this._name){
            header.textContent = this._name;
        } else {
            const input = document.createElement("input");
            header.appendChild(input);

            const btnAdd = document.createElement("button");
            btnAdd.textContent = "Create Category";
            btnAdd.addEventListener("click", ()=>alert("Click!")); //TODO: Create new category!!

            const li = document.createElement("li");
            li.appendChild(btnAdd);
            this._list.appendChild(li);
        }

        this.appendChild(header);
        this.appendChild(this._list);
    }
}

customElements.define("category-section", Category, {extends: "section"});