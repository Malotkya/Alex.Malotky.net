
/** /routes/mtg/content/Deck.ts
 * 
 * @author Alex Malotky
 */
import {createElement as _, Content} from "../../../util/Elements";
import DeckViewElement, {CardElement} from "./elements/DeckView";
import DeckEditorElement, {Deck} from "./elements/DeckEditor";

//Extra deck information in database.
export interface DeckItem extends Deck {
    id?: string,
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
    const btnSubmit = _("button", {id:"submit"}, "Save Changes");

    const txtName = _("input", {id: "name", value: deck.name}) as HTMLInputElement;
    const txtDescription = _("textarea", {id:"description"}, deck.description) as HTMLTextAreaElement;
    const editor = new DeckEditorElement(deck.commanders, deck.main_deck);

    btnSubmit.addEventListener("click", ()=>{
        const data:DeckItem = {
            ...editor.getDeckObject(),
            name: txtName.value,
            description: txtDescription.value
        };

        window.route("/Decks/Editor/Update/"+deck.id, {deck: JSON.stringify(data)})
    });

    return _("article", {id:"deckEditor"},
        _("a", {href: "/Decks/Editor", class:"btn", clear:"true"}, "Back"),
        _("a", {href: `/Decks/${deck.id}`, id: "btnView", class: "btn", clear:"true"}, "View"),
        btnSubmit,
        _("h1", "Deck Editor"),
        _("label", {for: "name"}, "Deck Name"),
        txtName,
        _("label", {for:"description"}),
        txtDescription,
        _("label", {for: "deckList"}, "Deck List:"),
        editor
    );
}