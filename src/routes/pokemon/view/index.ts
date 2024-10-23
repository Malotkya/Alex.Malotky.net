import { createContent as _, Content } from "Engine";
import ALL_GAMES, {DEFAULT_INIT} from "../games";
import PokemonGame from "./PokemonGame";
import { Game, Region as KnownRegion } from "../types";
import { REGION_MASTER_ARRAY_INDEX } from "../data";

const style = _("style", require("../style.scss"));

/** Get Pokemon Region
 * 
 * @param {String} string 
 * @returns {Region}
 */
function getRegion(string:string):KnownRegion|"Unknown" {
    for(let region in REGION_MASTER_ARRAY_INDEX ) {

        if(REGION_MASTER_ARRAY_INDEX[region as KnownRegion].includes(string))
            return region as KnownRegion;
    }

    return "Unknown";
}

function getGame(data:Dictionary<Game>, init:string):Content {
    for(const name in data) {
        if(name === init)
        return PokemonGame(data[name]);
    }

    return PokemonGame(data[DEFAULT_INIT]);
}

function buildNav(data:Dictionary<Game>):Content {
    const map:Dictionary<Array<Content>> = {};
    const list:Array<Content> = [];

    for(const name in data){
        const region = getRegion(data[name].region);

        if(map[region] === undefined)
            map[region] = [];

        map[region].push(_("a", {class: "pokemon-nav-item", href: `?game=${name}`}, data[name].game));
    }

    for(const name in map){
        list.push(_("li", {class: "region"},
            _("button", {class: "pokemon-nav-item"}, name),
            _("ul", {ariaHaspopup: true},
                map[name].map(b=>_("li", b))
            )
        ));
    }

    return _("nav", { class: "pokemon-game-select"},
        _("ul", list)
    )
}

export default function PokemonView(init:string = DEFAULT_INIT):Content {
    return [
        style,
        _("h1", "Pokemon Game Marathon"),
        _("aside", {id: "pokemon-about"},
            _("h2", "About:"),
            _("p", "I have recently got back into playing the mainline pokemon games. I haven't played any of them sence Generation 3, so I have accquire all the games and have been playing them in order. Bellow are the list of pokemon that I used in each games along with my thoughts about each game.")
        ),
        buildNav(ALL_GAMES),
        getGame(ALL_GAMES, init)
    ]

}