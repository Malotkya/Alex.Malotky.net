/** /routes/pokemon/view
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "zim-engine";
import ALL_GAMES, {DEFAULT_INIT} from "../games";
//import PokemonGame from "./PokemonGame";
//import { Game, Region as KnownRegion } from "../types";
//import { REGION_MASTER_ARRAY_INDEX } from "@/util/Serebii/data";



export default function PokemonView(init:string = DEFAULT_INIT):Content {
    return [
        _("h1", "Pokemon Game Test"),
        _("form", {is: "game-input"})
    ]

}