
/** /routes/mtg/content/Deck.ts
 * 
 * @author Alex Malotky
 */
import {createContent as _, Content} from "Engine";
import { DeckItem } from "./types";

//Extra deck information in database.


/** Deck View Module
 * 
 * @param {DeckItem} deck 
 * @returns {Content}
 */
export function DeckView(deck:DeckItem): Content{
    const data = Buffer.from(
        JSON.stringify({
            commanders: deck.commanders,
            main_deck: deck.main_deck
        })
    ).toString("base64");

    return [
        _("aside", {id:"deckHeader"},
            _("h1", deck.name),
            _("p", deck.description)
        ),
        _("a", {class: "btn", href: "/Decks"}, "Back"),
        _("deck-view", {data})
    ]
}

/** Deck Edit Module
 * 
 * @param {DeckItem} deck 
 * @returns {Content}
 */
export function DeckEdit(deck:DeckItem): Content{
    const data = Buffer.from(
        JSON.stringify({
            commanders: deck.commanders,
            main_deck: deck.main_deck
        })
    ).toString("base64");

    return _("deck-input", {data});
}