import PokemonElement, {PokemonType} from "./PokemonElement";
import PokemonTeamViewElement from "./PokemonTeamViewElement";
import { createElement as _ } from "../../../util/Elements";

export interface PokemonGameType {
    game: string,
    version: StringIndex,
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
    private _team: PokemonTeamViewElement;

    constructor(data:PokemonGameType){
        super();

        this._name = _("h3", {class: "game-name"}, data.game);
        this._info = _("p", {class: "game-info"}, `Generation: ${data.generation}<br/> Region: ${data.region}`);
        this._comments = _("p", {class: "game-comments"}, Array.isArray(data.comments)? data.comments.join(): data.comments);
        this._team = new PokemonTeamViewElement(
            data.team.map(pokemon=>new PokemonElement(pokemon, data.version, data.game)),
            data.others.map(pokemon=> new PokemonElement(pokemon, data.version, data.game))
        );
    }

    connectedCallback(){
        this.appendChild(this._name);
        this.appendChild(this._info);
        this.appendChild(this._team);
        this.appendChild(this._comments);
    }
}

customElements.define("pokemon-game-element", PokemonGameElement);