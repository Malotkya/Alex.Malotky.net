import { createElement as _, Content } from "../../../util/Elements";
import { Pokemon, MoveData } from "./PokemonTypes";
import { formatURI } from "./Serebii";

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

/** Stats List Item Module
 * 
 * @param {string} name 
 * @param {number} value 
 * @returns {Content}
 */
function statsListItem(name:string, value:number = -1): Content{
    return _("li", {class: "pokemon-stat-item"}, 
        _("span", {class: "pokemon-stat-name"}, name),
        _("span", {class: "pokemon-stat-value"}, value.toString())
    );
}

/** Pokemon Move Module
 * 
 * @param {MoveData|string} data 
 * @returns {Content}
 */
function MoveElement(data: MoveData|string): Content{
    if(typeof data === "string") {
        return _("li", {class: MOVE_ELEMENT_CLASS_NAME}, data );
    }
    
    const {
        name = "Missing",
        type = "Normal",
        category = "special",
        accuracy = 0,
        power,
        effect
    } = data;

    return _("li", {class: MOVE_ELEMENT_CLASS_NAME},
        _("tool-tip", name,
            _("tool-tip-text", {class: "pokemon-move-info"},
                _("span",
                    _("span", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type)
                ),
                _("figure", {class: "pokmeon-move-category"},
                    _("img", {src: `/media/${category}.png`, alt: category})
                ),

                power?
                _("div", 
                    _("span", "Power:"),
                    _("span", power === 0? "—": power.toString())
                ): null,

                _("div", 
                    _("span", "Accuracy:"),
                    _("span", accuracy === 0? "—": accuracy.toString())
                ),
        
                effect? _("p", effect): null
            )
        )
    );
}
const MOVE_ELEMENT_CLASS_NAME = "pokmeon-move-item";

/** Create Optional List Item
 * 
 * @param {StringIndex} data 
 * @returns {Content}
 */
function OptionalList(data:StringIndex): Content{
    const list:Content = [];

    for(let name in data){
        if(data[name] !== undefined)
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
export default function PokemonElement(data:Pokemon, version?:StringIndex, gameName:string = ""):HTMLElement {
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
