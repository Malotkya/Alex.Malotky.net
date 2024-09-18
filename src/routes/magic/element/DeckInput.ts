import { createElement as _ } from "@/util/Element";
import { DeckItem } from "../types";
import CatagoryInput from "./CatagoryInput";

export default class DeckInput extends HTMLElement {
    _data:DeckItem|undefined;

    static get observedAttributes(){
        return ["data"]
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "data"){
            this.data = atob(newValue);
        }
    }

    set data(value:string) {
        const temp = JSON.parse(value);

        if(typeof temp.name !== "string")
            throw new TypeError("Deck name must be a string!");

        if(typeof temp.description !== "string")
            throw new TypeError("Deck description must be a string!");

        if(typeof temp.art !== "string")
            throw new TypeError("Deck art must be a string!");

        if(!Array.isArray(temp.color_identity))
            throw new TypeError("Color identity list must be an array!");

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
        if(this.innerHTML === ""){
           return;
        }

        const { id = "undefined",
                name = "",
                description = "", 
                commanders = [],
                main_deck = {}
        } = this._data || {};

        const txtName = _("input", {id: "name", value: name}) as HTMLInputElement;
        const txtDescription = _("textarea", {id:"description"}, description) as HTMLTextAreaElement;
        const editor = new CatagoryInput(commanders, main_deck);

        const form = _("form",
            _("a", {href: "/Decks/Editor", class:"btn", clear:"true"}, "Back"),
            _("a", {href: `/Decks/${id}`, id: "btnView", class: "btn", clear:"true"}, "View"),
            _("button", {id:"submit"}, "Save Changes"),
            _("h1", "Deck Editor"),
            _("label", {for: "name"}, "Deck Name"),
            txtName,
            _("label", {for:"description"}),
            txtDescription,
            _("label", {for: "deckList"}, "Deck List:"),
            editor
        );

        form.addEventListener("submit", (event)=>{
            event.preventDefault();

            const deck = editor.getDeckObject() as DeckItem;
            deck.name = txtName.value;
            deck.description = txtDescription.value;
            
            const data = new FormData();
            data.set("deck", JSON.stringify(deck));

            //@ts-expect-error
            window.route("/Decks/Editor/Update/"+id, {deck: JSON.stringify(data)})
        })
    }
}

customElements.define("deck-input", DeckInput);