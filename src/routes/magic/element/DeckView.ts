import { DeckItem } from "../types";
import { createElement as _, appendChildren } from "@/util/Element";
import CatagoryList, {CardElement} from "./CatagoryList";

export default class DeckView extends HTMLElement {
    private _data:DeckItem|undefined;

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

    disconnectedCallback(){
        this.innerHTML = "";
    }

    connectedCallback(){
        if(this._data === undefined){
            this.appendChild(_("p", {class: "error"}, "No data!"))
        } else {
            appendChildren(this, [
                _("section", {id:"commanders", class: "category"},
                    _("h2", this._data.commanders.length > 2? "Commanders:": "Commander:"),
                    _("ul", this._data.commanders.map(c=> CardElement(c)))
                ),
                new CatagoryList(this._data.main_deck)
            ])
        }
    }
}

customElements.define("deck-view", DeckView);