/** /util/Scryfall.ts
 * 
 * Interacts with shards created by "npm run scryfall"
 * 
 * @author Alex Malotky
 */
import Cache from "./Cache";
const URI = "https://cards.malotky.net/";

export const CACHE_NAME = "Scryfall";
export const CACHE_TTL  = 604800000;

/** Scryfall Card
 * 
 * Information of a card from scryfall.
 */
export interface ScryfallCard{
    name: string,
    manaCost: string,
    manaValue: number,
    typeLine: string, 
    oracle: string,
    art: Record<string, string>,
    identity: Array<string>,
    sets: Record<string, Array<string>>
}

/** Query For Card
 * 
 * @param {string} name 
 * @returns {Promise<Card>} card
 */
export async function queryForCard(name:string):Promise<ScryfallCard|null>{
    let shardName = "?";

    const match = name.match(/[a-zA-Z0-9_]/);
    if(match)
        shardName = match[0].toUpperCase();

    const shard = await getShard(shardName);

    if(shard === null)
        return null;

    const index = name.indexOf("[");
    if(index > -1){
        name = name.substring(0, index);
    }

    const lines = shard.split("\n");
    const names = shard.match(/(?<="name":").*?(?=")/gm);

    if(names === null)
        throw new Error(`Shard '${shardName}' is malformed!`);

    for(let i=0; i<names.length; i++){
        if(compareNames(names[i], name) === 0){
            return JSON.parse(lines[i].trim());
        }
    }

    return null;
}

/** Compare Names
 * 
 * Ignores everything that isnt a number or letter
 * and ignores case.
 * 
 * @param {string} lhs 
 * @param {string} rhs 
 * @returns {number}
 */
function compareNames(lhs:string, rhs:string):number{
    lhs = lhs.replace(/[^a-zA-Z0-9]/gm, "").toLowerCase();
    rhs = rhs.replace(/[^a-zA-Z0-9]/gm, "").toLowerCase();

    return lhs.localeCompare(rhs);
}

/** Get Shard
 * 
 * @param {string} shard 
 * @returns {string}
 */
export async function getShard(shard:string):Promise<string>{
    if(shard.length > 1)
        shard = shard.substring(0, 1);

    const cache = new Cache(CACHE_NAME, CACHE_TTL);

    const storedValue = await cache.get(shard);
    if(storedValue)
        return storedValue;

    const file = await fetchShard(shard);
    await cache.set(shard, file);

    await cache.close();
    
    return file;
}

export async function fetchShard(shard:string):Promise<string> {
    const response = await fetch(URI+shard);

    if(response.status !== 200)
        throw new Error("Unable to load file: " + response.statusText);

    const fileText = await response.text();

    if(fileText.match("<!DOCTYPE html>"))
        throw new Error("Unable to find Shard!");

    return fileText;
}

