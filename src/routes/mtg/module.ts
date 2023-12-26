import { createElement as _, Content } from "../../util/Elements";
import { DeckEdit, DeckView, DeckItem } from "./content/Deck";

export default function Magic(args: any): Content{
    if(Array.isArray(args.arr)){
        return [
            _("h1", "Magic the Gathering Decks!"),
            args.edit? _("a",{class: "btn", href: "/Decks/Editor/New"}, "Create New Deck"): null,
            _("ul", {id: "deck-list"},
                args.arr.map((deck:any)=>Result(deck, args.edit))
            )
        ]
    } else if(args.edit) {
        return DeckEdit(args.arr);
    }

    return DeckView(args.arr);
}

function Result(deck:DeckItem, edit: boolean): Content{

    const deleteButton = _("button", {class: "btn"}, "Delete");
    deleteButton.addEventListener("click", (event:Event)=>{
        event.preventDefault();
        event.stopPropagation();
        if( confirm("Are you sure you want to delete the deck?") ){
            (window as any).route("/Decks/Editor/Delete/" + deck.id);
        }
    });

    let image:HTMLElement;
    if(deck.art) {
        image = _("img", {src: deck.art, alt: "Deck Art"});
    } else {
        image = _("img", {src: "/media/missing.jpg", alt: "Missing Deck Art"});
    }

    const colorIdentity: Array<HTMLElement> = deck.color_identity.length === 0
        ?[_("span", {class: "mana-symbol colorless"})]
        :deck.color_identity.map((color:string)=>_("span", {class: `mana-symbol ${color}`}));

    return _("li", 
        _("a", {href: edit? `/decks/Editor/${deck.id}`: `/Decks/${deck.id}`},
            _("figure", {class: "deck-art"},
                image
            ),
            _("h2", deck.name),
            _("p", edit? deleteButton: null),
            _("p", {class: "color_identity"},
                colorIdentity
            )
        )
    );
}