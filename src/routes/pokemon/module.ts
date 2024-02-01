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
        new gameSelect(init || "sun", {
            "yellow"  : yellow,
            "crystal" : crystal,
            "ruby"    : ruby,
            "platinum": platinum,
            "white"   : white,
            "x"       : x,
            "sun"     : sun,
            "red"     : red,
            "gold"    : gold,
            //"saphire" : require("./games/alphaSaphire.json"),
            "diamond" : diamond,
            //"black"   : require("./games/black2.json"),
            "eevee"   : eevee,
            //"shield"  : require("./games/shield.json"),
            //"violet"  : require("./games/violet.json"),
        })
    ];
};