/** /routes/magic/element/Category
 * 
 * @author Alex Malotky
 */
import { createElement as _ } from "@/util/Element";
import CardElement from "./CardInput";
import Card from "../data/card";

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
        this._name = name || "";

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
    async value():Promise<Card[]>{
        const output: Array<Card> = [];

        for(const element of Array.from(this._list.childNodes)){
            const value:Card|null = await (element as CardElement).value();

            if(value !== null){
                output.push(value);
            }
        }
        
        return output;
    }

    /** Create New Category
     * 
     * @param {string} name 
     */
    private create(name:string){
        this.parentElement!.insertBefore(new CategoryElement(name), this);
        this.dispatchEvent(new Event("input"));
    }

    /** Delete Category
     * 
     */
    private delete(){
        if(window.confirm(`Are you sure you want to remove ${this._name}?`)){
            this.parentElement!.removeChild(this);
        }
    }

    /** Connected Callback
     * 
     */
    public connectedCallback(){
        this.innerHTML = "";

        const header = document.createElement("h3");
        
        if(this._name){
            const name = document.createElement("span");
            name.textContent = this._name;

            const btnDelete = _("button", {type: "button"}, "Delete");
            btnDelete.style.fontSize = "0.8em";
            btnDelete.addEventListener("click", ()=>this.delete());

            header.appendChild(name);
            header.appendChild(btnDelete);
            
        } else {
            const input = document.createElement("input");
            input.placeholder = "Category Name";
            header.appendChild(input);

            const btnAdd = _("button", {type: "button"}, "Create Category");
            btnAdd.style.margin = "0 auto";
            btnAdd.style.display = "block";
            btnAdd.addEventListener("click", ()=>{
                this.create(input.value);
                input.value = "";
            }); 

            const li = document.createElement("li");
            li.style.listStyle = "none";
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