/** /Routes/Magic/Types
 * 
 * Types needed to interface with Scryfall and/or the database
 * 
 * @author Alex Malotky
 */
import { ScryfallData } from "@/util/Scryfall";

/************************************************************************/
/** Proto Deck Database Item
 * 
 */
export interface ProtoDeck {
    id?: number,
    name: string,
    description: string,
    commanders: string,
    main_deck: string,
    color_identity: string,
    art: string
}

/** Validate Input
 * 
 * @param {ProtoDeck} input 
 */
export function validateInput(input:ProtoDeck):DeckItem{
    const deck = {
        ...input,
        commanders: JSON.parse(input.commanders),
        main_deck: JSON.parse(input.main_deck),
        color_identity: JSON.parse(input.color_identity)
    };

    validateDeck(deck);

    return deck;
}

/** Convert Proto Deck
 * 
 * @param {ProtoDeck} data 
 * @returns  {DeckItem}
 */
export function convertProtoDeck(data:ProtoDeck):DeckItem {
    return {
        id: data.id || -1,
        name: data.name || "",
        description: data.description || "",
        commanders: data.commanders? JSON.parse(data.commanders): [],
        main_deck: data.main_deck? JSON.parse(data.main_deck): {},
        color_identity: data.color_identity? JSON.parse(data.color_identity): [],
        art: data.art || ""
    }
}

/************************************************************************/
/** Deck Database Item
 * 
 */
export interface DeckItem extends Deck {
    id?: number,
    name: string,
    description: string
}

/** Base Deck Item
 * 
 */
export interface Deck {
    commanders: Category,
    main_deck: Dictionary<Category>,
    color_identity: Array<string>,
    art: string
}

/** Validate Deck Item
 * 
 * @param {DeckItem} deck 
 */
export function validateDeck(deck:DeckItem):void {
    try {
        validateCategory(deck.commanders);
    } catch (e:any){
        throw new TypeError(`Category 'commanders' is invalid!\n${e.message || String(e)}`);
    }

    if(typeof deck.main_deck !== "object")
        throw new TypeError("Main deck must be a map of Categories!");

    for(let name in deck.main_deck){
        try {
            validateCategory(deck.main_deck[name])
        } catch (e:any){
            throw new TypeError(`Category '${name}' is invalid!\n${e.message || String(e)}`)
        }
    }

    if(!Array.isArray(deck.color_identity))
        throw new TypeError("Color Identity must be a list!");

    for(let i=0; i<deck.color_identity.length; i++){
        if(typeof deck.color_identity[i] !== "string")
            throw new TypeError(`Color Identity data at ${i} must be a string!`)
    }

    if(typeof deck.art !== "string")
        throw new TypeError("Art must be a string!");

    if(typeof deck.name !== "string")
        throw new TypeError("Name must be a string!");

    if(typeof deck.description !== "string")
        throw new TypeError("Description must be a string!");
}

/************************************************************************/
/** Magic the Gathering Category
 * 
 */
export type Category = Array<Card>;

/** Validate Category
 * 
 * @param {Category} data 
 */
export function validateCategory(data:Category):void {
    if(!Array.isArray(data))
        throw new TypeError("Category must be a list!");
    

    for(let i=0; i<data.length; i++){
        try {
            validateCard(data[i]);
        } catch (e:any){
            throw new TypeError(`Card at ${i} is invalid!\n${e.message || String(e)}`)
        }
    }
}

/************************************************************************/
/** Magic the Gathering Card
 * 
 */
export interface Card extends ScryfallData {
    count: number,
    name: string,
    set: string,
    collector_number: string,
    foil: boolean,
    image?:ImageData
}

export function validateCard(card:Card):void {

    if(typeof card.count !== "number") 
        throw new TypeError("Count must be a number!");
    

    if(typeof card.name !== "string")
        throw new TypeError("Name must be a string!");

    if(typeof card.set !== "string")
        throw new TypeError("Set must be a string!");

    if(typeof card.collector_number !== "string")
        throw new TypeError("Collector number must be a string!");

    if(typeof card.foil !== "boolean")
        throw new TypeError("Foil must be a boolean!");

    if(typeof card.image !== "undefined")
        validateImageData(card.image);
    
    if(typeof card.sets !== "undefined")
        validateSet(card.sets);

    switch(typeof card.art){
        case "string":
        case "undefined":
            break;

        default:
            throw new TypeError("Art must be a string!");
    }

    switch(typeof card.manaValue){
        case "number":
        case "undefined":
            break;

        default:
            throw new TypeError("Mana value must be a number!");
    }

    switch(typeof card.manaCost){
        case "string":
        case "undefined":
            break;

        default:
            throw new TypeError("Mana cost must be a string!");
    }

    switch(typeof card.typeLine){
        case "string":
        case "undefined":
            break;

        default:
            throw new TypeError("Type line must be a string!");
    }

    switch(typeof card.oracle){
        case "string":
        case "undefined":
            break;

        default:
            throw new TypeError("Oracle text must be a string!");
    }
}


/************************************************************************/
/** Magic the Gathering Set
 * 
 * Map<set, ImageData>
 */
export type MagicSet = Dictionary<ImageData>

/** Validate Set
 * 
 * @param {MagicSet} data 
 */
export function validateSet(data:MagicSet):void {
    if(typeof data !== "object")
        throw new TypeError("Magic set must be a map of ImageData");

    for(let name in data){
        try {
            validateImageData(data[name])
        } catch (e:any){
            throw new TypeError(`Magic set '${name}' is invalid:\n${e.message || String(e)}'`)
        }
    }
}


/************************************************************************/
/** Image Data
 * 
 * Used by cards in Scryfall/Database
 */
export type ImageData = Array<string>;

/** Validate Image Data
 * 
 * @param {ImageData} data 
 */
export function validateImageData(data:ImageData):void {
    if(!Array.isArray(data))
        throw new TypeError("Image data must be an array!");

    for(let i=0; i<data.length; i++){
        if(typeof data[i] !== "string")
            throw new TypeError(`Image data at ${i} must be a string!`)
    }
}