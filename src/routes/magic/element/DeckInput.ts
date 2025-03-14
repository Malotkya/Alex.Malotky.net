/** /routes/magic/element/DeckInput
 * 
 * @author Alex Malotky
 */
import { createElement as _, appendChildren } from "@/util/Element";
import { DeckItem } from "../data/deck";
import CatagoryInput from "./CatagoryInput";

/** Deck Input Element
 * 
 */
export default class DeckInput extends HTMLFormElement {
    _data:DeckItem|undefined;

    static get observedAttributes(){
        return ["data"]
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "data"){
            this.data = decodeURIComponent(escape(atob(newValue)));
        }
    }

    set data(value:string) {
        const temp = JSON.parse(value);

        if(typeof temp.name !== "string")
            throw new TypeError("Deck name must be a string!");

        if(typeof temp.description !== "string")
            throw new TypeError("Deck description must be a string!")

        if(!Array.isArray(temp.commanders))
            throw new TypeError("Commander list must be an array!");

        if(typeof temp.main_deck !== "object")
            throw new TypeError("Main Deck must be an object!");

        for(let cat in temp.main_deck) {
            if(!Array.isArray(temp.main_deck[cat]))
                throw new TypeError(`${cat} list must be an array!`);
        }

        this._data = temp;
    }

    connectedCallback(){
        if(this.innerHTML !== ""){
           return;
        }

        const { id = null,
                name = "",
                description = "", 
                commanders = [],
                main_deck = {}
        } = this._data || {};

        const input = new CatagoryInput(commanders, main_deck);

        this.addEventListener("submit", (event)=>{
            if(!input.ready) {
                event.preventDefault();
                event.stopPropagation();
                alert("Form not ready to submit!");
            }
        })

        appendChildren(this, [
            _("a", {href: "/Decks/Edit", class:"btn", clear:"true"}, "Back"),
            id ? _("a", {href: `/Decks/${id}`, id: "btnView", class: "btn", clear:"true"}, "View")
                : null,
            _("button", {id:"submit"}, "Save Changes"),
            _("h1", "Deck Editor"),
            _("label", {for: "name"}, "Deck Name:"),
            _("input", {id: "name", name: "name", value: name}),
            _("label", {for:"description"}, "Description:"),
            _("textarea", {id:"description", name: "description"}, description),
            _("label", {for: "deckList"}, "Deck List:"),
            input
        ]);
    }
}

customElements.define("deck-input", DeckInput, {extends: "form"});