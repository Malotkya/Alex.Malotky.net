import * as Scryfall from "/scryfall.js";
import {Database} from "/firebase.js";

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
    disableAll();

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


        //Submit here instead becasue can't use routing option.
        Database.updateDocument("MtgDecks", id, deck).then(()=>{
            enableAll();
            alert("Success");
        }).catch(e=>{
            throw e;
        });

    } catch (e){
        console.error(e);
        alert("There was a problem saving the deck!");
    }

    return false;
}

function disableAll(){
    for(let node of Array.from(document.querySelector("#deckEditor").children)){
        node.disabled = true;
    }
}

function enableAll(){
    for(let node of Array.from(document.querySelector("#deckEditor").children)){
        if(!node.classList.contains('disabled'))
            node.disabled = false;
    }
}