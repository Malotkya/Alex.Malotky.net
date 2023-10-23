import {createDeckFromString} from "/scryfall.js";
import {Database} from "/firebase.js";

export default function Edit(){
    document.querySelector("form").addEventListener("submit", performEdit);
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

        const name = document.querySelector("#name").value;
        const description = document.querySelector("#description").value;
        const deckList = document.querySelector("#deckList").value;

        createDeckFromString(deckList).then(deck=>{

            deck.name = name;
            deck.description = description;
                
            const identity = new Set();
            deck.commanders.forEach(card=>{
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

            deck.color_identity = [...identity];
            if(deck.commanders.length > 0){
                if(deck.commanders[0].art)
                    deck.art = deck.commanders[0].art;
            }
            

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