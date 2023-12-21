export interface PokemonType {
    name: string,
    level: number,
    moves: Array<string>,
    types: Array<string>,
    item?: string,
    nature?: string,
    stats: {
        attack: number,
        defence: number,
        speed:number,
        health: number,
        special?:number,
        specialAttack?: number,
        specialDefence?: number
    }
}

export default class PokemonElement extends HTMLElement {
    private _name:string;

    constructor(data:PokemonType){
        super();
        
        this._name = data.name;
        console.log(data);
    }

    connectedCallback(){
        this.innerText = this._name;
    }
}

customElements.define("pokemon-element", PokemonElement);