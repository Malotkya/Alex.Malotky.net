/** /routes/magic/element/CardInput
 * 
 * @author Alex Malotky
 */
import { queryForCard, getShard, ScryfallCard } from "@/util/Scryfall";
import { createElement as _ } from "@/util/Element";

import { sleep } from "@/util";
import Card from "../data/card";

type StoredCard = Card&{
    sets?:Record<string, string[]>
    arts?:Record<string, string>
}

type RetreivedCard = ScryfallCard&{
    count:number,
    foil:boolean,
    collector_number:string,
    set:string,
    image:string[]
};

//@ts-ignore
const BLANK_CARD:StoredCard = {}

/** CardElement Class
 * 
 * Html Representation of the Card Interface.
 * 
 */
export default class CardInput extends HTMLElement {
    private _value:StoredCard;
    private _ready:boolean|undefined;

    /** Constructor
     * 
     * @param {Card|string} card 
     */
    constructor(card:Card|string){
        super();
        if(typeof card === "string") {
            this._value = BLANK_CARD;
            createCardFromString(card).then(card=>{
                this._value = card;
            }).catch(e =>{
                console.error(e);
            });
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
                image: this._value.image,
                art: this._value.art,
                identity: this._value.identity,
                typeLine: this._value.typeLine || "Error",
                oracle: this._value.oracle || "Not Found",
                manaValue: this._value.manaValue || 0,
                manaCost: this._value.manaCost || "",
            };
        } else {
            return null;
        }
    }

    async value():Promise<Card|null> {
        while(!this.ready) {
            await sleep();
        }
        
        return this.card;
    }

    get ready():boolean {
        if(this.isConnected){
            return this._ready!;
        }

        return this.card !== BLANK_CARD
    }

    /** Create and Populate Select.
     * 
     * @param sets 
     * @returns 
     */
    private populate(sets:Record<string,string[]>, art:Record<string,string>): HTMLSelectElement{
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
            option.value = name;

            select.appendChild(option);
        }

        select.addEventListener("input", event=>{
            this._value.image = sets[select.value];
            this._value.art = art[select.value];
            const [set, number] = select.value.split(":");
            this._value.set = set;
            this._value.collector_number = number;
        });

        const value = `${this._value.set}:${this._value.collector_number}`;
        select.value = value;
        this._value.image = sets[value];
        this._value.art = art[value];

        return select;
    }

    /** Removes the card from the list.
     * 
     */
    private delete(){
        if(window.confirm(`Are you sure you want to remove ${this._value.name}?`)){
            const parrent = this.parentElement!;
            parrent.removeChild(this);
            parrent.dispatchEvent(new CustomEvent("input", {bubbles: true}));
        }
    }

    /** Connected Callback
     * 
     * If there is no value, then it creates an input.
     */
    public connectedCallback(){
        this.innerHTML = "";
        this._ready = false;

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
            input.addEventListener("input", ()=>{
                let number:number = Number(input.value);
                if(isNaN(number)){
                    number = 0;
                    input.value = "0";
                }

                this._value.count = number;
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
                this._value.foil = foilInput.checked;
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
                        this.appendChild(this.populate(buffer.sets, buffer.art));
                    else
                        throw new Error("Unable to find card set information!");
                    this.appendChild(btnDelete);
                    this._ready = true;
                });
            } else {
                this.appendChild(this.populate(this._value.sets!, this._value.arts!));
                this.appendChild(btnDelete);
                this._ready = true;
            }
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
export async function createCardFromString(string:string):Promise<StoredCard>{
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
    let card:RetreivedCard;
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
    const arts = card.art;
            
    return {
        ...card, arts,
        art: arts[card.set],
        image: card.sets[card.set]
    };
}