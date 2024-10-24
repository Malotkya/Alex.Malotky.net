export type Type = "Normal"|"Fire"|"Water"|"Grass"|"Flying"|"Fighting"|
                   "Poison"|"Electric"|"Ground"|"Rock"|"Psychic"|"Ice"|
                   "Bug"|"Ghost"|"Steel"|"Dragon"|"Dark"|"Fairy";

export type Region = "Kanto"|"Johto"|"Hoenn"|"Sinnoh"|"Unova"|"Kalos"|"Alola"|"Galar"|"Paldea"

export interface Pokemon {
    name: string,
    modifier?: string,
    level: number,
    moves: Array<string|MoveData>,
    types: Array<Type>,
    terraType?: Type|"Steller",
    item?: string,
    nature?: string,
    ability?: string,
    gender?: boolean, //true: ♂, false: ♀
    shiney?:boolean,
    dynamax?:number,
    gigantamax?:boolean,
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

export interface GameVersion {
    normal: string,
    shiney?: string,
    override?:string
}

export interface Nature {
    inc: string,
    dec: string
}