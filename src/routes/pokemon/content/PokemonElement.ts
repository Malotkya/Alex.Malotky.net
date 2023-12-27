import { createElement as _ } from "../../../util/Elements";

export interface PokemonType {
    name: string,
    level: number,
    moves: Array<string>,
    types: Array<string>,
    item?: string,
    nature?: string,
    gender?: boolean, //true: ♂, false: ♀
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

function createGenerIcon(gender?:boolean): HTMLElement|null {
    if(gender === null || gender === undefined)
        return null;

    return _("span", {class: "pokemon-gender"}, gender? '♂': '♀');
}

export default class PokemonElement extends HTMLElement {
    private _name: HTMLElement;

    constructor(data:PokemonType){
        super();
        
        this._name = _("h4", {class: "pokemon-name"}, data.name);
    }

    connectedCallback(){
        this.appendChild(this._name);
    }
}

customElements.define("pokemon-element", PokemonElement);