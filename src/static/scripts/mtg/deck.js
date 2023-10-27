import * as Scryfall from "/scryfall.js"

export default function Deck(){
    //Needed for apple devices
    document.querySelectorAll(".card").forEach(card=>{
        card.addEventListener("click", event=>{
            card.focus();
        });
    });
}