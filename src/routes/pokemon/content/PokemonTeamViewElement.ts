import { createElement as _, Content } from "../../../util/Elements";
import PokemonElement from "./PokemonElement";

/** Pokemon-Team-View
 * 
 */
export default class PokemonTeamViewElement extends HTMLElement {
    private _main: Array<Content>;
    private _other: Array<Content>;
    private _select: HTMLElement;
    private _view: HTMLElement;

    constructor(main: Array<Content>, other: Array<Content> = []){
        super()
        this._main = main;
        this._other = other;

        this._select = _("nav", {class: "pokemon-select"}, 
            _("button", {class: "pokemon-button", target: "main"}, "Main Pokemon"),
            other.length === 0? null:  _("button", {class: "pokemon-button", target: "other"}, "Other Pokemon")
        );
        this._view = _("section", {class: "pokemon-view"}, this._main);

        this.addEventListener("click", (event:Event)=>{
            const eventTarget:string|null = (event.target as HTMLElement).getAttribute("target");

            if(eventTarget){
                event.stopPropagation();
                this._view.innerHTML = "";

                if(eventTarget === "main") {
                    for(let e of this._main)
                        this._view.appendChild(e as HTMLElement);
                } else if (eventTarget === "other") {
                    for(let e of this._other)
                        this._view.appendChild(e as HTMLElement);
                } else {
                    console.warn(`Unknown event target '${eventTarget}'!`);
                }
            }
        })
    }

    connectedCallback(){
        this.appendChild(this._select);
        this.appendChild(this._view);
    }
}

customElements.define("pokemon-team-view", PokemonTeamViewElement);