import {object, string, boolean, TypeOf, number, list, url, optional} from "zim-engine/Validation";
import { ScryfallData } from "@/util/Scryfall";

export const CardObject = object({
    count: number(),
    name: string(),
    set: string(),
    collector_number: string(),
    foil: boolean(),
    image: optional(list(url())),
    art: optional(url())
})

type Card = ScryfallData&TypeOf<typeof CardObject>;
export default Card;