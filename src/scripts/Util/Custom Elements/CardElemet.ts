import { queryForCard } from "../../scryfall";

/** Card Interface
 * 
 * Information of a card and optional information from
 * scryfall.
 */
export interface Card {
    count: number,
    name: string,
    set: string,
    collector_number: string,
    foil: boolean,
    image?: Array<string>,

    //Possible Data from Scryfall
    sets?: any,
    art?: string,
    manaCost?: string,
    manaValue?: string,
    typeLine?:string,
    oracle?: string
}

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
export default class CardElement extends HTMLLIElement {
    private _value:Card

    /** Constructor
     * 
     * @param {Card|string} card 
     */
    constructor(card?:Card|string){
        super();
        this.className = "card-input"
        this.card = card;
    }

    /** Value Setter
     * 
     */
    set card(card:Card|string){
        if(typeof card === "string") {
            this._value = BLANK_CARD;
            this.set(card);
        } else if(typeof card !== "undefined"){
            this._value = card;
        }
    }

    /** Value Getter
     * 
     */
    get card():Card{
        return this._value;
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
        select.value = JSON.stringify(this._value.image);

        select.addEventListener("change", event=>{
            this._value.image = JSON.parse(select.value);
        });

        return select;
    }

    /** Removes the card from the list.
     * 
     */
    private delete(){
        if(window.confirm(`Are you sure you want to remove ${this._value.name}?`)){
            this.parentElement.removeChild(this);
        }
    }

    /** Adds card to the list.
     * 
     * @param cardName 
     */
    private find(cardName:string){
        queryForCard(cardName).then((card:Card)=>{
            this.parentElement.insertBefore(new CardElement(card), this);
        });
    }

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
    private set(string:string){
        //get count from string
        let buffer = string.match(/^\d*[Xx]?/gm)[0];
        string = string.substring(buffer.length);

        //Remove possible x from count
        if(buffer.toUpperCase().indexOf("X") > -1){
            buffer = buffer.substring(0, buffer.length-1);
        }

        //Set count
        let count:number = Number(buffer);
        if(isNaN(count))
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
        queryForCard(cardName).then( (card:Card)=>{
            if(card === null){
                card = {
                    name: cardName,
                    count: count,
                    foil: foil,
                    collector_number: number,
                    set: set
                };
                console.warn("'" + cardName + "' not found!");
            } else {
                card.count = count;
                card.set = set;
                card.foil = foil;
                card.collector_number = number;
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
    
            this._value = card;
        });
    }

    /** Connected Callback
     * 
     * If there is no value, then it creates an input.
     */
    public async connectedCallback(){
        const nameElement = document.createElement("span");
        this.appendChild(nameElement)

        while(this._value === BLANK_CARD)
            await sleep();

        if(this._value){
            nameElement.textContent = this._value.name;
            const btnDelete = document.createElement("button");
            btnDelete.textContent = "X";
            btnDelete.addEventListener("click", ()=>this.delete() );
            
            //Select Options
            if(typeof this._value.sets === "undefined") {
                queryForCard(this._value.name).then( (buffer:Card)=>{
                    if(buffer !== null)
                        this.appendChild(this.populate(buffer.sets));
                    else
                        this.appendChild(this.populate(this._value.sets));
                    this.appendChild(btnDelete);
                });
            } else {
                this.appendChild(this.populate(this._value.sets));
                this.appendChild(btnDelete);
            }

        } else {
            const input = document.createElement("input");
            nameElement.appendChild(input);

            const btnFind = document.createElement("button");
            btnFind.textContent = "+";

            btnFind.addEventListener("click", ()=>{
                this.find(input.value);
                input.value = "";
            });

            this.appendChild(btnFind);
        }
    }
}

function sleep(timeout:number = 5){
    return new Promise((res,rej)=>{
        window.setTimeout(res, timeout);
    })
}

customElements.define("card-list-element", CardElement, { extends: "li" });