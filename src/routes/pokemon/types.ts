import { Pokemon, GameVersion, Type, Region, MoveData, Nature } from "@/util/Serebii/types";
export type {Pokemon, GameVersion, Type, Region, MoveData, Nature};

export interface Game {
    game: string,
    version?: GameVersion,
    generation: number,
    region: string,
    team: Array<Pokemon>,
    others: Array<Pokemon>,
}