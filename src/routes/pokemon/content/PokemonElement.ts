import { createElement as _, Content } from "../../../util/Elements";
import { Pokemon } from "./PokemonTypes";
import { formatURI } from "./Serebii";
import MoveElement from "./MoveElement";

/** Gender Icon Module
 * 
 * @param {boolean} gender 
 * @returns {Content}
 */
function GenerIcon(gender?:boolean): Content {
    if(gender === null || gender === undefined)
        return null;

    return _("span", {class: "pokemon-gender", "aria-label": gender? "male": "female"}, gender? ' ♂': ' ♀');
}

/** Create Stats List Item
 * 
 * @param {string} name 
 * @param {number} value 
 * @returns {HTMLElement}
 */
function statsListItem(name:string, value:number = -1): Content{
    return _("li", {class: "pokemon-stat-item"}, 
        _("span", {class: "pokemon-stat-name"}, name),
        _("span", {class: "pokemon-stat-value"}, value.toString())
    );
}

/** Create Optional List Item
 * 
 * @param {string} name 
 * @param {string} value 
 * @returns {HTMLElement}
 */
function OptionalList(data:StringIndex): Content{
    const list:Content = [];

    for(let name in data){
        if(data !== undefined)
        list.push(_("li", {class: "pokemon-optional-item"}, 
            _("span", {class: "pokemon-optional-name"}, name),
            _("span", {class: "pokemon-optional-value"}, data[name] === ""? "<i>none</i>": data[name])
        ));
    }

    if(list.length === 0)
        return null;

    return _("ul", {class: "pokmeon-optional-list"}, list );
}

/** Pokemon-Element
 * 
 */
export default function PokemonElement(data:Pokemon, version?:StringIndex, gameName:String = ""):Content {
    const {
        name = "Misingno!",
        level = 0,
        types = ["Normal"],
        gender,
        stats,
        moves = [],
        ability,
        nature,
        item
    } = data;

    while(moves.length < 4){
        moves.push("");
    }
    while(moves.length > 4){
        moves.pop();
    }

    return _("div", {class: "pokemon"},
        _("h4", {class: "pokemon-title"}, 
            _("span", {class: "pokemon-name"}, name)
        ),
        _("p", {class: "pokemon-level"}, `Level: ${level}`),
        _("ul", {class: "pokemon-types-list"},
            types.map(type=>_("li", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type))
        ),
        _("figure", {class: "pokemon-image"},
            _("img", {src: formatURI(data, version), alt: `${name} ${gameName} Sprite`}),
            _("figcaption", data.name, GenerIcon(gender))
        ),
        _("ol", {class: "pokemon-stats-list"},
            statsListItem("Health:",  stats.health),
            statsListItem("Attack:",  stats.attack),
            statsListItem("Defense:", stats.defense),
            stats.special? statsListItem("Special:", stats.special):
                [
                    statsListItem("Sp. Attack:"  , stats.specialAttack),
                    statsListItem("Sp. Deffence:", stats.specialDefence)
                ],
            statsListItem("Speed:", stats.speed)
        ),
        _("ol", {class: "pokmeon-moves-list"}, 
            moves.map(move=>MoveElement(move))
        ),
        OptionalList({ability, nature, item})
    );
}
