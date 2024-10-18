import { createContent as _ } from "Engine";
import { DeckItem } from "../types";
import CardView from "./card";

export default function DeckView(deck:DeckItem) {
    const main_deck = [];
    for(const name in deck.main_deck){
        const cat = deck.main_deck[name];
        main_deck.push(_("section", {class: "category"},
            _("h2", name),
            _("ul", cat.map(c=>CardView(c)))
        ))
    }

    return [
        _("aside", {id:"deckHeader"},
            _("h1", deck.name),
            _("p", deck.description)
        ),
        _("a", {class: "btn", href: "/Decks"}, "Back"),
        _("section", {id:"commanders", class: "category"},
            _("h2", deck.commanders.length > 2? "Commanders:": "Commander:"),
            _("ul", deck.commanders.map(c=> CardView(c)))
        ),
        _("div", {class: "catagory-list grid", dataMasonry:'{ "itemSelector": ".category", "columnWidth": ".category" }'},
            main_deck
        )
    ]
}