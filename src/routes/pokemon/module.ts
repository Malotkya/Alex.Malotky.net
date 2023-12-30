import { Content, createElement as _ } from "../../util/Elements";
import PokemonGameElement, {PokemonGameType} from "./content/PokemonGameElement";

function gameSelect(...list:Array<PokemonGameType>): Content {
    const target: HTMLElement = _("section", {id: "pokemon-game-view"});

    const games: Array<PokemonGameElement> = list.map(game=>new PokemonGameElement(game));
    const buttons: Array<HTMLElement> = list.map((game,index)=>{
        const button = _("button", game.game);

        button.addEventListener("click", ()=>{
            target.innerHTML = "";
            target.appendChild(games[index]);
        });

        return button;
    });

    target.appendChild(games[0]);

    return [
        _("nav", {class: "pokemon-select"}, buttons),
        target
    ]
}

export default function Pokemon():Content {

    return [ 
        _("h2", "Pokemon Game Marathon"),
        _("aside", {id:"about"},
            _("h3", "About:"),
            _("p", "I have recently got back into playing the mainline pokemon games.  I haven't played any of them sence Generation 3, so I have accquire all the games and have been playing them in order.  Bellow are the list of pokemon that I used in each games along with my thoughts about each game.")
        ),
        gameSelect(
            require("./games/yellow.json"),
            require("./games/crystal.json"),
            require("./games/ruby.json"),
            require("./games/platinum.json")
        )
    ];
};