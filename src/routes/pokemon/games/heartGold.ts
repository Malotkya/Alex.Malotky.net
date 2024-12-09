/** /routes/pokemon/games/heartGold
 * 
 * @author Alex Malotky
 */
import { Game } from "../types";

/** Heart Gold Content
 * 
 */
export const gold:Game = {
    game: "Heart Gold",
    generation: 4,
    version: {
        normal: "pokearth/sprites/hgss",
        shiney: "Shiny/HGSS"
    },
    region: "Johto // Kanto",
    team: [
        {   name: "Feraligatr",
            level: 76,
            gender: true,
            types:[
                "Water"
            ],
            item: "Never-Melt Ice",
            nature: "Lonely",
            ability: "Torrent",
            stats:{
                health: 242,
                attack: 203,
                defense: 175,
                specialAttack: 144,
                specialDefence: 136,
                speed: 157
            },
            moves: [
                {   name: "Waterfall",
                    type: "Water",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of causing the target to flinch."
                },
                {   name: "Ice Punch",
                    type: "Ice",
                    category: "physical",
                    accuracy: 100,
                    power: 75,
                    effect: "10% chance of freezing target."
                },
                {   name: "Crunch",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of lowering the target's Defense by one stage."
                },
                {   name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if opponent is underground."
                }
            ]
        },
        {   name: "Ampharos",
            level: 73,
            gender: false,
            types:[
                "Electric"
            ],
            item: "Focus Sash",
            nature: "Timid",
            ability: "Static",
            stats:{
                health: 231,
                attack: 138,
                defense: 137,
                specialAttack: 186,
                specialDefence: 164,
                speed: 126
            },
            moves: [
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance of paralyzing the target."
                },
                {   name: "Signal Beam",
                    type: "Bug",
                    category: "special",
                    accuracy: 100,
                    power: 75,
                    effect: "10% chance of confusing the target."
                },
                {   name: "Power Gem",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 70,
                },
                {   name: "Thunder Wave",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    effect: "Paralyzes opponent"
                }
            ]
        },
        {   name: "Nidoqueen",
            level: 73,
            gender: false,
            types:[
                "Poison",
                "Ground"
            ],
            item: "Razor Claw",
            nature: "Lonely",
            ability: "Poison Point",
            stats:{
                health: 244,
                attack: 180,
                defense: 146,
                specialAttack: 151,
                specialDefence: 143,
                speed: 161
            },
            moves: [
                {   name: "Poison Jab",
                    type: "Poison",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "30% chance of poisoning the target."
                },
                {   name: "Avalanche",
                    type: "Ice",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "Power doubles if user took damage first."
                },
                {   name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if opponent is underground."
                },
                {   name: "Superpower",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "Lowers the user's Attack and Defense by one stage."
                }
            ]
        },
        {   name: "Umbreon",
            shiney: true,
            level: 73,
            gender: true,
            types:[
                "Dark",
            ],
            item: "Shell Bell",
            nature: "Hardy",
            ability: "Synchronize",
            stats:{
                health: 238,
                attack: 107,
                defense: 169,
                specialAttack: 105,
                specialDefence: 210,
                speed: 102
            },
            moves: [
                {   name: "Dark Pulse",
                    type: "Dark",
                    category: "special",
                    accuracy: 75,
                    power: 100,
                    effect: "20% chance of causing the target to flinch."
                },
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Special Defense by one stage."
                },
                {   name: "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 85,
                    effect: "Badly poisons opponent."
                },
                {   name: "Dig",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "User goes underground on the first turn."
                }
            ]
        },
        {   name: "Ho-Oh",
            level: 72,
            types:[
                "Fire",
                "Flying"
            ],
            item: "Leftovers",
            nature: "Timid",
            ability: "Pressure",
            stats:{
                health: 155,
                attack: 120,
                defense: 96,
                specialAttack: 114,
                specialDefence: 159,
                speed: 101
            },
            moves: [
                {   name: "Sacred Fire",
                    type: "Fire",
                    category: "physical",
                    accuracy: 95,
                    power: 100,
                    effect: "50% chance of burning the target."
                },
                {   name: "Brave Bird",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "User takes 33% recoil of damage delt."
                },
                {   name: "Giga Drain",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 60,
                    effect: "User recovers 50% of damage delt to target."
                },
                {   name: "Recover",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Restores up to 50% of the user's maximum Health."
                },
            ]
        },
        {   name: "Primeape",
            level: 70,
            gender: false,
            types:[
                "Fighting"
            ],
            item: "Muscle Band",
            nature: "Docile",
            ability: "Anger Point",
            stats:{
                health: 189,
                attack: 181,
                defense: 104,
                specialAttack: 121,
                specialDefence: 129,
                speed: 159
            },
            moves: [
                {   name: "Close Combat",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "Lowers the user's Defense and Special Defense by one stage."
                },
                {   name: "Stone Edge",
                    type: "Rock",
                    category: "physical",
                    accuracy: 80,
                    power: 100
                },
                {   name: "Seed Bomb",
                    type: "Grass",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Rock Climb",
                    type: "Normal",
                    category: "physical",
                    accuracy: 85,
                    power: 90,
                    effect: "20% chance of confusing the target."
                }
            ]
        },
    ],
    "others": [
        {   name: "Sandshrew",
            level: 6,
            gender: false,
            types:[
                "Ground"
            ],
            item: "",
            nature: "Timid",
            ability: "Sand Veil",
            stats:{
                health: 22,
                attack: 13,
                defense: 16,
                specialAttack: 7,
                specialDefence: 8,
                speed: 11
            },
            moves: [
                {   name: "Cut",
                    type: "Normal",
                    category: "physical",
                    accuracy: 95,
                    power: 50
                },
                {   name: "Rock Smash",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 40,
                    effect: "50% chance of lowering the target's Defense by one stage."
                },
                {   name: "Strength",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Rock Climb",
                    type: "Normal",
                    category: "physical",
                    accuracy: 85,
                    power: 90,
                    effect: "20% chance of confusing the target."
                }
            ]
        },
        {   name: "Gyarados",
            level: 30,
            shiney: true,
            gender: false,
            types:[
                "Water",
                "Flying"
            ],
            item: "",
            nature: "Timid",
            ability: "Intimidate",
            stats:{
                health: 105,
                attack: 73,
                defense: 53,
                specialAttack: 45,
                specialDefence: 67,
                speed: 58
            },
            moves: [
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 95
                },
                {   name: "Whirlpool",
                    type: "Water",
                    category: "special",
                    accuracy: 70,
                    power: 15,
                    effect: ""
                },
                {   name: "Waterfall",
                    type: "Water",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Strength",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                }
            ]
        }
    ]
}