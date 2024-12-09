/** /routes/pokemon/games/x
 * 
 * @author Alex Malotky
 */
import { Game } from "../types";

/** X Content
 * 
 */
export const x:Game = {
    game: "X",
    generation: 6,
    version: {
        normal: "xy/pokemon",
        shiney: "Shiny/XY"
    },
    region: "Kalos",
    team: [
        {   name: "Greninja",
            level: 70,
            gender: true,
            types:[
                "Water",
                "Dark"
            ],
            item: "",
            nature: "Bold",
            ability: "Torrent",
            stats:{
                health: 199,
                attack: 153,
                defense: 144,
                specialAttack: 182,
                specialDefence: 122,
                speed: 203
            },
            moves: [
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 95
                },
                {   name: "Extrasensory",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "10% chance of causing flinching"
                },
                {   name: "Ice Beam",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of freezing target."
                },
                {   name: "Dark Pulse",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of causing flinching"
                }
            ]
            
        },
        {   name: "Gardevoir",
            gender: false,
            level: 70,
            types:[
                "Psychic",
                "Fairy"
            ],
            item: "",
            nature: "Modest",
            ability: "Synchronize",
            stats:{
                health: 206,
                attack: 115,
                defense: 124,
                specialAttack: 235,
                specialDefence: 190,
                speed: 147
            },
            moves: [
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Moonblast",
                    type: "Fairy",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "30% chance of lowering the target's Sp. Attack"
                },
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of paralyzing target."
                },
                {   name: "Calm Mind",
                    type: "Psychic",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises both Sp. Attack and Sp. Defense by one stage."
                }
            ]
        },
        {   name: "Charizard",
            level: 69,
            gender: true,
            types:[
                "Fire",
                "Flying"
            ],
            item: "Charizardite X",
            nature: "Serious",
            ability: "Blaze",
            stats:{
                health: 212,
                attack: 157,
                defense: 133,
                specialAttack: 169,
                specialDefence: 132,
                speed: 165
            },
            moves: [ 
                {   name: "Flanethrower",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of burning target."
                },
                {   name: "Air Slash",
                    type: "Flying",
                    category: "special",
                    accuracy: 95,
                    power: 75,
                    effect: "30% chance of causing flinching."
                },
                {   name: "Flare Blitz",
                    type: "Fire",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "User takes 33% recoil of damage delt.<br/>10% chance of burning target."
                },
                {   name: "Dragon Claw",
                    type: "Dragon",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                }
            ]
        },
        {   name: "Roserade",
            level: 69,
            gender: true,
            types:[
                "Grass",
                "Poison"
            ],
            item: "Poison Barb",
            nature: "Modest",
            ability: "Natural Cure",
            stats:{
                health: 181,
                attack: 130,
                defense: 107,
                specialAttack: 232,
                specialDefence: 177,
                speed: 158
            },
            moves: [
                {   name: "Energy Ball",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Sludge Bomb",
                    type: "Poison",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "30% chance of poisoning the target."
                },
                {   name: "Grass Whistle",
                    type: "Grass",
                    category: "status",
                    accuracy: 55,
                    effect: "Puts opponent to sleep."
                },
                {   name: "Growth",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises both Attack and Sp. Attack by one stage."
                }
            ]
        },
        {   name: "Tyrantrum",
            level: 69,
            gender: true,
            types:[
                "Rock",
                "Dragon"
            ],
            item: "",
            nature: "Gentle",
            ability: "Strong Jaw",
            stats:{
                health: 220,
                attack: 201,
                defense: 178,
                specialAttack: 134,
                specialDefence: 121,
                speed: 140
            },
            moves: [
                {   name: "Head Smash",
                    type: "Rock",
                    category: "physical",
                    accuracy: 80,
                    power: 150,
                    effect: "User takes 50% recoil of damage delt."
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
                    effect: "Power is doubled if the opponent is underground."
                },
                {   name: "Dragon Claw",
                    type: "Dragon",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                }
            ]
        },
        {   name: "Lucario",
            level: 69,
            gender: true,
            types:[
                "Fighting",
                "Steel"
            ],
            item: "Lucarionite",
            nature: "Hasty",
            ability: "Steadfast",
            stats:{
                health: 188,
                attack: 196,
                defense: 110,
                specialAttack: 194,
                specialDefence: 122,
                speed: 190
            },
            moves: [
                {   name: "Close Combat",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "Lowers the user's Defense and Special Defense by one stage."
                },
                {   name: "Extreme Speed",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "Has priority of +2"
                },
                {   name: "Bulldoze",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "Lowers the target's Speed by one stage."
                },
                {   name: "Swords Dance",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises Attack by two stages."
                }
            ]
        }
    ],
    others: [
        {   name: "Bibarel",
            level: 19,
            gender: false,
            types:[
                "Normal",
                "Water"
            ],
            item: "",
            nature: "Modest",
            ability: "Unaware",
            stats:{
                health: 62,
                attack: 35,
                defense: 31,
                specialAttack: 31,
                specialDefence: 31,
                speed: 35
            },
            moves: [
                {   name: "Waterfall",
                    type: "Water",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of causing the target to flinch."
                },
                {   name: "Streangth",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
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
                }
            ]
        },
        {   name: "Fletchinder",
            level: 23,
            gender: true,
            types:[
                "Fire",
                "Flying"
            ],
            item: "",
            nature: "Hardy",
            ability: "Flame Body",
            stats:{
                health: 64,
                attack: 39,
                defense: 36,
                specialAttack: 32,
                specialDefence: 30,
                speed: 48
            },
            moves: [
                {   name: "Peck",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 35
                },
                {   name: "Growl",
                    type: "Normal",
                    category: "status",
                    accuracy: 100,
                    effect: "Lowers the target's Attack by one stage."
                },
                {   name: "Fly",
                    type: "Flying",
                    category: "physical",
                    accuracy: 95,
                    power: 90,
                    effect: "User goes into the sky on the first turn."
                },
                {   name: "Quick Attack",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 40,
                    effect: "Has priority of +1"
                }
            ]
        }
    ]
}