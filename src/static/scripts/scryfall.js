const CARD_TYPE_PRIORITY = [
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

const DEFAULT_SECTION = "main_deck";

/** Get Card Type from Type Line
 * 
 * Determins the card type catagory from the card type line.
 * 
 * Originally from: https://github.com/Malotkya/CapstoneProject/blob/main/backend/deckList.js
 *
 * @param {String} typeLine
 * @return {String} Card Type
 */
function getTypeFromLine(typeLine){
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
 * @param {Object} card 
 * @returns {Boolean} if is commander
 */
export function isCommanderCard(card){
    if(typeof card.section === "undefined")
        return false;

    for(let i=0; i<POSSIBLE_COMMANDERS.length; i++){
        if(card.section.toUpperCase() === POSSIBLE_COMMANDERS[i]) {
            return true;
        }
    }

    return false;
}

/** Create Deck From String
 * 
 * @param {string} string 
 * @returns {Object} deck
 */
export async function createDeckFromString(string){
    const deck = {
        commanders: [],
        main_deck: {}
    };

    (await readTextData(string)).forEach(card=>{
        if(card.section === DEFAULT_SECTION){
            card.section = getTypeFromLine(card.typeLine);
        }

        if(isCommanderCard(card)) {
            deck.commanders.push(card);
        } else {
            if(typeof deck.main_deck[card.section] === "undefined")
            deck.main_deck[card.section] = [];

            deck.main_deck[card.section].push(card);
        }
        delete card.section;
    });

    return deck;
}

/** Read in Txt Data
 * 
 * Attempts to read in Text Data.
 * 
 * Originally from: https://github.com/Malotkya/CapstoneProject/blob/main/backend/deckList.js
 *
 * @param {String} string
 * @returns {Promise<Array>} Deck List
 */
async function readTextData(string){
    let lines = string.split("\n");
    let array = [];

    if(lines.length === 0){
        throw new Error("Zero lines found.");
    }

    let section = DEFAULT_SECTION;
    for( let line of lines){
        line = line.trim();

        if(line.length > 0){ //Skip empty lines

            let sectionTest = line.match(/^\s*\/\//gm);
            if(sectionTest !== null) {
                let index = line.indexOf("//");
                section = line.substring(index + 2).trim();

            } else {
                let card = await createCardFromString(line);
                card.section = section;
                array.push(card);
            }
        }
    };

    return array;
}


/** Create Card From String
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
 * @returns {Promise<Object>} Card
 */
export async function createCardFromString(string){
    //get count from string
    let buffer = string.match(/^\d*[Xx]?/gm);
    let count = buffer[0];

    //get set name and foil from string
    buffer = string.match(/(\[.*?\])?\s*[Ff]?$/gm);
    let set = buffer[0];
    let setLength = set.length;

    // Get if foil
    let foil = false;
    if(set){
        let foilTest = set.toUpperCase().lastIndexOf("F");
        if(foilTest >= 4){
            foil = true;
            set = set.substring(0, foilTest).trim();
        }
    }
 
    // Get cardname from string
    let cardName = "";
    if(count === ""){
        count = "1";
        cardName = string;
    } else {
        cardName = string.substring(count.length);
    }

    //Get possible collector number
    let number = undefined;
    if(setLength !== 0) {

        //Remove set information from cardName
        let newLength = cardName.length - setLength;
        cardName = cardName.substring(0, newLength);

        //Remove brackets from setname
        set = set.substring(1, set.length-1);

        
        let collector = set.indexOf(":");
        if(collector > -1){

            number = set.substring(collector+1);
            set = set.substring(0, collector);
        }
    }

    //Remove possible x from count
    if(count.toUpperCase().indexOf("X") > -1){
        count = count.substring(0, count.length-1);
    }

    //Get and Add info already aquired.
    let card = await queryForCard(cardName.trim());
    if(card === null){
        card = {name: cardName.trim()};
        console.warn("'" + cardName.trim() + "' not found!");
    }

    card.count = Number(count);
    card.set = set.trim();
    card.foil = foil;
    if(number)
        card.collector_number = number;

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
        delete card.sets;
    }

    return card;
}

/** Query For Card
 * 
 * @param {string} name 
 * @returns {Promise<Object>} card
 */
export async function queryForCard(name){
    let shardName = "?";

    const match = name.match(/[a-zA-Z0-9_]/);
    if(match)
        shardName = match[0];

    const shard = await getShard(shardName);

    if(shard === null)
        return null;

    const index = name.indexOf("[");
    if(index > -1){
        name = name.substring(0, index);
    }

    const lines = shard.split("\n");
    const names = shard.match(/(?<="name":").*?(?=")/gm);

    for(let i=0; i<names.length; i++){
        if(compareNames(names[i], name) === 0){
            return JSON.parse(lines[i].trim());
        }
    }

    return null;
}

/** Compare Names
 * 
 * Ignores everything that isnt a number or letter
 * and ignores case.
 * 
 * @param {string} lhs 
 * @param {string} rhs 
 * @returns {number}
 */
function compareNames(lhs, rhs){
    lhs = lhs.replace(/[^a-zA-Z0-9]/gm, "").toLowerCase();
    rhs = rhs.replace(/[^a-zA-Z0-9]/gm, "").toLowerCase();

    return lhs.localeCompare(rhs);
}

/** Get Shard
 * 
 * @param {string} shard 
 * @returns {string}
 */
async function getShard(shard){
    const response = await fetch("/cards/"+shard);

    if(response.status !== 200)
        throw new Error("Unable to load file: " + response.statusText);

    const fileText = await response.text();

    if(fileText.match("<!DOCTYPE html>"))
        return null;

    return fileText;
}