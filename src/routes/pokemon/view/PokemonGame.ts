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
        _("label", {for: "main-pokemon", class: "detail-summary"}, "Main Pokemon"),
        others.length > 0? _("label", {for: "other-pokemon", class: "detail-summary"}, "Other Pokemon"):null,
        _("input", {type: "radio", id: "main-pokemon", class: "detail-toggle", name: game, checked: true}),
        _("ul", {class: "pokemon-view"},
            team.map(p=>PokemonItem(p, game, version))
        ),
        others.length > 0 ? [
            _("input", {type: "radio", id: "other-pokemon", class: "detail-toggle", name: game}),
            _("ul", {class: "pokemon-view"},
                others.map(p=>PokemonItem(p, game, version))
            )
        ]: null
    )
}