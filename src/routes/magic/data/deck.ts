/** /routes/magic/data/deck
 * 
 * @author Alex Malotky
 */
import DataObject, {object, string, TypeOf, number, list, record, optional, url} from "zim-engine/Validation";
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
    art: optional(url())
});

export type DeckItem = TypeOf<typeof DeckItemObject>