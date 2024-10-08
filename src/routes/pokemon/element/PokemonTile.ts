import { createElement as _, Element } from "../../../util/Element";
import { Pokemon, MoveData, Nature, GameVersion } from "../types";
import { MASTER_NATURE_INDEX, MASTER_ITEM_INDEX, MASTER_ABILITY_INDEX} from "../data"
import { formatURI } from "../Serebii";

/** Gender Icon Module
 * 
 * @param {boolean} gender 
 * @returns {Element}
 */
function GenerIcon(gender?:boolean) {
    if(gender === null || gender === undefined)
        return null;

    return _("span", {class: "pokemon-gender", "aria-label": gender? "male": "female"}, gender? ' ♂': ' ♀');
}

/** Stats List Item Module
 * 
 * @param {string} name 
 * @param {number} value 
 * @returns {Element}
 */
function statsListItem(name:string, nature:Nature, value:number = -1): Element{
    let extra:string = "";
    if(name === nature.inc){
        extra += " inc";
    }
    if(name === nature.dec) {
        extra += " dec"
    }

    return _("li", {class: "pokemon-stat-item"}, 
        _("span", {class: "pokemon-stat-name"}, name+":"),
        _("span", {class: "pokemon-stat-value"+extra}, value.toString())
    );
}

/** Pokemon Move Module
 * 
 * @param {MoveData|string} data 
 * @returns {Element}
 */
function MoveElement(data: MoveData|string):Element{
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
        _("tool-tip", {"fixed-width": "true"}, name,
            _("tool-tip-text", {class: "pokemon-move-info"},
                _("span",
                    _("span", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type)
                ),
                _("figure", {class: "pokmeon-move-category"},
                    _("img", {src: `/${category}.png`, alt: category})
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
 * @param {Dictionary<Element>} data 
 * @returns {Element}
 */
function OptionalList(data:Dictionary<Element>): Element{
    const list:Element = [];

    for(let name in data){
        let content:Element = data[name];
        let additional:Array<Element> = [];

        if(Array.isArray(content)){
            additional = content;
            content = additional.shift();
        }

        if(content !== null) {
            list.push(_("li", {class: "pokemon-optional-item"}, 
                _("span", {class: "pokemon-optional-name"}, name+":"),
                _("span", {class: "pokemon-optional-value"}, content)
            ));
        }

        while(additional.length > 0)
            list.push(additional.shift());
    }

    if(list.length === 0)
        return null;

    return _("ul", {class: "pokmeon-optional-list"}, list );
}

/** Get Nature
 * 
 * @param name 
 * @returns 
 */
export function getNature(name:string = ""):Nature {
    const temp:Nature = MASTER_NATURE_INDEX[name.toUpperCase()];
    if(temp)
        return temp;

    return {inc: "", dec: ""};
}

/** Nature Description Tool Tip
 * 
 * @param {string} name 
 * @returns {Element}
 */
function getNatureDescription(name?:string):Element {
    if(name === undefined)
        return null;

    if(name === "")
        return _("i", "none")

    const temp:Nature = MASTER_NATURE_INDEX[name.toUpperCase()];
    let tip:Element;
    if(temp) {
        if(temp.inc === temp.dec)
            tip = "Does nothing to adjust stats.";

        tip = [
            `Increases ${temp.inc}.`,
            _("br"),
            `Decreases ${temp.dec}.`
        ];
    } else {
        tip = `Nature '${name}' not found!`;
    }

    return _("tool-tip",
        name,
        _("tool-tip-text", tip)
    )
}

/** Item Description Tool Tip
 * 
 * @param {string} name 
 * @returns {Element}
 */
function getItemDescription(name?:string):Element {
    if(name === undefined)
        return null;

    if(name === "")
        return _("i", "none");

    return _("tool-tip",
        name,
        _("tool-tip-text", MASTER_ITEM_INDEX[name] || `Item '${name}' not found!`)
    )
}

/** Terra Type
 * 
 * @param {string} type
 * @returns {Element}
 */
function getTerraType(type?:string):Element{
    if(type === undefined)
        return null;

    return _("span", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type);
}

/** Ability Description Tool Tip
 * 
 * @param {string} name 
 * @returns {Element}
 */
export function getAbilityDescription(name?:string):Element {
    if(name === undefined)
        return null;

    if(name === "")
        return _("i", "none");

    return _("tool-tip",
        name,
        _("tool-tip-text", MASTER_ABILITY_INDEX[name] || `Ability '${name}' not found!`)
    )
}

/** Dynamax and Gygantimax info.
 * 
 * @param {number} dynamax,
 * @param {boolean} gigantamax, 
 * @returns {Element}
 */
function getDynamaxInfo(dynamax:number = Number.NaN, gigantamax?:boolean):Element {
    if(isNaN(dynamax))
        return null;

    return [
        _("span", dynamax.toString()),
        gigantamax? _("li", {class: "gigantamax", style:"display:block"}, "Gigantamax!"): null
    ]
}

/** Pokemon-Element
 * 
 */
export default function PokemonTile(data:Pokemon, version?:GameVersion, gameName:string = ""):HTMLElement {
    const {
        name = "Misingno!",
        level = 0,
        types = ["Normal"],
        gender,
        stats,
        moves = [],
        ability,
        nature,
        item,
        dynamax,
        gigantamax,
        terraType
    } = data;

    while(moves.length < 4){
        moves.push("");
    }
    while(moves.length > 4){
        moves.pop();
    }

    const NATURE = getNature(nature);

    return _("div", {class: "pokemon"},
        _("h4", {class: "pokemon-title"}, 
            _("span", {class: "pokemon-name"}, name)
        ),
        _("ul", {class: "pokemon-types-list"},
            types.map(type=>_("li", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type))
        ),
        _("p", {class: "pokemon-level"}, `Level: ${level}`),
        _("figure", {class: "pokemon-image"},
            _("img", {src: formatURI(data, version), alt: `${name} ${gameName} Sprite`}),
            _("figcaption", data.name, GenerIcon(gender))
        ),
        _("ol", {class: "pokemon-stats-list"},
            statsListItem("Health" , NATURE, stats.health),
            statsListItem("Attack" , NATURE, stats.attack),
            statsListItem("Defense", NATURE, stats.defense),
            stats.special? statsListItem("Special", NATURE, stats.special):
                [
                    statsListItem("Sp. Attack"  , NATURE, stats.specialAttack),
                    statsListItem("Sp. Defense", NATURE, stats.specialDefence)
                ],
            statsListItem("Speed", NATURE, stats.speed)
        ),
        _("ol", {class: "pokmeon-moves-list"}, 
            moves.map(move=>MoveElement(move))
        ),
        OptionalList({
            "Ability": getAbilityDescription(ability),
            "Nature":  getNatureDescription(nature),
            "Item":    getItemDescription(item),
            "Dynamax Level": getDynamaxInfo(dynamax, gigantamax),
            "Terra Type": getTerraType(terraType)
        })
    );
}
