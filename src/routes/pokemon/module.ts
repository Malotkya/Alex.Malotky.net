import { Content, createElement as _ } from "../../util/Elements";
import gameSelect from "./content/PokemonGameSelectElement";

import { yellow } from "./games/yellow";
import { crystal } from "./games/crystal";
import { ruby } from "./games/ruby";
import { platinum } from "./games/platinum";
import { white } from "./games/white";
import { x } from "./games/x"
import { sun } from "./games/sun";
import { eevee } from "./games/eevee";
import { diamond } from "./games/brilliantDiamond";
import { red } from "./games/fireRed";
import { gold } from "./games/heartGold";
import { sapphire } from "./games/alphaSapphire";
import {black} from "./games/black2";
import {shield} from "./games/shield";

/** Pokemon Display Module
 * 
 * @param {string} init 
 * @returns {Content}
 */
export default function Pokemon(init?:string):Content {

    return [ 
        _("style", require("./style.scss")),
        _("h1", "Pokemon Game Marathon"),
        _("aside", {id:"pokemon-about"},
            _("h2", "About:"),
            _("p", "I have recently got back into playing the mainline pokemon games.  I haven't played any of them sence Generation 3, so I have accquire all the games and have been playing them in order.  Bellow are the list of pokemon that I used in each games along with my thoughts about each game.")
        ),
        new gameSelect(init || "shield",
            { yellow, crystal, ruby, platinum, white, x, sun, red, gold, sapphire, diamond, black, eevee, shield, /* violet */ }
        )
    ];
};