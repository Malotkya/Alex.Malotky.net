/** /routes/mtg/content/elements/CardInputElement.ts
 * 
 * @author Alex Malotky
 */
import { queryForCard, getShard } from "@/util/Scryfall";
import { createElement as _ } from "@/util/Element";
import AutoComplete from "@/elements/AutoComlete";
import { sleep } from "@/util";
import Card from "../data/card";

//@ts-ignore
const BLANK_CARD:Card = {
    count: -1,
    name: "",
    set: "",
    collector_number: "",
    foil: true,
}

/** CardElement Class
 * 
 * Html Representation of the Card Interface.
 * 
 */
export default class CardInput extends HTMLElement {
    //@ts-ignore
    private _value:Card|undefined;

    /** Constructor
     * 
     * @param {Card|string} card 
     */
    constructor(card?:Card|string){
        super();
        if(card)
            this.card = card;
            
    }

    /** Value Setter
     * 
     */
    set card(card:Card|string){
        if(typeof card === "string") {
            this._value = BLANK_CARD;
            this.set(card);
        } else {
            this._value = card;
        }
    }

    /** Value Getter
     * 
     */
    get card():Card|null{
        if(this._value){
            return {
                name: this._value.name,
                count: this._value.count,
                set: this._value.set,
                collector_number: this._value.collector_number,
                foil: this._value.foil,
                image: this._value.image || [],
                art: this._value.art || "",
                typeLine: this._value.typeLine || "Error",
                oracle: this._value.oracle || "Not Found",
                manaValue: this._value.manaValue? this._value.manaValue: -1,
                manaCost: this._value.manaCost || "",
                sets: undefined
            };
        } else {
            return null;
        }
    }

    async value():Promise<Card|null> {
        while(this._value === BLANK_CARD) {
            await sleep();
        }
        
        return this.card;
    }

    /** Create and Populate Select.
     * 
     * @param sets 
     * @returns 
     */
    private populate(sets: any): HTMLSelectElement{
        const select = document.createElement("select");

        if(typeof sets === "undefined"){
            const option = document.createElement("option");
            option.textContent = "Card Not Found!";
            option.value = "undefined";
            select.disabled = true;
            select.className = "disabled";
            select.appendChild(option);
            select.value = "undefined";
            return select;
        }

        for(let name in sets){
            let option = document.createElement("option");
            option.textContent = name;
            option.value = JSON.stringify(sets[name]);

            select.appendChild(option);
        }
        select.value = JSON.stringify(this._value!.image);

        select.addEventListener("change", event=>{
            this._value!.image = JSON.parse(select.value);
        });

        return select;
    }

    /** Removes the card from the list.
     * 
     */
    private delete(){
        if(window.confirm(`Are you sure you want to remove ${this._value!.name}?`)){
            this.parentElement!.removeChild(this);
        }
    }

    /** Adds card to the list.
     * 
     * @param cardName 
     */
    private find(cardName:string){
        createCardFromString(cardName).then((card:Card)=>{
            console.debug(card);
            this.parentElement!.insertBefore(new CardInput(card), this);
            this.dispatchEvent(new CustomEvent("input", {bubbles: true, cancelable: true}));
        });
    }

    /** Set new Card
     * 
     * @param {string} string 
     */
    private set(string:string){
        createCardFromString(string).then(card=>{
            this._value = card;
        }).catch(e =>{
            console.error(e);
            this._value = undefined;
        });
    }

    private static async getListFromShard(value:string = ""):Promise<Array<string>>{
        value = value.trim();
        if(value){
            const char = value.charAt(0).toUpperCase();
            return (await getShard(char)).match(/(?<="name":").*?(?=")/gm)!;
        }
        
        return [];
    }

    /** Connected Callback
     * 
     * If there is no value, then it creates an input.
     */
    public connectedCallback(){
        this.innerHTML = "";

        const nameElement = document.createElement("div");
        const input = document.createElement("input");
        this.appendChild(nameElement);

        if(this._value === BLANK_CARD) {
            //Loop back if card isn't ready.
            window.setTimeout(()=>this.connectedCallback(), 5);
        }else if(this._value){
            nameElement.className = "name";

            //Card Count Input
            input.value = String(this._value.count);
            input.type = "number";
            input.style.width = "6ch";
            input.addEventListener("change", ()=>{
                let number:number = Number(input.value);
                if(isNaN(number)){
                    number = 0;
                    input.value = "0";
                }

                this._value!.count = number;
            });
            nameElement.appendChild(input);

            //Card Name
            const span = document.createElement("span");
            span.textContent = this._value.name;
            nameElement.appendChild(span);

            //Is Foil Input
            const foilInput = document.createElement("input");
            foilInput.type = "checkbox";
            foilInput.addEventListener("change", ()=>{
                this._value!.foil = foilInput.checked;
            });
            foilInput.checked = this._value.foil;
            foilInput.style.width = "auto";
            foilInput.style.margin = "2px";
            nameElement.appendChild(foilInput);
            
            //Delete Button
            const btnDelete = _("button", {type: "button"}, "X");
            btnDelete.addEventListener("click", ()=>this.delete() );
            
            //Select Options
            if(typeof this._value.sets === "undefined") {
                queryForCard(this._value.name).then((buffer)=>{
                    if(buffer !== null)
                        this.appendChild(this.populate(buffer.sets));
                    else
                        this.appendChild(this.populate(this._value!.sets));
                    this.appendChild(btnDelete);
                });
            } else {
                this.appendChild(this.populate(this._value.sets));
                this.appendChild(btnDelete);
            }

        } else {
            //Name Input
            const autoComplete = new AutoComplete(CardInput.getListFromShard, input);

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
    }
}

customElements.define("card-input", CardInput);

/** Set Card From String
     * 
     * Takes a single line and attempts to create a card from it.
     * Assums the Following Format.
     * 
     * ## Card Name [set] F
     * 
     * Where:        ## - is the number of card in the deck (optional)
     *        Card Name - name of the card
     *              set - is the set code in brackets (optional)
     *                F - the card is foil (optional)
     * 
     * Originally from: https://github.com/Malotkya/CapstoneProject/blob/main/backend/deckList.js
     * 
     * @param {string} string
     */
async function createCardFromString(string:string):Promise<Card>{
    //get count from string
    let buffer = string.match(/^\d*[Xx]?/gm)![0];
    string = string.substring(buffer.length);

    //Remove possible x from count
    if(buffer.toUpperCase().indexOf("X") > -1){
        buffer = buffer.substring(0, buffer.length-1);
    }

    //Set count
    let count:number = Number(buffer);
    if(isNaN(count) || buffer === "")
        count = 1;

    //Get possible set;
    
    let set = "";
    let setTest =string.indexOf("[");
    if( setTest > -1){
        set = string.substring(setTest)
        string = string.substring(0, setTest);
    }

    //Additonal Information from the set.
    let foil = false;
    let number:string = "";
    if(set.length > 0){

        // Get if foil
        let foilTest = set.toUpperCase().lastIndexOf("F");
        if(foilTest >= 4){
            foil = true;
            set = set.substring(0, foilTest).trim();
        }

        //Remove brackets from setname
        set = set.substring(1, set.length-1);

        //Get possible collector number
        let collector = set.indexOf(":");
        if(collector > -1){
            number = set.substring(collector+1);
            set = set.substring(0, collector);
        }
    }

    // Get cardname from string
    let cardName = string.trim();

    //Get and Add info already aquired.
    let result = await queryForCard(cardName)
    let card:Card;
    if(result === null){
        //@ts-ignore
        card = {
            name: cardName,
            count: count,
            foil: foil,
            collector_number: number,
            set: set
        };

        console.warn("'" + cardName + "' not found!");

    } else {
        //@ts-ignore
        card = {
            ...result,
            count: count,
            set: set,
            foil: foil,
            collector_number: number
        }

        //Get possible missing information.
        if(card.sets) {
            if(card.set.length === 0){
                const buffer = Object.keys(card.sets)
                const newSet = buffer[buffer.length-1].split(":");
                card.set = newSet[0];
                card.collector_number = newSet[1];
         
            } else if(card.collector_number.length === 0){
                for(let set in card.sets){
                    const buffer = set.split(":")
                    if(buffer[0] === card.set){
                        card.collector_number = buffer[1];
                        break;
                    }
                }
            }
    
            //Get image from sets and delete sets.
            card.image = card.sets[card.set + ":" + card.collector_number];
                    
        }
    }

    
    

    return card;
}