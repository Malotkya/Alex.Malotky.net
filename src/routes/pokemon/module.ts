import { createElement } from "../../util/Elements";
import PokemonGameElement from "./content/PokemonGameElement";

export default function Pokemon() {
    return createElement("body-element", 
        createElement("h2", "Pokemon Game Marathon"),
        createElement("aside", {id:"about"},
            createElement("h3", "About:"),
            createElement("p", "I have recently got back into playing the mainline pokemon games.  I haven't played any of them sence Generation 3, so I have accquire all the games and have been playing them in order.  Bellow are the list of pokemon that I used in each games along with my thoughts about each game.")
        ),
        new PokemonGameElement(require("./games/yellow.json")),
        new PokemonGameElement(require("./games/crystal.json")),
        new PokemonGameElement(require("./games/ruby.json"))
    );
};