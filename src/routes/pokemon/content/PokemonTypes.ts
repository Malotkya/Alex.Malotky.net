export type Type = "Normal"|"Fire"|"Water"|"Grass"|"Flying"|"Fighting"|
                   "Poison"|"Electric"|"Ground"|"Rock"|"Psychic"|"Ice"|
                   "Bug"|"Ghost"|"Steel"|"Dragon"|"Dark"|"Fairy";

export interface Pokemon {
    name: string,
    modifier?: string,
    number: number,
    level: number,
    moves: Array<string|MoveData>,
    types: Array<Type>,
    terraType: Type,
    item?: string,
    nature?: string,
    ability?: string,
    gender?: boolean, //true: ♂, false: ♀
    shiney?:boolean,
    stats: {
        attack: number,
        defense: number,
        speed:number,
        health: number,
        special?:number,
        specialAttack?: number,
        specialDefence?: number
    }
}

export interface MoveData {
    name: string,
    type: Type,
    category: "status"|"special"|"physical",
    power?: number,
    accuracy: number,
    effect?: string
}

export interface Game {
    game: string,
    version?: StringIndex,
    generation: number,
    region: string,
    team: Array<Pokemon>,
    others: Array<Pokemon>,
}

export interface Nature {
    inc: string,
    dec: string
}