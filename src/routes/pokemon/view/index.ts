/** /routes/pokemon/view
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "zim-engine";
import Game from "../data/game";
import PokemonGame from "./PokemonGame";
import { getRegion } from "@/util/Serebii";

export default function PokemonView(data:Dictionary<Game>, init:string):Content {
    const list:Content[] = [];
    const map:Dictionary<Array<Content>> = {};

    for(const name in data){
        list.push(PokemonGame(name, data[name], name === init));

        const region = getRegion(data[name].region);
        if(map[region] === undefined)
            map[region] = [];

        map[region].push(_("label", {for: name, class: "pokemon-nav-item"}, data[name].name ));
    }

    const nav:Array<Content> = [];
    for(const name in map){
        nav.push(_("li", {class: "region"},
            _("button", {class: "pokemon-nav-header"}, name),
            _("div", {class: "sub-menu-container"},
                _("ul", {ariaHaspopup: true},
                    map[name].map(b=>_("li", b))
                )
            )
        ));
    }

    return [
        _("h1", "Pokemon Game Marathon"),
        _("aside", {id: "pokemon-about"},
            _("h2", "About:"),
            _("p", "I have recently got back into playing the mainline pokemon games. I haven't played any of them sence Generation 3, so I have accquire all the games and have been playing them in order. Bellow are the list of pokemon that I used in each games along with my thoughts about each game.")
        ),
        _("menu", { class: "pokemon-game-select", onclick:updateNav},
            _("ul", nav)
        ),
        list
    ]

}

/** Update Nav FrontEnd Function
 * 
 * @param {Event} event 
 */
function updateNav(event:Event){
    const target = (<HTMLElement>event.target).getAttribute("for");
    if(target !== null) {
        event.preventDefault();
        event.stopPropagation();

        const update = new URL(window.location.pathname);
        update.searchParams.set("game", target);
        window.history.pushState({}, "", update);
    }
}