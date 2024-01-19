import { Content, createElement as _ } from "../../util/Elements";
import PokemonGameElement from "./content/PokemonGameElement";
import { Game } from "./content/PokemonTypes";
//String index interfaces used to easily access information.
interface dataList {
    [name:string]: Game
}
interface elementList {
    [name:string]: PokemonGameElement
}
interface menuList {
    [name:string]: HTMLElement
}

/** Create Menu List Item
 * 
 * Returns list to add buttons to, and wrapper to add to nav section.
 * 
 * @param {string} name 
 * @returns {{menuElement:HTMLElement, menuTarget:HTMLElement}}
 */
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

/** Create Game Select Section
 * 
 * @param {string} init 
 * @param {dataList} list 
 * @returns {Content}
 */
function gameSelect(init:string, list:dataList): Content{
    const target: HTMLElement = _("section", {id: "pokemon-game-view"});

    //Indexed lists that hold Information
    const games: elementList = {};
    const menuLists: menuList = {};

    //Array of HTML Elements to drop in nav at the end.
    const buffer: Array<HTMLElement> = [];

    for(let name in list){
        games[name] = new PokemonGameElement(list[name]);
        const region: string = list[name].region;
        const button = _("button", list[name].game);

        //Create Menu option if it doesn't exist.
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

    //Display desired inital game or error.
    target.appendChild(games[init] || _("h2", {class: "error"}, `Error: '${init}' is not an option!`));

    return [
        _("nav", {class: "pokemon-game-select"}, 
            _("ul", buffer)
        ),
        target
    ]
}

/** Pokemon Display Module
 * 
 * @param {string} init 
 * @returns {Content}
 */
export default function Pokemon(init?:string):Content {

    return [ 
        _("h1", "Pokemon Game Marathon"),
        _("aside", {id:"about"},
            _("h2", "About:"),
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