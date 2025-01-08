/** /routes/magic/data/card
 * 
 * @author Alex Malotky
 */
import {object, string, boolean, TypeOf, number, list, url, optional, record} from "zim-engine/Validation";

export const CardObject = object({
    count: number(),
    name: string(),
    set: string(),
    collector_number: string(),
    foil: boolean(),
    image: optional(list(url())),
    art: optional(url()),
    
    //Possible Scryfall data
    manaCost: optional(string()),
    manaValue: optional(number()),
    typeLine: optional(string()),
    oracle: optional(string()),
})

type Card = TypeOf<typeof CardObject>;
export default Card;