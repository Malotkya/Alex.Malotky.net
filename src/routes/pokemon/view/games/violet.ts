import { Game } from "../PokemonTypes";

export const violet:Game = {
    game: "Violet",
    generation: 9,
    region: "Paldea",
    version: {
        normal: "scarletviolet/pokemon/new",
        shiney: "Shiny/SV/new"
    },
    team: [
        {   name: "Meowscarada",
            level: 100,
            gender: true,
            types:[
                "Grass",
                "Dark"
            ],
            terraType: "Grass",
            item: "Metronome",
            nature: "Naughty",
            ability: "Overgrow",
            stats:{
                health: 315,
                attack: 281,
                defense: 174,
                specialAttack: 237,
                specialDefence: 147,
                speed: 312
            },
            moves: [
                "Flower Trick",
                "Night Slash",
                "Play Rough",
                "Hone Claws"
            ]
            
        },
        {   name: "Gardevoir",
            level: 100,
            gender: false,
            types:[
                "Psychic",
                "Fairy"
            ],
            terraType: "Fairy",
            item: "Wise Glasses",
            nature: "Timid",
            ability: "Trace",
            stats:{
                health: 289,
                attack: 174,
                defense: 155,
                specialAttack: 300,
                specialDefence: 265,
                speed: 224
            },
            moves: [
                "Moonblast",
                "Psychic",
                "Focus Blast",
                "Shadow Ball"
            ]
        },
        {   name: "Ceruledge",
            level: 100,
            gender: false,
            types:[
                "Fire",
                "Ghost"
            ],
            terraType: "Fire",
            item: "Muscle Band",
            nature: "Naughty",
            ability: "Flash Fire",
            stats:{
                health: 281,
                attack: 330,
                defense: 177,
                specialAttack: 135,
                specialDefence: 227,
                speed: 206
            },
            moves: [ 
                "Bitter Blade",
                "Poison Jab",
                "Shadow Claw",
                "X-Scissor"
            ]
        },
        {   name: "Kilowattrel",
            level: 100,
            gender: false,
            types:[
                "Electric",
                "Flying"
            ],
            terraType: "Flying",
            item: "Quick Claw",
            nature: "Modest",
            ability: "WInd Power",
            stats:{
                health: 300,
                attack: 163,
                defense: 137,
                specialAttack: 297,
                specialDefence: 174,
                speed: 281
            },
            moves: [
                "THunderbolt",
                "Brave Bird",
                "Volt Switch",
                "Thunder Wave"
            ]
        },
        {   name: "Garchomp",
            level: 100,
            types:[
                "Dragon",
                "Ground"
            ],
            terraType: "Ground",
            item: "Soft Sand",
            nature: "Adamant",
            ability: "Rough Skin",
            stats:{
                health: 360,
                attack: 361,
                defense: 206,
                specialAttack: 188,
                specialDefence: 194,
                speed: 259
            },
            moves: [
                "Swords Dance",
                "Dragon Claw",
                "Earthquake",
                "Sandstorm"
            ]
        },
        {   name: "Vaporeon",
            level: 100,
            gender: true,
            types:[
                "Water"
            ],
            terraType: "Ice",
            item: "Quick Claw",
            nature: "Modest",
            ability: "Water Absorb",
            stats:{
                health: 418,
                attack: 168,
                defense: 160,
                specialAttack: 298,
                specialDefence: 242,
                speed: 181
            },
            moves: [
                "Surf",
                "Ice Beam",
                "Swift",
                "Calm Mind"
            ]
        }
    ],
    others: []
}