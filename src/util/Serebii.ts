/** /util/Scryfall.ts
 * 
 * Interacts with Serebii Scrapped Information
 * 
 * @author Alex Malotky
 */
import Cache from "./Cache";

const API_URI = "https://poke.malotky.net";
const SEREBII_URI = "https://www.serebii.net/";
const CACHE_NAME = "Serebii";
const CACHE_TTL  = 604800000;

/** API Fetch
 * 
 * @param {string} uri 
 * @returns {any}
 */
async function apiFetch<T>(uri:string):Promise<T> {
    const response = await fetch(API_URI+uri);

    if(!response.ok)
        throw new Error(await response.text());

    const ct = response.headers.get("Content-Type");
    if(ct === null || !ct.includes("json"))
        throw new Error("Did not recieve JSON response!");

    return await response.json();
}

export const AllTypes = [
    "Bug",
    "Dark",
    "Dragon",
    "Electric",
    "Fairy",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Steel",
    "Water"
  ] as const;
export type Type = typeof AllTypes[number];

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
    gendered: boolean,
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
export async function getItemData(name:string):Promise<Item> {
    return (await apiFetch<Item>(`/Item/${encodeURI(name)}`));
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
export async function getAbilityData(name:string):Promise<Item> {
    return (await apiFetch<Item>(`/Ability/${encodeURI(name)}`));
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
export function generateSprite(game:GameData, name:string, number:number, gendered: boolean, mod?:string|null, s?:boolean|null, g?:boolean|null):[string, string]{
    const {ext = ".png", normal, shiney} = game.sprite;
    
    const string = number < 1000
        ? `00${number}`.slice(-3)
        : String(number);
    const gender = typeof g === "boolean"
        ? g ?"Male" :"Female"
        : "";

    const modifier = mod || (gendered
        ? typeof g === "boolean"
            ? g ? "": "-f"
            : ""
        : "");
    
    const uri = game.generation < 2
        ? SEREBII_URI.concat(normal, `/${string}`, modifier, ext)
        : SEREBII_URI.concat(s? shiney!: normal, `/${string}`, modifier, ext);

    const alt = `${s? "Shiney ":""}${gender} ${name} ${game.name} Sprite`;

    return [uri, alt];
}

//Regions used for Navigation
const KNOWN_REGIONS = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Alola",
    "Galar",
    "Paldea"
] as const;
export type Region = typeof KNOWN_REGIONS[number];

//Possible Sub Regions
const REGION_INDEX:Record<Region, string[]> = {
    "Kanto":  ["Kanto"],
    "Johto":  ["Johto", "Kanto"],
    "Hoenn":  ["Hoenn"],
    "Sinnoh": ["Sinnoh", "Hisui"],
    "Unova":  ["Unova"],
    "Kalos":  ["Kalos"],
    "Alola":  ["Alola"],
    "Galar":  ["Galar", "Isle of Armor", "Crown Tundra"],
    "Paldea": ["Paldea", "Kitakami", "Blueberry"]
}

/** Get Pokemon Region
* 
* @param {string} string 
* @returns {Region}
*/
export function getRegion(string:string):Region|"Unknown" {
    string = string.toLocaleLowerCase();

    for(let region in REGION_INDEX ) {
        const list = REGION_INDEX[<Region>region];

        let value:string = list[0].toLocaleLowerCase();
        if(value === string)
            return <Region>region;

        for(let i=1; i<list.length; i++){
            const line = list[i].toLocaleLowerCase();
            if(line === string)
                return <Region>region;

            value += "/"+line;
            if(value === string)
                return <Region>region;
        }
    }

   return "Unknown";
}

/** Sort Regions
 * 
 * @param {string} a 
 * @param {string} b 
 * @returns {number}
 */
export function sortRegions(a:string, b:string):number {
    if(a === b)
        return 0;

    let lhs = KNOWN_REGIONS.indexOf(<any>a);
    let rhs = KNOWN_REGIONS.indexOf(<any>b);

    if(lhs === -1)
        lhs = KNOWN_REGIONS.length;
    if(lhs === -1)
        rhs = KNOWN_REGIONS.length;

    return lhs - rhs;
}

/** Nature 
 * 
 */
export interface Nature {
    inc: string,
    dec: string
}

export const AllNatures = [
    "Adamant",
    "Bashful",
    "Bold",
    "Brave",
    "Calm",
    "Careful",
    "Docile",
    "Gentle",
    "Hardy",
    "Hasty",
    "Impish",
    "Jolly",
    "Lax",
    "Lonely",
    "Mild",
    "Modest",
    "Naive",
    "Naughty",
    "Quiet",
    "Quirky",
    "Rash",
    "Relaxed",
    "Sassy",
    "Serious",
    "Timid"
  ];

export const NatureMap:Record<string, Nature> = {
    "bashful": {inc: "attack",  dec: "attack"},
    "lonely":  {inc: "attack",  dec: "defence"},
    "adamant": {inc: "attack",  dec: "sepcialAttack"},
    "naughty": {inc: "attack",  dec: "sepcialDefence"},
    "brave":   {inc: "attack",  dec: "speed"},
    "bold":    {inc: "defence", dec: "attack"},
    "docile":  {inc: "defence", dec: "defence"},
    "impish":  {inc: "defence", dec: "sepcialAttack"},
    "lax":     {inc: "defence", dec: "sepcialDefence"},
    "relaxed": {inc: "defence", dec: "speed"},
    "modest":  {inc: "specialAttack",  dec: "attack"},
    "mild":    {inc: "specialAttack",  dec: "defence"},
    "hardy":   {inc: "specialAttack",  dec: "sepcialAttack"},
    "rash":    {inc: "specialAttack",  dec: "sepcialDefence"},
    "quiet":   {inc: "specialAttack",  dec: "speed"},
    "calm":    {inc: "specialDefence", dec: "attack"},
    "gentle":  {inc: "specialDefence", dec: "defence"},
    "careful": {inc: "specialDefence", dec: "sepcialAttack"},
    "quirky":  {inc: "specialDefence", dec: "sepcialDefence"},
    "sassy":   {inc: "specialDefence", dec: "speed"},
    "timid":   {inc: "speed", dec: "attack"},
    "hasty":   {inc: "speed", dec: "defence"},
    "jolly":   {inc: "speed", dec: "sepcialAttack"},
    "naive":   {inc: "speed", dec: "sepcialDefence"},
    "serious": {inc: "speed", dec: "speed"},
}

/** Nature To String
 * 
 * @param {Nature} nature 
 * @returns {string}
 */
export function natureToString(nature:Nature):string {
    const fix = (s:string):string =>(s.charAt(0).toUpperCase() + s.substring(1)).replace(/special/i, "Sp. ");
    
    if(nature.inc === nature.dec)
        return "Does nothing to adjust stats.";
    
    return `Increases ${fix(nature.inc)}.\nDecreases ${fix(nature.dec)}.`;
}