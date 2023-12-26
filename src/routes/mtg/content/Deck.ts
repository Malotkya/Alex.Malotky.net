import {createElement as _} from "../../../util/Elements";
import DeckViewElement from "./elements/DeckView";
import DeckEditorElement, {Deck} from "./elements/DeckEditor";
import CardElement from "./elements/View/Card";

export interface DeckItem extends Deck {
    id: string,
    name: string,
    description: string
};

export function DeckView(deck:DeckItem){
    return [
        _("aside", {id:"deckHeader"},
            _("h1", deck.name),
            _("p", deck.description)
        ),
        _("a", {class: "btn", href: "/Decks"}, "Back"),
        _("article", {id: "deck-view"}, 
            _("section", {id:"commanders", class: "category"},
                _("h2", deck.commanders.length > 2? "Commanders:": "Commander:"),
                _("ul", deck.commanders.map(c=> new CardElement(c)))
            ),
            new DeckViewElement(deck.main_deck)
        )
    ]
}

export function DeckEdit(deck:DeckItem){
    return _("article", {id:"deckEditor"},
        _("a", {href: "/Deck/Editor", class:"btn"}, "Back"),
        _("a", {href: `/Decks/${deck.id}`, id: "btnView", class: "btn"}, "View"),
        _("button", {id:"submit"}, "Save Changes"),
        _("h1", "Deck Editor"),
        _("label", {for: "name"}, "Deck Name"),
        _("input", {id: "name", value: deck.name}),
        _("label", {for:"description"}),
        _("textarea", {id:"description"}, deck.description),
        _("label", {for: "deckList"}, "Deck List:"),
        new DeckEditorElement(deck.commanders, deck.main_deck)
    );
}