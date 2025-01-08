/** /routes/magic/element/NewCardInput
 * 
 * @author Alex Malotky
 */
import { getShard } from "@/util/Scryfall";
import AutoComplete from "@/elements/AutoComplete";
import CardInput, { createCardFromString } from "./CardInput";
import { createElement as _ } from "@/util/Element";

export default class NewCardInput extends HTMLElement {
    private static async getListFromShard(value:string = ""):Promise<Array<string>>{
        value = value.trim();
        if(value){
            const char = value.charAt(0).toUpperCase();
            return (await getShard(char)).match(/(?<="name":").*?(?=")/gm)!;
        }
        
        return [];
    }

    /** Adds card to the list.
     * 
     * @param cardName 
     */
    private find(cardName:string){
        createCardFromString(cardName).then(card=>{
            console.debug(card);
            this.parentElement!.insertBefore(new CardInput(card), this);
            this.dispatchEvent(new CustomEvent("input", {bubbles: true, cancelable: true}));
        });
    }

    connectedCallback(){
        const nameElement = document.createElement("div");
        const input = document.createElement("input");
        this.appendChild(nameElement);

        const autoComplete = new AutoComplete(NewCardInput.getListFromShard, input);
        nameElement.appendChild(autoComplete);
        input.placeholder = "Card Name";

        //Submit Name Button
        const btnFind = _("button", {type: "button"});
        btnFind.textContent = "+";

        btnFind.addEventListener("click", ()=>{
            this.find(input.value);
            input.value = "";
        });

        autoComplete.addEventListener("submit", ()=>btnFind.click());

        this.appendChild(btnFind);
    }

    async value(){
        return null;
    }
}

customElements.define("new-card-input", NewCardInput);