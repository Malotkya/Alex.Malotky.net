/** /Util/Custom Elements/CategoryElement.ts
 * 
 * @author Alex Malotky
 */
import CardElement, {Card} from "./CardElemet";

/** Category Element
 * 
 */
export default class CategoryElement extends HTMLElement {
    _input: CardElement;
    _list: HTMLUListElement;
    _name: string;

    /** Constructor
     * 
     * @param {string} name 
     * @param {string|Array} list 
     */
    constructor(name?:string, list:string|Array<string> = []){
        super();
        
        if(name)
            this.id = name;
        this._name = name;

        if(typeof list === "string")
            list = list.split("\n");
        
        this._list = document.createElement("ul");

        for(let line of list)
            this._list.appendChild(new CardElement(line));
        
        this._input = new CardElement();
        this._list.appendChild(this._input);
    }

    /** Add Card
     * 
     * @param {string|CardElement} card 
     */
    public add(card:string|CardElement){
        if(typeof card === "string")
            card = new CardElement(card);

        this._list.insertBefore(card, this._input);
    }

    /** Value Getter
     * 
     * List of cards in category;
     */
    get value():Array<Card>{
        const output: Array<Card> = [];

        this._list.childNodes.forEach((element:CardElement)=>{
            const value:Card = element.card;

            if(value !== null){
                output.push(element.card);
            }
        });

        return output;
    }

    /** Create New Category
     * 
     * @param {string} name 
     */
    private create(name:string){
        this.parentElement.insertBefore(new CategoryElement(name), this);
    }

    /** Delete Category
     * 
     */
    private delete(){
        if(window.confirm(`Are you sure you want to remove ${this._name}?`)){
            this.parentElement.removeChild(this);
        }
    }

    /** Connected Callback
     * 
     */
    public connectedCallback(){
        const header = document.createElement("h3");
        
        if(this._name){
            const name = document.createElement("span");
            name.textContent = this._name;

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Delete Category";
            btnDelete.addEventListener("click", ()=>this.delete());

            header.appendChild(name);
            header.appendChild(btnDelete);
            
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

            this.appendChild(header);
            this.appendChild(this._list);
        }

        this.appendChild(header);
        this.appendChild(this._list);
    }
}

customElements.define("category-section", CategoryElement, {extends: "section"});