/** /routes/magic/view
 * 
 * @author Alex Malotky
 */
import {Buffer} from "node:buffer";
import {createElement as _, Content} from "zim-engine";
import { DeckItem } from "../data/deck";

import DeckView from "./deck";
export {DeckView};

/** Deck Edit Module
 * 
 * @param {DeckItem} deck 
 * @returns {Content}
 */
export function DeckEdit(deck?:DeckItem): Content{
    const data = Buffer.from(
        JSON.stringify(deck || {})
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

function confirmDelete(event:Event){
    if(!confirm("Are you sure?")) {
        event.preventDefault();
        event.stopPropagation();
    }
}

/** List View
 * 
 * @param {Array<DeckItem>} list 
 * @param {Boolean} edit 
 * @returns {Content}
 */
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
                ),
                edit? _(  "form", {method: "delete", onsubmit: confirmDelete, action: `/Decks/Edit/${deck.id}`},
                    _("button", "Delete")
                ): null,
            ))
        )
    ]
}