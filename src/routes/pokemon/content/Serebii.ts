import { Pokemon, Nature } from "./PokemonTypes";

interface NatureIndex {
    [name:string]: Nature
}

const SEREBII_URI = "https://www.serebii.net/";
const MASTER_POKEMON_LIST: Array<string> = require("../../../../pokemon.json");
const MASTER_NATURE_INDEX: NatureIndex = {
    ADAMANT: {inc: "Attack",      dec: "Sp. Attack"},
    BASHFUL: {inc: "Sp. Attack",  dec: "Sp. Attack"},
    BOLD:    {inc: "Defense",     dec: "Attack"},
    BRAVE:   {inc: "Attack",      dec: "Speed"},
    CALM:    {inc: "Sp. Defence", dec: "Attack"},
    CAREFUL: {inc: "Sp. Defense", dec: "Sp. Attack"},
    DOCILE:  {inc: "Defense",     dec: "Defense"},
    GENTLE:  {inc: "Sp. Defense", dec: "Defense"},
    HARDY:   {inc: "Attack",      dec: "Attack"},
    HASTY:   {inc: "Speed",       dec: "Defense"},
    IMPISH:  {inc: "Defense",     dec: "Sp. Attack"},
    JOLLY:   {inc: "Speed",       dec: "Sp. Attack"},
    LAX:     {inc: "Defense",     dec: "Sp. Defense"},
    LONELY:  {inc: "Attack",      dec: "Defense"},
    MILD:    {inc: "Sp. Attack",  dec: "Defense"},
    MODEST:  {inc: "Sp. Attack",  dec: "Attack"},
    NAIVE:   {inc: "Speed",       dec: "Sp. Defense"},
    NAUGHTY: {inc: "Attack",      dec: "Sp. Defense"},
    QUIET:   {inc: "Sp. Attack",  dec: "Speed"},
    QUIRKY:  {inc: "Sp. Defence", dec: "Sp. Defense"},
    RASH:    {inc: "Sp. Attack",  dec: "Sp. Defense"},
    RELAXED: {inc: "Defense",     dec: "Speed"},
    SASSY:   {inc: "Sp. Defence", dec: "Speed"},
    SERIOUS: {inc: "Speed",       dec: "Speed"},
    TIMID:   {inc: "Speed",       dec: "Attack"},
}

/** Get Pokemon Number from Name
 * 
 * @param {string} name 
 * @returns {number}
 */
function getNumber(name:string):number{
    return MASTER_POKEMON_LIST.indexOf(name) + 1;
}

export function getNature(name:string = ""):Nature {
    const temp:Nature = MASTER_NATURE_INDEX[name.toUpperCase()];
    if(temp)
        return temp;

    return {inc: "", dec: ""};
}

/** Format Image URI
 * 
 * @param {Pokemon} pokemon - Pokemon Information
 * @param {StringIndex} version - Game Version Information
 * @returns {string}
 */
export function formatURI(pokemon:Pokemon, version:StringIndex = {}):string {
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