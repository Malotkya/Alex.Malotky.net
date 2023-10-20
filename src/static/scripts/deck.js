import {Masonry} from "../masonry.js"

export default function Deck(){

    //Masonry Magic
    new Masonry('#masonry-layout', {
        itemSelector: '.category',
        columnWidth: '.category',
        percentPosition: true
    }).layout();

    //Needed for apple devices
    document.querySelectorAll(".card").forEach(card=>{
        card.addEventListener("click", event=>{
            card.focus();
        });
    });
}