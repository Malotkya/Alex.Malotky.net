/** /routes/pokemon/view
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content, RenderUpdate } from "zim-engine";
import Game from "../data/game";
import PokemonItem from "./PokemonItem";
import { simplify, recordHas } from "@/util";
import { getRegion } from "@/util/Serebii";
import styles from "./style.scss";

/** Pokemon Game View
 * 
 * @param {Game} data 
 * @returns {Content}
 */
export function PokemonGame(id:string, data:Game, current:boolean):Content {
    const {name, generation, region, team, others} = data;

    return [
        _("input", {type: "radio", id: id, name: "game", class: "detail-toggle", checked: current }),
        _("section", {class: "pokemon-game-view"},
            _("h3", {class: "game-name"}, `Pokemon ${name}`),
            _("p", {class: "game-info"},
                `Generation: ${generation}`,
                _("br"),
                `Region: ${region}`
            ),
            _("label", {for: "main-pokemon", class: "detail-summary"}, "Main Pokemon"),
            others.length > 0? _("label", {for: "other-pokemon", class: "detail-summary"}, "Other Pokemon"):null,
            _("input", {type: "radio", id: "main-pokemon", class: "detail-toggle", name: id, checked: true}),
            _("ul", {class: "pokemon-view"},
                team.map(p=>PokemonItem(p, current))
            ),
            others.length > 0 ? [
                _("input", {type: "radio", id: "other-pokemon", class: "detail-toggle", name: id}),
                _("ul", {class: "pokemon-view"},
                    others.map(p=>PokemonItem(p, current))
                )
            ]: null
        )
    ]
}

/** Build Base Data
 * 
 * @param {Game[]} list 
 * @returns {Array}
 */
export function buildBaseData(list:Game[]):[Record<string, Game>, string] {
    if(list.length === 0)
        throw new Error("No Results!");

    const output:Record<string, Game> = {};

    /** Get Navigation Id
     * 
     * @param {Game} value 
     * @returns {string}
     */
    const getId = (value:Game):string => {
        const base = simplify(value.name.replace(/version/i, ""));
        let id = base;
        let count = 1;
        while(recordHas(output, id))
            id = `${base}${++count}`;

        return id;
    }

    let init:string = getId(list[0]);
    let max:number  = list[0].id || 0;
    
    output[init] = list[0];

    for(let i=1; i<list.length; i++) {
        const id = getId(list[i]);

        if( max < (list[i].id || 0) ) {
            init = id;
            max = list[i].id!;
        }

        output[id] = list[i];
    }

    return [output, init];
}

export default function PokemonView(data:Record<string, Game>, init:string):RenderUpdate {
    const list:Content[] = [];
    const map:Record<string, Content[]> = {};

    for(const name in data){
        list.push(PokemonGame(name, data[name], name === init));

        const region = getRegion(data[name].region);
        if(map[region] === undefined)
            map[region] = [];

        map[region].push( _("label", {for: name, class: "pokemon-nav-item"}, data[name].name ));
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

    return {
        head: {
            styles,
            title: "Pokemon Games",
            meta: {
                description: "Pokemon teams accross the different pokemon games Alex has played."
            }
        },
        body:{
            main: [
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
    };
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

        //@ts-ignore
        const update = new window.URL(window.location);
        update.searchParams.set("game", target);
        window.history.pushState({}, "", update);

        (<NodeListOf<HTMLInputElement>>document.querySelectorAll('input[name="game"]')).forEach(input=>{
            input.checked = input.id === target;
        });
    }
}