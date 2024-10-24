
/** /routes/mtg/content/Deck.ts
 * 
 * @author Alex Malotky
 */
import {Buffer} from "node:buffer";
import {createContent as _, Content} from "Engine";
import { DeckItem } from "../types";
import Deck from "./deck";

/** Deck View Module
 * 
 * @param {DeckItem} deck 
 * @returns {Content}
 */
export function DeckView(deck:DeckItem): Content{
    return Deck(deck)
}

/** Deck Edit Module
 * 
 * @param {DeckItem} deck 
 * @returns {Content}
 */
export function DeckEdit(deck:DeckItem): Content{
    const data = Buffer.from(
        JSON.stringify(deck)
    ).toString("base64");

    return  _("form",
        {
            data,
            is: "deck-input",
            id: "deck-input",
            method: "POST"
        }
    );
}

export function DeckListView(list:Array<DeckItem>, edit:boolean = false):Content {
    //TODO: Add pagenation numbers.
    
    return [
        edit? _("cache-downloader"): undefined,
        _("h1", "Magic the Gathering Decks"),
        edit? _("a", {class: "btn", href: "/Decks/Edit/New"}, "Create New Deck"): null,
        _("ol", {id: "deck-list"},
            list.map(deck=>_("li",
                _("a", {href: edit? `/Decks/Edit/${deck.id}`: `/Decks/${deck.id}`},
                    _("figure", {class: "deck-art"},
                        _("img", {src: deck.art || "/missing.jpg", alt: `${deck.name} Deck Art`})
                    ),
                    _("h2", deck.name),
                    edit? _("p",
                        _(  "a",
                            {
                                href: "./Delete",
                                class: "btn",
                                onClick: `confirm('Are you sure?')`
                            },
                            "Delete"
                        )
                    ): null,
                    _("p", {class: "color_identity"},
                        deck.color_identity.length === 0
                            ? _("span", {
                                class: "mana-symbol colorless",
                                role: "img",
                                ariaLabel: "colorless mana symbol"
                            })
                            :deck.color_identity.map(color=>_("span",
                                {
                                    class: "mana-symbol "+color,
                                    role: "img",
                                    ariaLabel: color+" mana symbol"
                                }
                            ))
                    )
                )
            ))
        )
    ]
}