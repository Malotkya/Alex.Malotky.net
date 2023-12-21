import PokemonGameElement from "./content/PokemonGameElement";

export const content:Array<PokemonGameElement> = [
    new PokemonGameElement(require("./games/yellow.json")),
    new PokemonGameElement(require("./games/crystal.json")),
    new PokemonGameElement(require("./games/ruby.json"))
];