import { Content, createElement as _ } from "../../util/Elements";
import PokemonGameElement, {PokemonGameType} from "./content/PokemonGameElement";

interface dataList {
    [name:string]: PokemonGameType
}

interface elementList {
    [name:string]: PokemonGameElement
}

function gameSelect(init:string, list:dataList): Content {
    const target: HTMLElement = _("section", {id: "pokemon-game-view"});

    const games: elementList = {};
    const buttons: Array<HTMLElement> = [];

    for(let name in list){
        games[name] = new PokemonGameElement(list[name]);

        const button = _("button", list[name].game);
        button.addEventListener("click", ()=>{
            target.innerHTML = "";
            target.appendChild(games[name]);
        });
        buttons.push(button);
    }

    target.appendChild(games[init]);

    return [
        _("nav", {class: "pokemon-select"}, buttons),
        target
    ]
}

export default function Pokemon(init?:string):Content {

    const games: Map<string, PokemonGameType> = new Map();

    return [ 
        _("h2", "Pokemon Game Marathon"),
        _("aside", {id:"about"},
            _("h3", "About:"),
            _("p", "I have recently got back into playing the mainline pokemon games.  I haven't played any of them sence Generation 3, so I have accquire all the games and have been playing them in order.  Bellow are the list of pokemon that I used in each games along with my thoughts about each game.")
        ),
        gameSelect(init || "x", {
            "yellow"  : require("./games/yellow.json"),
            "crystal" : require("./games/crystal.json"),
            "ruby"    : require("./games/ruby.json"),
            "platinum": require("./games/platinum.json"),
            "white"   : require("./games/white.json"),
            "x"       : require("./games/x.json")
        })
    ];
};