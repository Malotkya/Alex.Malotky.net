/** /util/Scryfall.ts
 * 
 * Interacts with Serebii Scrapped Information
 * 
 * @author Alex Malotky
 */
import Cache from "./Cache";
const API_URI = "https://poke.malotky.net";
const SEREBII_URI = "https://www.serebii.net/";

async function apiFetch<T>(uri:string):Promise<T> {
    const response = await fetch(API_URI+uri);

    if(!response.ok)
        throw new Error(await response.text());

    const ct = response.headers.get("Content-Type");
    if(ct === null || !ct.includes("json"))
        throw new Error("Did not recieve JSON response!");

    return await response.json();
}

export const CACHE_NAME = "Serebii";
export const CACHE_TTL  = 604800000;

export type Type = "Normal"|"Fire"|"Water"|"Grass"|"Flying"|"Fighting"|
                   "Poison"|"Electric"|"Ground"|"Rock"|"Psychic"|"Ice"|
                   "Bug"|"Ghost"|"Steel"|"Dragon"|"Dark"|"Fairy";

/** Is Type
 * 
 * @param {string} value
 * @returns {boolean}
*/
export function isType(value:string):value is Type {
    return value.match(/(bug|dark|dragon|electric|fairy|fighting|fire|flying|ghost|grass|ground|ice|normal|poison|psychic|rock|steel|water)/i) !== null;
}

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
export function getMoveData(name:string, gen:number):Promise<MoveData> {
    return apiFetch(`/Move/${gen}/${encodeURI(name)}`)
}

/** Pokemon API Data
 * 
 */
export interface PokemonData {
    number: number,
    name: string,
    types: Record<string, string[]>,
    versions: Record<string, string[]>,
    abilities: string[],
    moves: string[]
}

/** Get Pokemon API Data
 * 
 * @param {string} name 
 * @param {number} gen 
 * @returns {Promise<PokemonData>}
 */
export function getPokemonData(name:string, gen:number):Promise<PokemonData> {
    return apiFetch(`/Pokedex/${gen}/${encodeURI(name)}`)
}

/** Get Pokedex
 * 
 * @param {string} game 
 * @returns {Promise<string[]>}
 */
export async function getPokedex(game:string):Promise<string[]> {
    const key = `/Pokedex/${encodeURI(game)}`;
    const cache = new Cache(CACHE_NAME, CACHE_TTL);

    const store = await cache.get(key);
    if(store)
        return JSON.parse(store);

    const value:string[] = await apiFetch(key);
    await cache.set(key, JSON.stringify(value));

    return value;
}

/** Sprite API Data
 * 
 */
interface Sprite {
    normal:string,
    shiney?:string
    ext?: string //Default .png
}

/** Game API Data
 * 
 */
export interface GameData {
    name: string,
    sprite: Sprite,
    generation: number,
    region: string,
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

    //@ts-ignore
    env.info("Downloading Large Amount of Data!\nThis page may take a minute to load.");

    const list:GameData[] = await apiFetch("/Game");

    for(const game of list){
        game.pokedex = (await getPokedex(game.generation.toString())).sort();
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

    const value:string[] = await apiFetch("/Item")
    await cache.set("Item", JSON.stringify(value));

    return value;
}

/** Get Item API Data
 * 
 * @param {string} name 
 * @returns {Promise<string>}
 */
export async function getItemData(name:string):Promise<string> {
    return (await apiFetch<Item>(`/Item/${encodeURI(name)}`))["value"];
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

    const value:string[] = await apiFetch("/Ability")
    await cache.set("Ability", JSON.stringify(value));

    return value;
}

/** Get Ability API Data
 * 
 * @param {string} name 
 * @returns {Promise<string>}
 */
export async function getAbilityData(name:string):Promise<string> {
    return (await apiFetch<Item>(`/Ability/${encodeURI(name)}`))["value"];
}

/** Generate Sprite
 * 
 * @param {GameData} game 
 * @param {string} name - Pokemon
 * @param {string} number - Pokemon
 * @param {strimg} mod 
 * @param {boolean} s - Shiney
 * @param {boolean} g - Gender
 * @returns 
 */
export function generateSprite(game:GameData, name:string, number:number, mod?:string|null, s?:boolean|null, g?:boolean|null):[string, string]{
    const {ext = ".png", normal, shiney} = game.sprite;
    
    const string = number < 1000
        ? `00${number}`.slice(-3)
        : String(number);
    const gender = typeof g === "boolean"
        ? g ?"Male" :"Female"
        : "";
    
    const uri = game.generation < 2
        ? SEREBII_URI.concat(normal, `/${string}`, mod || "", ext)
        : SEREBII_URI.concat(s? shiney!: normal, `/${string}`, mod || "", ext);

    const alt = `${s? "Shiney ":""}${gender} ${name} ${game.name} Sprite`;

    return [uri, alt];
}