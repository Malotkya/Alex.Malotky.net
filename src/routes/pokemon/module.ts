import { Content, createElement as _ } from "../../util/Elements";
import gameSelect from "./content/PokemonGameSelectElement";

/** Pokemon Display Module
 * 
 * @param {string} init 
 * @returns {Content}
 */
export default function Pokemon(init?:string):Content {

    return [ 
        _("h1", "Pokemon Game Marathon"),
        _("aside", {id:"pokemon-about"},
            _("h2", "About:"),
            _("p", "I have recently got back into playing the mainline pokemon games.  I haven't played any of them sence Generation 3, so I have accquire all the games and have been playing them in order.  Bellow are the list of pokemon that I used in each games along with my thoughts about each game.")
        ),
        new gameSelect(init || "sun", {
            "yellow"  : require("./games/yellow.json"),
            "crystal" : require("./games/crystal.json"),
            "ruby"    : require("./games/ruby.json"),
            "red"     : require("./games/fireRed.json"),
            "platinum": require("./games/platinum.json"),
            "white"   : require("./games/white.json"),
            "x"       : require("./games/x.json"),
            "sun"     : require("./games/sun.json"),
            //"gold"    : require("./games/heartGold.json"),
            //"saphire" : require("./games/alphaSaphire.json"),
            //"black"   : require("./games/black2.json"),
            "eevee"   : require("./games/eevee.json"),
            //"diamond" : require("./games/brilliantDiamond.json"),
            //"shield"  : require("./games/shield.json"),
            //"violet"  : require("./games/violet.json"),
        })
    ];
};