import CardElement, {Card} from "./CardElemet";

export default class Category extends HTMLElement {
    _input: CardElement;
    _list: HTMLUListElement;
    _name: string;

    constructor(name?:string, list:string|Array<string> = []){
        super();
        this._name = name;

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
                output.push(element.card);
            }
        });

        return output;
    }

    private create(name:string){
        this.parentElement.insertBefore(new Category(name), this);
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
            btnAdd.addEventListener("click", ()=>{
                this.create(input.value);
                input.value = "";
            }); 

            const li = document.createElement("li");
            li.appendChild(btnAdd);
            this._list.appendChild(li);
            this._list.removeChild(this._input);
        }

        this.appendChild(header);
        this.appendChild(this._list);
    }
}

customElements.define("category-section", Category, {extends: "section"});