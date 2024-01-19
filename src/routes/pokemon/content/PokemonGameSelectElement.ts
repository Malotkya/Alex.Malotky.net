import { createElement as _, Content } from "../../../util/Elements";
import PokemonTeamViewElement from "./PokemonTeamViewElement";
import { Game } from "./PokemonTypes";

interface dataList {
    [name:string]: Game
}

/** Create Menu List Item
 * 
 * Returns list to add buttons to, and wrapper to add to nav section.
 * 
 * @param {string} name 
 * @returns {{menuElement:HTMLElement, menuTarget:HTMLElement}}
 */
function createMenuListElement(name:string):{menuElement:HTMLElement, regionList:HTMLElement} {
    const list = _("ul", {"aria-haspopup": true, id: name});
    const button = _("button", name);
    button.addEventListener("mouseover", ()=>button.focus());
    button.addEventListener("mouseleave", ()=>button.blur());
    return {
        menuElement: _("li", {},
            button,
            list
        ),
        regionList: list
    };
}

export default class PokemonGameSelectElement extends HTMLElement{
    private _menu: Array<HTMLElement>;
    private _target: HTMLElement;
    private _list: dataList;

    constructor(init:string, list:dataList) {
        super();
        this._target = _("section", {id: "pokemon-game-view"});
        this._menu = [];
        this._list = list;

        const regions:Map<string, HTMLElement> = new Map();

        for(let name in list){
            const region: string = list[name].region;
            const button = _("button", {target: name}, list[name].game);
    
            if(!regions.has(region)) {
                const {menuElement, regionList} = createMenuListElement(region);
                regions.set(region, regionList);
                this._menu.push(menuElement);
            }
                
            regions.get(region).appendChild(_("li", button));
        }

        this.display(init);
    }

    display(name:string){
        this._target.innerHTML = "";
        const {
            game,
            generation,
            region,
            team,
            others,
            version,
        } = this._list[name];
        this._target.appendChild(_("h3", {class: "game-name"}, game));
        this._target.appendChild(_("p", {class: "game-info"}, `Generation: ${generation}<br/> Region: ${region}`))
        this._target.appendChild(new PokemonTeamViewElement(  team, others, version, game ));
    }

    connectedCallback(){
        this.appendChild( _("nav", {class: "pokemon-game-select"},  _("ul", this._menu)) );
        this.appendChild( this._target );

        this.addEventListener("click", (event:Event)=>{
            const eventTarget:string|null = (event.target as HTMLElement).getAttribute("target");

            if(eventTarget){
                this.display(eventTarget);
            }
        })
    }
}

customElements.define("pokemon-game-select", PokemonGameSelectElement);