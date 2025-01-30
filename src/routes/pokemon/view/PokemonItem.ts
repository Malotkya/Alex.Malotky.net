/** /routes/pokemon/view/PokemonItem
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "zim-engine";
import Pokemon, { Move, Description } from "../data/pokemon";
import { Nature, NatureMap, natureToString } from "@/util/Serebii";

/** Pokemon Sprite
 * 
 */
const Sprite = (src:string, alt:string, eager:boolean) => _("img", {src, alt, loading: eager? "eager": "lazzy"});

/** Gender Icon Module
 * 
 * @param {boolean} gender 
 * @returns {Content}
 */
function GenerIcon(gender:Optional<boolean>):Content{
    if(gender === null || gender === undefined)
        return null;

    return _("span", {class: "pokemon-gender", ariaLabel: gender? "male": "female"}, gender? ' ♂': ' ♀');
}

/** Stats List Item Module
 * 
 * @param {string} name 
 * @param {number} value 
 * @returns {Content}
 */
function statsListItem(name:string, nature:Nature, value:Optional<number>): Content{
    if(value === null || value === undefined)
        value = -1;

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
 * @returns {Content}
 */
function MoveElement(data: Move|string):Content{
    if(typeof data === "string") {
        return _("li", {class: "pokmeon-move-item"}, data );
    }
    
    const { name, type, category, accuracy, power, effect } = data;

    return _("li", {class: "pokmeon-move-item"},
        _("tool-tip", {"fixed-width": "true"}, name,
            _("tool-tip-text", {class: "pokemon-move-info"},
                _("span",
                    _("span", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type)
                ),
                _("figure", {class: "pokmeon-move-category"},
                    _("img", {src: `/${category.toLocaleLowerCase()}.png`, alt: category})
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

/** Create Optional List Item
 * 
 * @param {Dictionary<Content>} data 
 * @returns {Content}
 */
function OptionalList(data:Dictionary<Content>): Content{
    const list:Content = [];

    for(let name in data){
        let content:Content = data[name];
        let additional:Array<Content> = [];

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
 * @param {string} name 
 * @returns {Nature}
 */
function getNature(name:Optional<string>):Nature {
    if(name !== undefined && name !== null){
        const nat = NatureMap[name.toLocaleLowerCase()];

        if(nat)
            return nat;
    }

    return {inc: "", dec: ""};
}

/** Nature Description Tool Tip
 * 
 * @param {string} name 
 * @returns {Content}
 */
function NatureDescription(name:Optional<string>):Content {
    if(name === undefined || name === null )
        return null;

    if(name === "")
        return _("i", "none")

    const temp:Nature = NatureMap[name.toLocaleLowerCase()];
    let tip:Content;
    if(temp) {
        tip = natureToString(temp);
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
 * @returns {Content}
 */
function ItemDescription(item:Optional<Description>):Content {
    if(item === null || item === undefined)
        return null;

    if(item.name === "" || item.name === "none")
        return _("i", "none");

    return _("tool-tip",
        item.name,
        _("tool-tip-text", item.value)
    )
}

/** Terra Type
 * 
 * @param {string} type
 * @returns {Content}
 */
function getTerraType(type:Optional<string>):Content{
    if(type === undefined || type === null)
        return null;

    return _("span", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type);
}

/** Ability Description Tool Tip
 * 
 * @param {string} name 
 * @returns {Content}
 */
export function getAbilityDescription(name:string, value:string):Content {
    if(name === "")
        return _("i", "none");

    return _("tool-tip",
        name,
        _("tool-tip-text", value)
    )
}

/** Dynamax and Gygantimax info.
 * 
 * @param {number} dynamax,
 * @param {boolean} gigantamax, 
 * @returns {Content}
 */
function getDynamaxInfo(dynamax:Optional<number> = null, gigantamax:Optional<boolean>):Content {
    if(dynamax === null)
        return null;

    return [
        _("span", dynamax.toString()),
        gigantamax? _("li", {class: "gigantamax", style:"display:block"}, "Gigantamax!"): null
    ]
}

/** Pokemon-Element
 * 
 */
export default function PokemonItem(data:Pokemon, eager: boolean):Content {
    const {name, level, types, gender, stats, modifiers, sprite, sprite_text} = data;
    const moves:Array<string|Move> = data.moves;
    const {nature, item, dynamax, gigantamax, terraType, ability} = modifiers;

    while(moves.length < 4){
        moves.push("");
    }
    while(moves.length > 4){
        moves.pop();
    }

    const NATURE = getNature(nature);

    return _("li", {class: "pokemon"},
        _("h4", {class: "pokemon-title"}, 
            _("span", {class: "pokemon-name"}, name)
        ),
        _("ul", {class: "pokemon-types-list"},
            types.map(type=>_("li", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type))
        ),
        _("p", {class: "pokemon-level"}, `Level: ${level}`),
        _("figure", {class: "pokemon-image"},
            Sprite(sprite, sprite_text, eager),
            _("figcaption", data.name, GenerIcon(gender))
        ),
        _("ol", {class: "pokemon-stats-list"},
            statsListItem("Health" , NATURE, stats.health),
            statsListItem("Attack" , NATURE, stats.attack),
            statsListItem("Defense", NATURE, stats.defense),
            stats.special? statsListItem("Special", NATURE, stats.special):
                [
                    statsListItem("Sp. Attack"  , NATURE, stats.specialAttack),
                    statsListItem("Sp. Defense", NATURE, stats.specialDefense)
                ],
            statsListItem("Speed", NATURE, stats.speed)
        ),
        _("ol", {class: "pokmeon-moves-list"}, 
            moves.map(move=>MoveElement(move))
        ),
        OptionalList({
            "Ability": ItemDescription(ability),
            "Nature":  NatureDescription(nature),
            "Item":    ItemDescription(item),
            "Dynamax Level": getDynamaxInfo(dynamax, gigantamax),
            "Terra Type": getTerraType(terraType)
        })
    );
}
