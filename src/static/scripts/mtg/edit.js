import * as Scryfall from "/scryfall.js";

const REMOVE_FROM_CARDS = [
    "manaCost",
    "art"
];

export default function Edit(){
    document.querySelector("#submit").addEventListener("click", performEdit);
    document.querySelector("#btnView").addEventListener("click", ()=>{
        localStorage.clear();
    });
}

function performEdit(event){
    event.preventDefault();

    try {
        const id = document.querySelector("#submit").getAttribute("target").trim();

        if(typeof id === "undefined" || id.length === 0){
            throw new Error("Unable to find id or invalid id!");
        }

        const deck = document.querySelector("#deckList").getDeckObject();
        deck.name = document.querySelector("#name").value;
        deck.description = document.querySelector("#description").value;

         //Remove bloat from deck
        for(let card of deck.commanders){
            for(let att of REMOVE_FROM_CARDS) {
                delete card[att]
            }
        }

        for(let cat in deck.main_deck){
            const list = deck.main_deck[cat];

            if(list.length === 0){
                delete deck.main_deck[cat];
            } else {
                for(let card of list){
                    for(let att of REMOVE_FROM_CARDS){
                        delete card[att];
                    }
                }
            }
        }
        window.route("/Decks/Editor/Update/" + id, {deck: JSON.stringify(deck)});

    } catch (e){
        console.error(e);
        alert("There was a problem saving the deck!");
    }

    return false;
}