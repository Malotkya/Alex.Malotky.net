import PokemonElement, {PokemonType} from "./PokemonElement";

export interface PokemonGameType {
    game: string,
    generation: number,
    region: string,
    team: Array<PokemonType>,
    others: Array<PokemonType>,
    comments: string
}

export default class PokemonGameElement extends HTMLElement {
    private _name:HTMLHeadElement;
    private _pokemon: Array<PokemonElement>;

    constructor(data:PokemonGameType){
        super();

        this._name = document.createElement("h3");
        this._name.textContent = data.game;

        this._pokemon = data.team.map(pokemon=>new PokemonElement(pokemon));
    }

    connectedCallback(){
        this.appendChild(this._name);
        for(const p of this._pokemon){
            this.appendChild(p);
        }
    }
}

customElements.define("pokemon-game-element", PokemonGameElement);