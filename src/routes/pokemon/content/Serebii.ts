import { Pokemon, GameVersion } from "./PokemonTypes";
import {MASTER_POKEMON_LIST} from "../data"

const SEREBII_URI = "https://www.serebii.net/";

/** Get Pokemon Number from Name
 * 
 * @param {string} name 
 * @returns {number}
 */
function getNumber(name:string):number{
    return MASTER_POKEMON_LIST.indexOf(name) + 1;
}

/** Format Image URI
 * 
 * @param {Pokemon} pokemon - Pokemon Information
 * @param {StringIndex} version - Game Version Information
 * @returns {string}
 */
export function formatURI(pokemon:Pokemon, version?:GameVersion):string {
    const {
        normal = "pokemon/art/",
        shiney = "pokemon/art/",
        override = ".png"
    } = version;

    let number:number|string = getNumber(pokemon.name);
    if(number < 1000){
        number = `00${number}`.slice(-3);
    }

    return SEREBII_URI.concat(
        pokemon.shiney? shiney: normal,
        `/${number}`,
        pokemon.modifier || "",
        override
    );
}