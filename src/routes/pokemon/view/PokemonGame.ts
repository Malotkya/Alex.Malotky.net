import { createContent as _, Content } from "Engine";
import { GameVersion, Pokemon, Game } from "../types";
import PokemonItem from "./PokemonItem";

/** Pokemon View List
 * 
 * @param {Array<Pokemon>} list 
 * @param {string} details 
 * @param {string} gameName 
 * @param {GameVersion} version 
 * @returns {Content}
 */
function PokemonList(list:Array<Pokemon>, details:string, gameName:string, version?:GameVersion, open?:boolean):Content {
    return _("details", {name:gameName, open},
        _("summary", details),
        _("ul", {class: "pokemon-view"},
            list.map(p=>PokemonItem(p, gameName, version))
        )
    )
}

/** Pokemon Game View
 * 
 * @param {Game} data 
 * @returns {Content}
 */
export default function PokemonGame(data:Game):Content {
    const {
        game,
        generation,
        region,
        team,
        others = [],
        version,
    } = data;

    return _("section", {class: "pokemon-game-view"},
        _("h3", {class: "game-name"}, `Pokemon ${game}`),
        _("p", {class: "game-info"},
            `Generation: ${generation}`,
            _("br"),
            `Region: ${region}`
        ),
        PokemonList(team, "Main Pokemon", game, version, true),
        others.length > 0? PokemonList(others, "Other Pokemon", game, version) : null
    )
}