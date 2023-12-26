import { Content, createElement as _ } from "../../util/Elements";
import PokemonGameElement from "./content/PokemonGameElement";

export default function Pokemon():Content {
    return [ 
        _("h2", "Pokemon Game Marathon"),
        _("aside", {id:"about"},
            _("h3", "About:"),
            _("p", "I have recently got back into playing the mainline pokemon games.  I haven't played any of them sence Generation 3, so I have accquire all the games and have been playing them in order.  Bellow are the list of pokemon that I used in each games along with my thoughts about each game.")
        ),
        new PokemonGameElement(require("./games/yellow.json")),
        new PokemonGameElement(require("./games/crystal.json")),
        new PokemonGameElement(require("./games/ruby.json"))
    ];
};