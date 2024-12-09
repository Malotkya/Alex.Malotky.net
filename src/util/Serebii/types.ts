/** /util/Serebii/types
 * 
 * @author Alex Malotky
 */

//Pokemon Element Types
export type Type = "Normal"|"Fire"|"Water"|"Grass"|"Flying"|"Fighting"|
                   "Poison"|"Electric"|"Ground"|"Rock"|"Psychic"|"Ice"|
                   "Bug"|"Ghost"|"Steel"|"Dragon"|"Dark"|"Fairy";

//Pokemon Regions
export type Region = "Kanto"|"Johto"|"Hoenn"|"Sinnoh"|"Unova"|"Kalos"|"Alola"|"Galar"|"Paldea"

//Pokemon Data
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

//Pokemon Move Data
export interface MoveData {
    name: string,
    type: Type,
    category: "status"|"special"|"physical",
    power?: number,
    accuracy: number,
    effect?: string
}

//Serebii Game Version Data
export interface GameVersion {
    normal: string,
    shiney?: string,
    override?:string
}

//Pokmeon Nature
export interface Nature {
    inc: string,
    dec: string
}