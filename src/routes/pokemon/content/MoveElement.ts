import { createElement as _ } from "../../../util/Elements";
import { MoveData } from "./PokemonTypes";

const className = "pokmeon-move-item";

/** Pokemon-Move-Element
 * 
 */
export default function MoveElement(data: MoveData|string){
    if(typeof data === "string") {
        return _("li", {class: className}, data );
    }
    
    const {
        name = "Missing",
        type = "Normal",
        category = "special",
        accuracy = 0,
        power,
        effect
    } = data;

    return _("li", {class: className},
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