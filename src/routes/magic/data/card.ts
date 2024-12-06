import {object, string, boolean, TypeOf, number, list, url, optional, record} from "zim-engine/Validation";
import { ScryfallData } from "@/util/Scryfall";

export const CardObject = object({
    count: number(),
    name: string(),
    set: string(),
    collector_number: string(),
    foil: boolean(),
    image: optional(list(url())),
    
    //Possible Scryfall data
    manaCost: optional(string()),
    manaValue: optional(number()),
    typeLine: optional(string()),
    oracle: optional(string()),
    art: optional(url()),
    sets: optional(record(list(string())))
})

type Card = TypeOf<typeof CardObject>;
export default Card;