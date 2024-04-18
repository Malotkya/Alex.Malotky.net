import { Game } from "../PokemonTypes";

export const diamond:Game = {
    game: "Brilliant Diamond",
    generation: 8,
    region: "Sinnoh",
    version: {
        normal: "swordshield/pokemon",
        shiney: "Shiny/SWSH"
    },
    team: [
        {   name: "Infernape",
            level: 62,
            gender: true,
            types:[
                "Fire",
                "Fighting"
            ],
            item: "",
            nature: "Impish",
            ability: "Blaze",
            stats:{
                health: 191,
                attack: 163,
                defense: 114,
                specialAttack: 135,
                specialDefence: 106,
                speed: 169
            },
            moves: [
                {   name:  "Acrobatics",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 55,
                    effect: "Power is doubled if user is not holding an item."
                },
                {   name:  "Flame Wheel",
                    type: "Fire",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "10% chance of burinning opponent."
                },
                {   name:  "Close Combat",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "Lowers the user's Defense and Sp. Defense by one stage."
                },
                {   name:  "Shadow Claw",
                    type: "Ghost",
                    category: "physical",
                    accuracy: 100,
                    power: 70
                }
            ]
            
        },
        {   name: "Luxray",
            level: 62,
            gender: true,
            types:[
                "Electric"
            ],
            item: "Deep Sea Scale",
            nature: "Mild",
            ability: "Intimidate",
            stats:{
                health: 189,
                attack: 184,
                defense: 106,
                specialAttack: 159,
                specialDefence: 118,
                speed: 119
            },
            moves: [
                {   name:  "Shock Wave",
                    type: "Electric",
                    category: "special",
                    accuracy: 0,
                    power: 60,
                    effect: "Does not miss."
                },
                {   name:  "Crunch",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "30% chance to lower opponent's Defence."
                },
                {   name:  "Spark",
                    type: "Electric",
                    category: "physical",
                    accuracy: 100,
                    power: 65,
                    effect: "30% chance of paralyzing opponent."
                },
                {   name:  "Thunder Wave",
                    type: "Electric",
                    category: "status",
                    accuracy: 100,
                    effect: "Paralyzes opponent."
                },
            ]
        },
        {   name: "Gyarados",
            level: 63,
            gender: false,
            types:[
                "Water",
                "Flying"
            ],
            item: "Quick Claw",
            nature: "Hasty",
            ability: "Intimidate",
            stats:{
                health: 205,
                attack: 190,
                defense: 116,
                specialAttack: 102,
                specialDefence: 145,
                speed: 149
            },
            moves: [ 
                {   name:  "Waterfall",
                    type: "Water",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "30% chance to flinch opponent."
                },
                {   name:  "Ice Fang",
                    type: "Ice",
                    category: "physical",
                    accuracy: 95,
                    power: 65,
                    effect: "10% chance to flinch and/or freeze opponent."
                },
                {   name:  "Crunch",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "30% chance to lower opponent's Defence."
                },
                {   name:  "Dragon Dance",
                    type: "Dragon",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises the user's Attack and Speed by one stage each."
                }
            ]
        },
        {   name: "Roserade",
            level: 62,
            gender: true,
            types:[
                "Grass",
                "Poison"
            ],
            item: "Big Root",
            nature: "Bold",
            ability: "Poison Point",
            stats:{
                health: 169,
                attack: 99,
                defense: 112,
                specialAttack: 181,
                specialDefence: 143,
                speed: 151
            },
            moves: [
                {   name:  "Giga Drain",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 75,
                    effect: "User recovers 50% of damage delt to target."
                },
                {   name:  "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 90,
                    effect: "Badly poisons opponent."
                },
                {   name:  "Petal Blizzard",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                },
                {   name:  "Sludge Bomb",
                    type: "Poison",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "30% chance to poison target."
                }
            ]
        },
        {   name: "Jirachi",
            level: 63,
            types:[
                "Steel",
                "Psychic"
            ],
            item: "Shell Bell",
            nature: "Naive",
            ability: "Serene Grace",
            stats:{
                health: 227,
                attack: 161,
                defense: 144,
                specialAttack: 167,
                specialDefence: 131,
                speed: 190
            },
            moves: [
                {   name:  "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name:  "Flash Cannon",
                    type: "Steel",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name:  "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of paralyzing target."
                },
                {   name:  "Dazzling Gleam",
                    type: "Fairy",
                    category: "special",
                    accuracy: 100,
                    power: 80
                }
            ]
        },
        {   name: "Garchomp",
            level: 62,
            gender: false,
            types:[
                "Dragon",
                "Ground"
            ],
            item: "Soft Sand",
            nature: "Rash",
            ability: "Sand Veil",
            stats:{
                health: 230,
                attack: 180,
                defense: 145,
                specialAttack: 134,
                specialDefence: 125,
                speed: 168
            },
            moves: [
                {   name:  "Bulldoze",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "Lowers opponent's speed."
                },
                {   name:  "Sandstorm",
                    type: "Ground",
                    category: "status",
                    accuracy: 0,
                    effect: "Creates a sandstorm for 5 turns."
                },
                {   name:  "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if opponent is underground."
                },
                {   name:  "Dragon Claw",
                    type: "Dragon",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                }
            ]
        }
    ],
    others: []
}