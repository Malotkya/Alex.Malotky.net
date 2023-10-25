import CategoryElement from "./CategoryElement";
import DeckListDialog from "./DeckListDialog";
import CardElement, {Card} from "./CardElemet";

export interface Deck {
    commanders: Array<Card>,
    main_deck: any,
    color_identity: Array<string>,
    art: string
}

const DEFAULT_SECTION = "main_deck";

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
function getTypeFromLine(typeLine:string):string{
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

export default class DeckEditor extends HTMLElement {
    private _dialog: DeckListDialog;
    private _categories:Map<string, CategoryElement>;
    private _input: CategoryElement;

    constructor(){
        super();
        this._categories = new Map();
        this._dialog = new DeckListDialog();
        this._dialog.promptEvent(()=>this.propagete());

        this._input = new CategoryElement();
    }

    static get observedAttributes(){
        return ["value"];
    }

    public attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "value"){
            this.value = newValue;
        }
    }

    set value(value:string){
        this._dialog.value = value;
    }

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
                        this._categories.get(section).add(line);
                    }
                }
            }
        };

        for(let element of others){
            const section = getTypeFromLine(element.card.typeLine);

            if(!this._categories.has(section))
                this._categories.set(section, new CategoryElement(section));

            this._categories.get(section).add(element);
        }
    }

    public getDeckObject():Deck {
        const output:Deck = {
            commanders: [],
            main_deck:{},
            color_identity: [],
            art: ""
        }

        //Add all categories
        for(let [name, element] of this._categories){
            if(name === CARD_TYPE_PRIORITY[0]){
                output.commanders = element.value;
            } else {
                output.main_deck[name] = element.value;
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

        //Get art from commander
        if(output.commanders.length > 0){
            if(output.commanders[0].art)
                output.art = output.commanders[0].art;
        }

        return output;
    }

    public connectedCallback(){
        this.appendChild(this._dialog);
        const btnShowDialog = document.createElement("button");
        btnShowDialog.addEventListener("click", ()=>this._dialog.show());
        btnShowDialog.textContent = "Deck List";
        this.parentElement.insertBefore(btnShowDialog, this);

        this.propagete();
        const order: Array<string> = Array.from(this._categories.keys()).sort((lhs:string, rhs:string):number=>{
            if(lhs === CARD_TYPE_PRIORITY[0]) {
                return -1;
            } else if(lhs === CARD_TYPE_PRIORITY[0]){
                return 1;
            } else {
                return lhs.localeCompare(rhs);
            }
        });

        for(let cat of order){
            this.appendChild(this._categories.get(cat));
        }

        this.appendChild(this._input);
    }
}

customElements.define("deck-editor", DeckEditor);