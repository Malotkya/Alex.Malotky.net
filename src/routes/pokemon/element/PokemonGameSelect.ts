import {Game, Region as KnownRegion} from "../types";
import { createElement as _ } from "../../../util/Element";
import { REGION_MASTER_ARRAY_INDEX } from "../data";

type Region = KnownRegion | "Unknown"

const MIN_BUTTON_WIDTH = 200;//px

function calculateNavButtonWidth(totalWidth:number, count:number):Array<string> {
    let value:number = totalWidth / count;

    if( value > MIN_BUTTON_WIDTH)
        return [`${value}px`, `${value}px`]

    return  [`${MIN_BUTTON_WIDTH}px`, `${MIN_BUTTON_WIDTH}px`]
}

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

export default class PokemonGameSelect extends HTMLElement {
    private _init:string|undefined;
    private _list:Dictionary<Game>;
    private _menu: Array<HTMLElement>;
    private _target: HTMLElement;

    constructor(){
        super();
        this._list = {};
        this._menu = [];
        this._target = _("div", {id: "pokemon-game-view"});

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

    static get observedAttributes(){
        return ["init", "data"]
    }

    private set data(value:string){
        this._list = JSON.parse(value);
        this._menu = [];

        const regions:Map<Region, HTMLElement> = new Map();

        for(let name in this._list){
            const region:Region = getRegion(this._list[name].region);
            const button = _("button", {target: name}, this._list[name].game);
    
            if(!regions.has(region)) {
                const {menuElement, regionList} = createMenuListElement(region);
                regions.set(region, regionList);
                this._menu.push(menuElement);
            }
                
            regions.get(region)!.appendChild(_("li", button));
        }

        this.display(this._init || "undefined");
    }

    private set init(value:string){
        this._init = value;
        this.display(value);
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "init"){
            this.init = newValue;
        } else if(name === "data"){
            this.data = atob(newValue);
        }
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
            this._target.appendChild(_("p", {class: "game-info"},
                `Generation: ${generation}`,
                _("br"),
                `Region: ${region}`
            ))
            this._target.appendChild( _("pokemon-team-select", {
                main: btoa(JSON.stringify(team)),
                other:btoa(JSON.stringify(others)),
                version:btoa(JSON.stringify(version)),
                game
            }));
        } else {
            this._target.appendChild(_("p", {class: "error"}, `Game '${name}' cannot be found!`));
        }
    }

    connectedCallback(){
        this.appendChild( _("nav", {class: "pokemon-game-select"},  _("ul", this._menu)) );
        this.appendChild( this._target );
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }
}

customElements.define("pokemon-game-select", PokemonGameSelect);