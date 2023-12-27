import PokemonElement, {PokemonType} from "./PokemonElement";
import { createElement as _ } from "../../../util/Elements";

export interface PokemonGameType {
    game: string,
    generation: number,
    region: string,
    team: Array<PokemonType>,
    others: Array<PokemonType>,
    comments: Array<string>|string
}

export default class PokemonGameElement extends HTMLElement {
    private _name:HTMLHeadElement;
    private _info:HTMLElement;
    private _comments: HTMLElement; 
    private _team: HTMLElement;
    private _others: HTMLElement|null;

    constructor(data:PokemonGameType){
        super();

        this._name = _("h3", {class: "game-name"}, data.game);
        this._info = _("p", {class: "game-info"}, `Generation: ${data.generation}<br/> Region: ${data.region}`);
        this._comments = _("p", {class: "game-comments"}, Array.isArray(data.comments)? data.comments.join(): data.comments);
        this._team = _("section", {id: "game-team"}, data.team.map(pokemon=>new PokemonElement(pokemon)));
        this._others = data.others.length === 0? null: _("section", {id: "game-others"}, data.others.map(pokemon=> new PokemonElement(pokemon)));
    }

    connectedCallback(){
        this.appendChild(this._name);
        this.appendChild(this._info);
        this.appendChild(this._team);
        if(this._others !== null)
            this.appendChild(this._others);
        this.appendChild(this._comments);
    }
}

customElements.define("pokemon-game-element", PokemonGameElement);