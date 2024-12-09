/** /routes/pokemon/games/fireRed
 * 
 * @author Alex Malotky
 */
import { Game } from "../types";

/** Fire Red Content
 * 
 */
export const red:Game = {
    game: "Fire Red",
    generation: 3,
    version: {
        normal: "red_green/pokemon",
        shiney: "Shiny/FRLG",
        override: ".gif"
    },
    region: "Kanto",
    team: [
        {   name: "Charizard",
            level: 53,
            gender: true,
            types:[
                "Fire",
                "Flying"
            ],
            item: "Quick Claw",
            nature: "Hardy",
            ability: "Blaze",
            stats:{
                health: 166,
                attack: 117,
                defense: 106,
                specialAttack: 135,
                specialDefence: 98,
                speed: 127
            },
            moves: [
                {   name: "Flamethrower",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance of burning target."
                },
                {   name: "Dragon Claw",
                    type: "Dragon",
                    category: "special",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Brick Break",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 75,
                    effect: "Removes effects of Reflect and Light Screen."
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
        {   name: "Gyarados",
            level: 52,
            gender: true,
            types:[
                "Water",
                "Flying"
            ],
            item: "Black Glasses",
            nature: "Quiet",
            ability: "Intimidate",
            stats:{
                health: 179,
                attack: 149,
                defense: 105,
                specialAttack: 94,
                specialDefence: 119,
                speed: 92
            },
            moves: [
                {   name: "Secret Power",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "30% chace of inducing a secondary effect.<br/>Effect varries based on the environment."
                },
                {   name: "Bite",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 60,
                    effect: "30% chance to cause flinching."
                },
                {   name: "Return",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 0,
                    effect: "Power varies based on Frienship level."
                },
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 95
                }
            ]
        },
        {   name: "Fearow",
            level: 51,
            gender: true,
            types:[
                "Normal",
                "Flying"
            ],
            item: "Leftovers",
            nature: "Gentle",
            ability: "Keen Eye",
            stats:{
                health: 139,
                attack: 114,
                defense: 82,
                specialAttack: 78,
                specialDefence: 93,
                speed: 113
            },
            moves: [
                {   name: "Drill Peck",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Steel Wing",
                    type: "Steel",
                    category: "physical",
                    accuracy: 90,
                    power: 70,
                    effect: "10% chance of raising the user's Defense by one stage."
                },
                {   name: "Double-Edge",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "User takes 33% recoil of damage delt."
                },
                {   name: "Fly",
                    type: "Flying",
                    category: "physical",
                    accuracy: 95,
                    power: 70,
                    effect: "User goes into the sky on the first turn."
                }
            ]
        },
        {   name: "Aerodactyl",
            level: 52,
            gender: true,
            types:[
                "Rock",
                "Flying"
            ],
            item: "Leftovers",
            nature: "Hasty",
            ability: "Rock Head",
            stats:{
                health: 156,
                attack: 121,
                defense: 72,
                specialAttack: 80,
                specialDefence: 100,
                speed: 179
            },
            moves: [
                {   name: "Ancient Power",
                    type: "Rock",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "10% chance of raising all the user's stats at once."
                },
                {   name: "Aerial Ace",
                    type: "Flying",
                    category: "physical",
                    accuracy: 0,
                    power: 60,
                    effect: "Does not miss."
                },
                {   name: "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 85,
                    effect: "Badly poisons opponent."
                },
                {   name: "Strength",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                }
            ]
        },
        {   name: "Zapdos",
            level: 50,
            types:[
                "Electric",
                "Flying"
            ],
            item: "",
            nature: "Hardy",
            ability: "Pressure",
            stats:{
                health: 166,
                attack: 107,
                defense: 103,
                specialAttack: 139,
                specialDefence: 107,
                speed: 116
            },
            moves: [
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance of paralyzing target."
                },
                {   name: "Thunder Wave",
                    type: "Electric",
                    category: "status",
                    accuracy: 100,
                    effect: "Paralyzes opponent."
                },
                {   name: "Drill Peck",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Light Screen",
                    type: "Psychic",
                    category: "status",
                    accuracy: 0,
                    effect: "Halves the damage from Special attacks for 5 turns."
                }
            ]
        },
        {   name: "Articuno",
            level: 50,
            types:[
                "Ice",
                "Flying"
            ],
            item: "Mystic Water",
            nature: "Naive",
            ability: "Pressure",
            stats:{
                health: 160,
                attack: 110,
                defense: 110,
                specialAttack: 119,
                specialDefence: 134,
                speed: 112
            },
            moves: [
                {   name: "Ice Beam",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance of freezing target."
                },
                {   name: "Hail",
                    type: "Ice",
                    category: "status",
                    accuracy: 0,
                    effect: "Non-Ice types take damage for 5 turns."
                },
                {   name: "Water Pulse",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 60,
                    effect: "20% chance of confusing the target."
                },
                {   name: "Reflect",
                    type: "Psychic",
                    category: "status",
                    accuracy: 0,
                    effect: "Halves the damage from Physical attacks for 5 turns."
                }
            ]
        }
    ],
    others: [
        {   name: "Butterfree",
            level: 33,
            gender: false,
            types:[
                "Bug",
                "Flying"
            ],
            item: "",
            nature: "Bold",
            ability: "Compound Eyes",
            stats:{
                health: 91,
                attack: 34,
                defense: 52,
                specialAttack: 60,
                specialDefence: 61,
                speed: 65
            },
            moves: [
                {   name: "Thief",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 40,
                    effect: "Steals opponent's held item."
                },
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Sleep Powder",
                    type: "Grass",
                    category: "status",
                    accuracy: 75,
                    effect: "Puts target to sleep."
                },
                {   name: "Flash",
                    type: "Normal",
                    category: "status",
                    accuracy: 70,
                    effect: "Lowers the target's Accuracy by one stage."
                }
            ]
        },
        {   name: "Beedrill",
            level: 10,
            gender: true,
            types:[
                "Bug",
                "Poison"
            ],
            item: "",
            nature: "Naughty",
            ability: "Swarm",
            stats:{
                health: 34,
                attack: 26,
                defense: 14,
                specialAttack: 14,
                specialDefence: 19,
                speed: 21
            },
            moves: [
                {   name: "Poison Sting",
                    type: "Poison",
                    category: "physical",
                    accuracy: 100,
                    power: 15,
                    effect: "30% chance of poisoning the target."
                },
                {   name: "String Shot",
                    type: "Bug",
                    category: "status",
                    accuracy: 95,
                    effect: "Lowers the target's Speed by two stages."
                },
                {   name: "Cut",
                    type: "Normal",
                    category: "physical",
                    accuracy: 95,
                    power: 50
                },
                {   name: "Fury Attack",
                    type: "Normal",
                    category: "physical",
                    accuracy: 85,
                    power: 15,
                    effect: "Hits 2-5 times in one turn."
                }
            ]
        }
    ]
}

/* comments: [
        "Upon starting the remakes I wanted to play with new pokemon, so I decided that I cannot use pokemon (including the starters) that I used in the original.  That is difficult for Gen1 because I played Yellow version and used all the starters.  To make up for this I instead limited myself to only using pokemon that have flying in their type or will eventually have flying (Charmander & Caterpie).",
        ""
    ] */