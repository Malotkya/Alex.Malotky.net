import { createElement as _ } from "../../../util/Elements";
import PokemonTeamViewElement from "./PokemonTeamViewElement";
import { Game, Region as KnownRegion} from "./PokemonTypes";
import { REGION_MASTER_ARRAY_INDEX } from "../data";

interface dataList {
    [name:string]: Game
}

type Region = KnownRegion | "Unknown"

/** Get Pokemon Region
 * 
 * @param {String} string 
 * @returns {Region}
 */
function getRegion(string:string):Region {
    for(let region in REGION_MASTER_ARRAY_INDEX ) {

        if(REGION_MASTER_ARRAY_INDEX[region as KnownRegion].includes(string))
            return region as KnownRegion;
    }

    return "Unknown";
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
        menuElement: _("li", {class: "region"},
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

        const regions:Map<Region, HTMLElement> = new Map();

        for(let name in list){
            const region:Region = getRegion(list[name].region);
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
        
        if(this._list[name]){
            const {
                game,
                generation,
                region,
                team,
                others,
                version,
            } = this._list[name];
            this._target.appendChild(_("h3", {class: "game-name"}, `Pokemon ${game}`));
            this._target.appendChild(_("p", {class: "game-info"}, `Generation: ${generation}<br/> Region: ${region}`))
            this._target.appendChild(new PokemonTeamViewElement(  team, others, version, game ));
        } else {
            this._target.appendChild(_("p", {class: "error"}, `Game '${name}' cannot be found!`));
        }
        
    }

    connectedCallback(){
        this.appendChild( _("nav", {class: "pokemon-game-select"},  _("ul", this._menu)) );
        this.appendChild( this._target );

        this.addEventListener("click", (event:Event)=>{
            const target: HTMLElement = event.target as HTMLElement;
            const eventTarget:string|null = target.getAttribute("target");

            if(eventTarget){
                //@ts-ignore
                const url = new URL(window.location);
                url.searchParams.set("game", eventTarget);
                window.history.pushState({}, "", url);

                this.display(eventTarget);
                target.blur();
            }
        })
    }

    readyCallback(): void {
        this.querySelectorAll(".region").forEach(parrent=>{
            const width = `${parrent.clientWidth}px`;

            parrent.querySelectorAll("ul").forEach(child=>{
                child.style.maxWidth = width;
            });
        });

    }
}

customElements.define("pokemon-game-select", PokemonGameSelectElement);