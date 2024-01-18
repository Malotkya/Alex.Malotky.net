import { Content, createElement as _ } from "../../util/Elements";
import PokemonGameElement, {PokemonGameType} from "./content/PokemonGameElement";

interface dataList {
    [name:string]: PokemonGameType
}

interface elementList {
    [name:string]: PokemonGameElement
}

interface menuList {
    [name:string]: HTMLElement
}

function createMenuListElement(name:string):{menuElement:HTMLElement, menuTarget:HTMLElement} {
    const list = _("ul", {"aria-haspopup": true, id: name});
    const button = _("button", name);
    button.addEventListener("mouseover", ()=>button.focus());
    button.addEventListener("mouseleave", ()=>button.blur());
    return {
        menuElement: _("li", {},
            button,
            list
        ),
        menuTarget: list
    };
}

function gameSelect(init:string, list:dataList): Content{
    const target: HTMLElement = _("section", {id: "pokemon-game-view"});

    const games: elementList = {};
    const menuLists: menuList = {};
    const buffer: Array<HTMLElement> = [];

    for(let name in list){
        games[name] = new PokemonGameElement(list[name]);
        const region: string = list[name].region;
        const button = _("button", list[name].game);

        if(typeof menuLists[region] === "undefined") {
            const {menuElement, menuTarget} = createMenuListElement(region);
            menuLists[region] = menuTarget;
            buffer.push(menuElement);
        }
            
        menuLists[region].appendChild(_("li", button));

        button.addEventListener("click", ()=>{
            //@ts-ignore
            const url = new URL(window.location);
            url.searchParams.set("game", name);
            window.history.pushState({}, "", url);

            target.innerHTML = "";
            target.appendChild(games[name]);

            button.blur();
        });
    }

    target.appendChild(games[init] || _("h2", {class: "error"}, `Error: '${init}' is not an option!`));

    return [
        _("nav", {class: "pokemon-game-select"}, 
            _("ul", buffer)
        ),
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
        gameSelect(init || "sun", {
            "yellow"  : require("./games/yellow.json"),
            "crystal" : require("./games/crystal.json"),
            "ruby"    : require("./games/ruby.json"),
            "platinum": require("./games/platinum.json"),
            "white"   : require("./games/white.json"),
            "x"       : require("./games/x.json"),
            "sun"     : require("./games/sun.json"),
            "red"     : require("./games/fireRed.json"),
        })
    ];
};