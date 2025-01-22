/** /util/Scryfall.ts
 * 
 * Interacts with Serebii Scrapped Information
 * 
 * @author Alex Malotky
 */
import Cache from "./Cache";
const URI = "https://poke.malotky.net";

export const CACHE_NAME = "Serebii";
export const CACHE_TTL  = 604800000;

export type Type = "Normal"|"Fire"|"Water"|"Grass"|"Flying"|"Fighting"|
                   "Poison"|"Electric"|"Ground"|"Rock"|"Psychic"|"Ice"|
                   "Bug"|"Ghost"|"Steel"|"Dragon"|"Dark"|"Fairy";

/** Move API Data
 * 
 */
export interface MoveData {
    name:string,
    type: Type,
    category: "status"|"special"|"physical",
    pp: number,
    power: number,
    accuracy: number,
    effect: string
}

/** Get Move API Data
 * 
 * @param {string} name 
 * @param {number} gen 
 * @returns {Promise<MoveData>}
 */
export async function getMoveData(name:string, gen:number):Promise<MoveData> {
    const response = await fetch(`${URI}/Move/${gen}/${encodeURI(name)}`);

    if(!response.ok)
        throw new Error(await response.text());

    return response.json(); 
}

/** Pokemon API Data
 * 
 */
export interface PokemonData {
    name: string,
    types: string[],
    versions: string[],
    abilities: string[],
    moves: string[]
}

/** Get Pokemon API Data
 * 
 * @param {string} name 
 * @param {number} gen 
 * @returns {Promise<PokemonData>}
 */
export async function getPokemonData(name:string, gen:number):Promise<PokemonData> {
    const response = await fetch(`${URI}/Pokedex/${gen}/${encodeURI(name)}`);

    if(!response.ok)
        throw new Error(await response.text());

    return response.json();
}

/** Get Pokedex
 * 
 * @param {string} game 
 * @returns {Promise<string[]>}
 */
export async function getPokedex(game:string):Promise<string[]> {
    const response = await fetch(`${URI}/Pokedex/${encodeURI(game)}`);

    if(!response.ok)
        throw new Error(await response.text());

    return response.json();
}

/** Game API Data
 * 
 */
export interface GameData {
    name: string,
    sprites: {
        normal: string,
        shiney?: string
    },
    generation: number,
    modifiers: Record<string, "string"|"number"|"boolean">,
    pokedex: string[]
}

/** Get ALl Game API Data
 * 
 * Uses Cache for quicker load times.
 * 
 * @returns {Promise<GameData[]>}
 */
export async function getAllGameData():Promise<GameData[]> {
    const cache = new Cache(CACHE_NAME, CACHE_TTL);

    const store = await cache.get("Games");
    if(store) {
        return JSON.parse(store);
    }

    const response = await fetch(`${URI}/Game`);

    if(!response.ok)
        throw new Error(await response.text());

    const list:GameData[] = await response.json();

    for(const game of list){
        game.pokedex = await getPokedex(game.name);
    }

    await cache.set("Games", JSON.stringify(list));
    return list;
}

/** Item API Data
 * 
 * Also use for Abbilities
 */
interface Item{
    name:string, 
    value:string
}

/** Get All Items
 * 
 * @returns {Promise<string[]>}
 */
export async function getAllItems():Promise<string[]> {
    const cache = new Cache(CACHE_NAME, CACHE_TTL);

    const store = await cache.get("Items");
    if(store) {
        return JSON.parse(store);
    }

    const response = await fetch(`${URI}/Item`);

    if(!response.ok)
        throw new Error(await response.text());

    const value:string[] = await response.json();

    await cache.set("Item", JSON.stringify(value));

    return value;
}

/** Get Item API Data
 * 
 * @param {string} name 
 * @returns {Promise<string>}
 */
export async function getItemData(name:string):Promise<string> {
    const response = await fetch(`${URI}/Item/${encodeURI(name)}`);

    if(!response.ok)
        throw new Error(await response.text());

    return (<Item>await response.json())["value"];
}

/** Get All Abilities
 * 
 * @returns {Promise<string[]>}
 */
export async function getAllAbilities():Promise<string[]> {
    const cache = new Cache(CACHE_NAME, CACHE_TTL);

    const store = await cache.get("Ability");
    if(store) {
        return JSON.parse(store);
    }

    const response = await fetch(`${URI}/Ability`);

    if(!response.ok)
        throw new Error(await response.text());

    const value:string[] = await response.json();

    await cache.set("Ability", JSON.stringify(value));

    return value;
}

/** Get Ability API Data
 * 
 * @param {string} name 
 * @returns {Promise<string>}
 */
export async function getAbilityData(name:string):Promise<string> {
    const response = await fetch(`${URI}/Ability/${encodeURI(name)}`);

    if(!response.ok)
        throw new Error(await response.text());

    return (<Item>await response.json())["value"];
}