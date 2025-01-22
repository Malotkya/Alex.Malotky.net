/** /routes/pokmeon/data/pokemon
 * 
 * @author Alex Malotky
 */
import {object, string, boolean, TypeOf, number, list, url, optional} from "zim-engine/Validation";

export const MoveObject = object({
    name: string(),
    type: string(),
    category: string(),
    power: number(),
    accuracy: number(),
    effect: string()
});

export type Move = TypeOf<typeof MoveObject>

export const PokemonObject = object({
    name: string(),
    level: number(),
    sprite: url(),
    sprite_text: string(),
    types: list(string()),
    moves: list(MoveObject),
    gender: optional(boolean()),
    shiney: optional(boolean()),
    modifiers: object({
        item: optional(string()),
        nature: optional(string()),
        ability: optional(string()),
        dynamax: optional(number()),
        gigantamax: optional(boolean()),
        terraType: optional(string())
    }),
    stats: object({
        attack: number(),
        defense: number(),
        speed: number(),
        health: number(),
        special: optional(number()),
        specialAttack: optional(number()),
        specialDefence: optional(number())
    })
})

type Pokemon = TypeOf<typeof PokemonObject>;
export default Pokemon;