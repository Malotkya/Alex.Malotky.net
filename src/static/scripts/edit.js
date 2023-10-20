import {createDeckFromString} from "./scryfall.js";
import {Database} from "/firebase.js";

export default function Edit(){
    document.querySelector("form").addEventListener("submit", performEdit);
}

function performEdit(event){
    event.preventDefault();

    try {
        const id = document.querySelector("#submit").getAttribute("target").trim();

        if(typeof id === "undefined" || id.length === 0){
            throw new Error("Unable to find id or invalid id!");
        }

        const name = document.querySelector("#name").value;
        const description = document.querySelector("#description").textContent;
        const deckList = document.querySelector("#deckList").value;

        createDeckFromString(deckList).then(deck=>{

            deck.name = name;
            deck.description = description;
                
            const identity = new Set();
            deck.commanders.forEach(card=>{
                const buffer = JSON.stringify(card);

                //White
                if(buffer.match("{W}"))
                    identity.add("W");

                //Blue
                if(buffer.match("{U}"))
                    identity.add("U");

                //Black
                if(buffer.match("{B}"))
                    identity.add("B");

                //Red
                if(buffer.match("{R}"))
                    identity.add("R");

                //Green
                if(buffer.match("{G}"))
                    identity.add("G");
            });

            deck.color_identity = [...identity].join();

            //Submit here instead becasue can't use routing option.
            Database.updateDocument("MtgDecks", id, deck).then(()=>{
                alert("Success");
            }).catch(e=>{
                throw e;
            });
        }).catch(e=>{
            throw e;
        });

    } catch (e){
        console.error(e);
        alert("There was a problem saving the deck!");
    }

    return false;
}