import { Game } from "../content/PokemonTypes";

export const white:Game = {
    game: "White",
    generation: 5,
    version: {
        normal: "blackwhite/pokemon",
        shiney: "Shiny/BW"
    },
    region: "Unova",
    team: [
        {   name: "Samurott",
            level: 50,
            gender: true,
            types:[
                "Water"
            ],
            item: "Quick Claw",
            nature: "Modest",
            ability: "Torrent",
            stats:{
                health: 158,
                attack: 113,
                defense: 95,
                specialAttack: 141,
                specialDefence: 84,
                speed: 82
            },
            moves: [
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 95
                },
                {   name: "Focus Energy",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Increases critical hit ratio."
                },
                {   name: "Megahorn",
                    type: "Bug",
                    category: "physical",
                    accuracy: 85,
                    power: 120
                },
                {   name: "Grass Knot",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 0,
                    effect: "Inflicts greater damage on heavier opponents."
                }
            ]
            
        },
        {   name: "Lilligant",
            gender: false,
            level: 52,
            types:[
                "Grass"
            ],
            item: "Miracle Seed",
            nature: "Naughty",
            ability: "Own Tempo",
            stats:{
                health: 147,
                attack: 101,
                defense: 91,
                specialAttack: 133,
                specialDefence: 81,
                speed: 120
            },
            moves: [
                {   name: "Quiver Dance",
                    type: "Bug",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises the user's Special Attack, Special Defense and Speed by one stage."
                },
                {   name: "Petal Dance",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 120,
                    effect: "Attacks for 2-3 turns, then becomes confused."
                },
                {   name: "Sleep Powder",
                    type: "Grass",
                    category: "status",
                    accuracy: 75,
                    effect: "Puts opponent to sleep."
                },
                {   name: "Hidden Power",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 60
                }
            ]
        },
        {   name: "Victini",
            level: 50,
            types:[
                "Psychic",
                "Fire"
            ],
            item: "",
            nature: "Modest",
            ability: "Victory Star",
            stats:{
                health: 170,
                attack: 104,
                defense: 112,
                specialAttack: 133,
                specialDefence: 115,
                speed: 119
            },
            moves: [ 
                {   name: "Zen Headbutt",
                    type: "Psychic",
                    category: "physical",
                    accuracy: 90,
                    power: 80,
                    effect: "20% chance of causing the target to flinch."
                },
                {   name: "Searing Shot",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 100,
                    effect: "30% chance of burning the target."
                },
                {   name: "Shadow Ball",
                    type: "Ghost",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of lowering the target's Special Defense by one stage."
                },
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance of paralyzing target."
                }
            ]
        },
        {   name: "Krookodile",
            level: 54,
            gender: false,
            types:[
                "Ground",
                "Dark"
            ],
            item: "Black Glasses",
            nature: "Adamant",
            ability: "Moxie",
            stats:{
                health: 173,
                attack: 170,
                defense: 100,
                specialAttack: 83,
                specialDefence: 98,
                speed: 116
            },
            moves: [
                {   name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if the opponent is underground."
                },
                {   name: "Brick Break",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 75,
                    effect: "Removes effects of Reflect and Light Screen."
                },
                {   name: "Dragon Claw",
                    type: "Dragon",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Crunch",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "0% chance of lowering the target's Defense by one stage."
                }
            ]
        },
        {   name: "Archeops",
            level: 51,
            gender: true,
            types:[
                "Rock",
                "Flying"
            ],
            item: "",
            nature: "Naive",
            ability: "Defeaist",
            stats:{
                health: 148,
                attack: 163,
                defense: 88,
                specialAttack: 126,
                specialDefence: 76,
                speed: 141
            },
            moves: [
                {   name: "Acrobatics",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 55,
                    effect: "Power is doubled if user is not holding an item."
                },
                {   name: "Rock Slide",
                    type: "Rock",
                    category: "physical",
                    accuracy: 90,
                    power: 75,
                    effect: "30% chance of causing the target to flinch"
                },
                {   name: "Dragon Claw",
                    type: "Dragon",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "U-Turn",
                    type: "Bug",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "User returns to it's pokeball after attacking."
                }
            ]
        },
        {   name: "Zekrom",
            level: 50,
            types:[
                "Dragon",
                "Electric"
            ],
            item: "",
            nature: "Jolly",
            ability: "Teravolt",
            stats:{
                health: 167,
                attack: 170,
                defense: 130,
                specialAttack: 115,
                specialDefence: 111,
                speed: 119
            },
            moves: [
                {   name: "Dragon Breath",
                    type: "Dragon",
                    category: "special",
                    accuracy: 100,
                    power: 60,
                    effect:"30% chance of paralyzing target."
                },
                {   name: "Slash",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 70
                },
                {   name: "Zen Headbutt",
                    type: "Psychic",
                    category: "physical",
                    accuracy: 90,
                    power: 80
                },
                {   name: "Fusion Bolt",
                    type: "Electric",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if <i>Fusion Flare</i> is used before it on the same turn."
                }
            ]
        }
    ],
    others: [
        {   name: "Patrat",
            level: 6,
            gender: false,
            types:[
                "Normal"
            ],
            item: "",
            nature: "Impish",
            ability: "Run Away",
            stats:{
                health: 22,
                attack: 12,
                defense: 11,
                specialAttack: 9,
                specialDefence: 10,
                speed: 10
            },
            moves: [
                {   name: "Tackle",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 50
                },
                {   name: "Leer",
                    type: "Normal",
                    category: "status",
                    accuracy: 100,
                    effect: "Lowers the target's Defense by one stage."
                },
                {   name: "Cut",
                    type: "Normal",
                    category: "physical",
                    accuracy: 95,
                    power: 50
                },
                {   name: "Bite",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "30% chance of causing the target to flinch."
                }
            ]
        },
        {   name: "Tranquill",
            level: 32,
            gender: false,
            types:[
                "Normal",
                "Flying"
            ],
            item: "",
            nature: "Gentle",
            ability: "Big Pecks",
            stats:{
                health: 90,
                attack: 58,
                defense: 46,
                specialAttack: 42,
                specialDefence: 44,
                speed: 49
            },
            moves: [
                {   name: "Roost",
                    type: "Flying",
                    category: "status",
                    accuracy: 0,
                    effect: "User revocers half of its max HP and temporarly loses the flying type."
                },
                {   name: "Detect",
                    type: "Fighting",
                    category: "status",
                    accuracy: 0,
                    effect: "Prevents any attacks targeted at the user from striking. <br/>Has Priority +4."
                },
                {   name: "Fly",
                    type: "Flying",
                    category: "physical",
                    accuracy: 95,
                    power: 90,
                    effect: "User goes into the sky on the first turn."
                },
                {   name: "Air Slash",
                    type: "Flying",
                    category: "physical",
                    accuracy: 95,
                    power: 75,
                    effect: "30% chance of causing the target to flinch."
                }
            ]
        }
    ]
}