import { createElement as _ } from "../../../util/Element";
import PokemonTile from "./PokemonTile";
import { Pokemon, GameVersion } from "../types";

/** Pokemon-Team-View
 * 
 */
export default class PokemonTeamSelect extends HTMLElement {
    private _game:string|undefined;
    private _version:GameVersion|undefined;
    private _main: Array<Pokemon>;
    private _other: Array<Pokemon>;
    //@ts-ignore
    private _select: HTMLElement;
    private _view: HTMLElement;

    constructor(main: Array<Pokemon>, other: Array<Pokemon> = [], version?:GameVersion, game?:string){
        super()
        this._main = [];
        this._other = [];

        this._view = _("section", {class: "pokemon-view"});
        this.makeSelect();

        this.addEventListener("click", (event:Event)=>{
            const eventTarget:string|null = (event.target as HTMLElement).getAttribute("target");

            if(eventTarget){
                event.stopPropagation();
                this._view.innerHTML = "";

                for(let e of this.getView(eventTarget))
                    this._view.appendChild(e);
            }
        });
    }

    static get observedAttributes(){
        return ["main", "other", "version", "game"]
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "main") {
            this.main = atob(newValue);
        } else if(name === "other") {
            this.other = atob(newValue);
        } else if(name === "version") {
            this.version = atob(newValue);
        } else if(name === "game"){
            this.game = newValue;
        }
    }

    private set game(value:string){
        this._game = value;
        this.makeSelect();
    }

    private set version(value:string){
        this._version = JSON.parse(value);
        this.makeSelect();
    }

    private set other(value:string){
        this._other = JSON.parse(value);
        this.makeSelect();
    }

    private set main(value:string){
        this._main = JSON.parse(value);
        this.makeSelect();
    }

    private makeSelect(){
        this._select = _("nav", {class: "pokemon-select"}, 
            this._main.length === 0?  null: _("button", {class: "pokemon-button", target: "main"},  "Main Pokemon"),
            this._other.length === 0? null: _("button", {class: "pokemon-button", target: "other"}, "Other Pokemon")
        );

        this._view.innerHTML = "";
        for(let e of this.initView())
            this._view.appendChild(e);
    }

    private getView(name:string):Array<HTMLElement>{
        switch(name){
            case "main":
                return this._main.map(p=>PokemonTile(p, this._version, this._game));

            case "other":
                return this._other.map(p=>PokemonTile(p, this._version, this._game));

            default:
                return [_("p", {class:"Error"}, `Unable to find target '${name}'!`)];
        }
    }

    private initView():Array<HTMLElement> {
        if(this._main.length > 0){
            return this.getView("main");
        } else if(this._other.length > 0) {
            return this.getView("other");
        }
        return [
            _("p", {class:"Error"}, `No pokemon to view!`)
        ]
    }

    connectedCallback(){
        this.appendChild(this._select);
        this.appendChild(this._view);
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }
}

customElements.define("pokemon-team-select", PokemonTeamSelect);