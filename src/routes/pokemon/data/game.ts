/** /routes/pokmeon/data/game
 * 
 * @author Alex Malotky
 */
import DataObject, {string, TypeOf, number, list, optional} from "zim-engine/Validation";
import {PokemonObject} from "./pokemon";

export const GameObject = new DataObject("Pokemon", {
    name: string(),
    generation: number(),
    region: string(),
    team: list(PokemonObject),
    others: list(PokemonObject)
});

type Game = TypeOf<typeof GameObject>;
export default Game;