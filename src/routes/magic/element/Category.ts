/** /routes/magic/element/Category
 * 
 * @author Alex Malotky
 */
import { createElement as _ } from "@/util/Element";
import CardElement from "./CardInput";
import NewCardInput from "./NewCardInput";
import Card from "../data/card";

/** Category Element
 * 
 */
export default class CategoryElement extends HTMLElement {
    _input: NewCardInput;
    _list: HTMLUListElement;
    _name: string;

    /** Constructor
     * 
     * @param {string} name 
     * @param {string|Array} list 
     */
    constructor(name:string, list:string|Array<string> = []){
        super();
        
        this.id = name;
        this._name = name || "";

        if(typeof list === "string")
            list = list.split("\n");
        
        this._list = document.createElement("ul");

        for(let line of list)
            this._list.appendChild(new CardElement(line));
        
        this._input = new NewCardInput();
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
        const name = document.createElement("span");
        name.textContent = this._name;

        const btnDelete = _("button", {type: "button"}, "Delete");
        btnDelete.style.fontSize = "0.8em";
        btnDelete.addEventListener("click", ()=>this.delete());

        header.appendChild(name);
        header.appendChild(btnDelete);

        this.appendChild(header);
        this.appendChild(this._list);
    }
}

customElements.define("category-section", CategoryElement, {extends: "section"});