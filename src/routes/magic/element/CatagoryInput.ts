/** /routes/magic/element/CaregoryInput
 * 
 * @author Alex Malotky
 */
import CategoryElement from "./Category";
import NewCategoryElement from "./NewCategory";
import DeckListDialog from "./DeckListDialog";
import CardElement from "./CardInput";
import Card from "../data/card";
import Deck from "../data/deck";
import { createElement as _ } from "@/util/Element";


// Default Section Name
const DEFAULT_SECTION = "main_deck";

//Priority of Card Types and Categories
const CARD_TYPE_PRIORITY = [
    "Commanders",
    "Creature",
    "Enchantment",
    "Artifact", 
    "Planeswalker",
    "Instant",
    "Sorcery",
    "Land",
    "Battle",
    "Tribal",
    "Unknown"
];

//Possible Commander Sections Names
const POSSIBLE_COMMANDERS = [
    "COMMANDER",
    "COMMANDERS"
];

/** Get Card Type from Type Line
 * 
 * Determins the card type catagory from the card type line.
 * 
 * Originally from: https://github.com/Malotkya/CapstoneProject/blob/main/backend/deckList.js
 *
 * @param {String} typeLine
 * @return {String} Card Type
 */
function getTypeFromLine(typeLine:string|undefined|null):string{
    if(typeof typeLine === "string"){
        for(let i=0; i<CARD_TYPE_PRIORITY.length; i++){
            if(typeLine.indexOf(CARD_TYPE_PRIORITY[i]) >= 0) {
                return CARD_TYPE_PRIORITY[i];
            }
        }
    }
    
    return "Unknown";
}


/** Is Commander Card
 * 
 * Determins if the section of a card is commander or not based on a possible
 * spellings of the commander catagory.
 * 
 * Originally from: https://github.com/Malotkya/CapstoneProject/blob/main/backend/deckList.js
 *
 * @param {string} category
 * @returns {boolean}
 */
export function isCommanderCategory(category:string):boolean{
    category = category.toUpperCase();

    for(let test of POSSIBLE_COMMANDERS){
        if(category === test) {
            return true;
        }
    }

    return false;
}

/** Card To String
 * 
 * Converts card object to readable string that can be easily converted back.
 * 
 * Originally from: https://github.com/Malotkya/CapstoneProject/blob/main/backend/deckList.js
 *
 * @param {Card} card
 * @returns {string}
 */
function cardToString(card:Card):string {
    let output = card.count + " " + card.name;

    if(typeof card.set !== "undefined" && card.set !== ""){
        output += " [" + card.set;

        if(typeof card.collector_number !== "undefined")
            output += ":" + card.collector_number;

        output += "]";
    }

    if(typeof card.foil !== "undefined" && card.foil){
        output += " F";
    }

    return output;
};

/** Deck Editor Element
 * 
 */
export default class CatagoryInput extends HTMLElement {
    private _dialog: DeckListDialog;
    private _categories:Map<string, CategoryElement>;
    private _input: NewCategoryElement;
    private _values: Dictionary<HTMLInputElement>;

    /** Constructor
     * 
     */
    constructor(commanders: Array<Card> = [], mainDeck:Dictionary<Array<Card>> = {}){
        super();
        this._categories = new Map();
        this._dialog = new DeckListDialog();
        this._dialog.promptEvent(()=>{      
            this._categories.clear();
            this.connectedCallback(false);
        });

        this._input = new NewCategoryElement();

        let temp:string = "//Commander\n" + commanders.map(cardToString).join("\n");
        for(let cat in mainDeck){
            temp += "\n\n//" + cat + "\n" + mainDeck[cat].map(cardToString).join("\n");
        }

        this.value = temp;

        this._values = {
            commanders: _("input", {type: "hidden", name: "commanders"}) as HTMLInputElement,
            main_deck: _("input", {type: "hidden", name: "main_deck"}) as HTMLInputElement,
            color_identity: _("input", {type: "hidden", name: "color_identity"}) as HTMLInputElement,
            art: _("input", {type: "hidden", name: "art"}) as HTMLInputElement
        };

        this.addEventListener("input", event=>{
            event.stopPropagation();
            this.update();
        })
    }

    /** Observed Attributes Getter
     * 
     */
    static get observedAttributes(){
        return ["value"];
    }

    /** Attribute Changed Callback
     * 
     * @param {string} name 
     * @param {string} oldValue 
     * @param {string} newValue 
     */
    public attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "value"){
            this.value = newValue;
        }
    }

    /** Value Setter
     * 
     */
    set value(value:string){
        this._dialog.value = value;
    }

    /** Value Getter
     * 
     */
    get value():string{
        return this._dialog.value;
    }

    /** Propigate Text Data
     * 
     * Attempts to read in Text Data.
     * 
     * Originally from: https://github.com/Malotkya/CapstoneProject/blob/main/backend/deckList.js
     */
    private propagete(){
        const lines:Array<string> = this.value.split("\n");
        const others:Array<CardElement> = [];

        if(lines.length === 0)
            return;

        let section:string = DEFAULT_SECTION;
        for( let line of lines){
            line = line.trim();
        
            if(line.length > 0){ //Skip empty lines
        
                let sectionTest = line.match(/^\/\//gm);
                if(sectionTest !== null) {
                    section = line.substring(2)
                    if(isCommanderCategory(section))
                        section = CARD_TYPE_PRIORITY[0];

                    //Create Section if it doesn't already exist
                    if(!this._categories.has(section))
                        this._categories.set(section, new CategoryElement(section));
                } else {
                    if(section === DEFAULT_SECTION){
                        others.push(new CardElement(line));
                    } else {
                        this._categories.get(section)!.add(line);
                    }
                }
            }
        };

        for(let element of others){
            const section = getTypeFromLine(element.card!.typeLine);

            if(!this._categories.has(section))
                this._categories.set(section, new CategoryElement(section));

            this._categories.get(section)!.add(element);
        }
    }

    /** Update Hidden Values for Submit
     * 
     */
    private async update(){
        const {commanders, main_deck, color_identity, art} = await this.getDeckObject();
        
        this._values["commanders"].value = JSON.stringify(commanders);
        this._values["main_deck"].value = JSON.stringify(main_deck);
        this._values["color_identity"].value = JSON.stringify(color_identity);
        this._values["art"].value = art;

        this.appendChild(this._input);
    }

    /** Get Deck Object
     * 
     * @returns {Deck}
     */
    public async getDeckObject():Promise<Deck> {
        const output:Deck = {
            commanders: [],
            main_deck: {},
            color_identity: [],
            art: ""
        }

        //Add all categories
        for(let list of Array.from(this.querySelectorAll("section"))){
            if(list instanceof CategoryElement){
                const name = list.id;
                if(name === CARD_TYPE_PRIORITY[0]) {
                    output.commanders = await list.value();
                } else if(name !== ""){
                    output.main_deck[name] = await list.value();
                }

            }
        }

        //Get color identity
        const identity:Set<string> = new Set();
        output.commanders.forEach(card=>{
            const buffer = JSON.stringify(card);

            //White
            if(buffer.match(/{.{0,4}W{1}.{0,4}}/g))
                identity.add("white");

            //Blue
            if(buffer.match(/{.{0,4}U{1}.{0,4}}/g))
                identity.add("blue");

            //Black
            if(buffer.match(/{.{0,4}B{1}.{0,4}}/g))
                identity.add("black");

            //Red
            if(buffer.match(/{.{0,4}R{1}.{0,4}}/g))
                identity.add("red");

            //Green
            if(buffer.match(/{.{0,4}G{1}.{0,4}}/g))
                identity.add("green");
        });
        output.color_identity = [...identity];

        //Get art from top commander
        if(output.commanders.length > 0){
            if(output.commanders[0].art)
                output.art = output.commanders[0].art;
        }

        return output;
    }

    private async getDeckList():Promise<string>{
        //const cardToString = (card:Card):string =>`${card.count} ${card.name} [${card.set}:${card.collector_number}] ${card.foil?"F":""}`;

        const deck = await this.getDeckObject();
        let output:string = "//Commanders\n" + deck.commanders.map(cardToString).join("\n");

        for(let cat in deck.main_deck){
            output += `\n\n//${cat}\n` + deck.main_deck[cat].map(cardToString).join("\n");
        }

        return output;
    }

    /** Connected Callback
     * 
     */
    public connectedCallback(init:boolean = true){
        this.innerHTML = "";
        for(let name in this._values) {
            this.appendChild(this._values[name]);
        }

        this.appendChild(this._dialog);
        if(init){
            const btnShowDialog = _("button", {type: "button"});
            btnShowDialog.addEventListener("click", async()=>{
                this.value = await this.getDeckList();
                this._dialog.show();
            });
            btnShowDialog.textContent = "Edit Deck List";
            this.parentElement?.insertBefore(btnShowDialog, this);
        }

        this.propagete();
        const order: Array<string> = Array.from(this._categories.keys()).sort((lhs:string, rhs:string):number=>{
            if(lhs === CARD_TYPE_PRIORITY[0]) {
                return -1;
            } else if(rhs === CARD_TYPE_PRIORITY[0]){
                return 1;
            } else {
                return lhs.localeCompare(rhs);
            }
        });

        for(let cat of order){
            this.appendChild(this._categories.get(cat)!);
        }

        this.update();
    }
}

customElements.define("catagory-input", CatagoryInput);