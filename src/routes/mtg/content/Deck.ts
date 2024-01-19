
/** /routes/mtg/content/Deck.ts
 * 
 * @author Alex Malotky
 */
import {createElement as _, Content} from "../../../util/Elements";
import DeckViewElement, {CardElement} from "./elements/DeckView";
import DeckEditorElement, {Deck} from "./elements/DeckEditor";

//Extra deck information in database.
export interface DeckItem extends Deck {
    id: string,
    name: string,
    description: string
};

/** Deck View Module
 * 
 * @param {DeckItem} deck 
 * @returns {Content}
 */
export function DeckView(deck:DeckItem): Content{
    return [
        _("aside", {id:"deckHeader"},
            _("h1", deck.name),
            _("p", deck.description)
        ),
        _("a", {class: "btn", href: "/Decks"}, "Back"),
        _("article", {id: "deck-view"}, 
            _("section", {id:"commanders", class: "category"},
                _("h2", deck.commanders.length > 2? "Commanders:": "Commander:"),
                _("ul", deck.commanders.map(c=> CardElement(c)))
            ),
            new DeckViewElement(deck.main_deck)
        )
    ]
}

/** Deck Edit Module
 * 
 * @param {DeckItem} deck 
 * @returns {Content}
 */
export function DeckEdit(deck:DeckItem): Content{
    return _("article", {id:"deckEditor"},
        _("a", {href: "/Decks/Editor", class:"btn"}, "Back"),
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