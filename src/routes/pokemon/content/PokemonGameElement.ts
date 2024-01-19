import PokemonElement from "./PokemonElement";
import PokemonTeamViewElement from "./PokemonTeamViewElement";
import { createElement as _ } from "../../../util/Elements";
import { Game } from "./PokemonTypes";

export default class PokemonGameElement extends HTMLElement {
    private _name:HTMLHeadElement;
    private _info:HTMLElement;
    private _team: PokemonTeamViewElement;

    constructor(data:Game){
        super();

        this._name = _("h3", {class: "game-name"}, data.game);
        this._info = _("p", {class: "game-info"}, `Generation: ${data.generation}<br/> Region: ${data.region}`);
        this._team = new PokemonTeamViewElement(
            data.team.map(pokemon=>new PokemonElement(pokemon, data.version, data.game)),
            data.others.map(pokemon=> new PokemonElement(pokemon, data.version, data.game))
        );
    }

    connectedCallback(){
        this.appendChild(this._name);
        this.appendChild(this._info);
        this.appendChild(this._team);
    }
}

customElements.define("pokemon-game-element", PokemonGameElement);