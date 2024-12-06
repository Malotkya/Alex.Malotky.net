import DataObject, {object, string, boolean, TypeOf, number, list, record, optional} from "zim-engine/Validation";
import {CardObject} from "./card";

export const DeckObject = object({
    commanders: list(CardObject.clone()),
    main_deck: record(list(CardObject.clone())),
    color_identity: list(string()),
    art: string()
});

type Deck = TypeOf<typeof DeckObject>
export default Deck;

export const DeckItemObject = new DataObject("Decks", {
    id: optional(number()),
    name: string(),
    description: string(),
    commanders: list(CardObject.clone()),
    main_deck: record(list(CardObject.clone())),
    color_identity: list(string()),
    art: string()
});

export type DeckItem = TypeOf<typeof DeckItemObject>