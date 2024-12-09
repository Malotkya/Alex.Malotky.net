/** /routes/pokemon/games/eevee
 * 
 * @author Alex Malotky
 */
import { Game } from "../types";

/** Let's Go Eevee Content
 * 
 */
export const eevee:Game = {
    game: "Let's Go Eevee",
    generation: 7,
    region: "Kanto",
    version: {
        normal: "letsgopikachueevee/pokemon",
        shiney: "Shiny/SM"
    },
    team: [
        {   name: "Eevee",
            level: 82,
            gender: true,
            types:[
                "Normal"
            ],
            nature: "Calm",
            stats:{
                health: 245,
                attack: 178,
                defense: 194,
                specialAttack: 202,
                specialDefence: 238,
                speed: 195
            },
            moves: [
                {   name: "Bouncy Bubble",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "User recovers 50% of damage delt to target."
                },
                {   name: "Glitzy Glow",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "Halves the damage from Special attacks for 5 turns."
                },
                {   name: "Buzzy Buzz",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "Paralyzes opponent."
                },
                {   name: "Sizzly Slide",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "Burns opponent."
                }
            ]
            
        },
        {   name: "Nidoking",
            level: 80,
            gender: true,
            types:[
                "Poison",
                "Ground"
            ],
            nature: "Modest",
            stats:{
                health: 257,
                attack: 191,
                defense: 176,
                specialAttack: 222,
                specialDefence: 179,
                speed: 180
            },
            moves: [
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of paralyzing target."
                },
                {   name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if opponent is underground."
                },
                {   name: "Ice Beam",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of freezing target."
                },
                {   name: "Sludge Bomb",
                    type: "Poison",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "30% chance of poisoning target."
                }
            ]
        },
        {   name: "Ninetales",
            level: 81,
            gender: false,
            types:[
                "Fire"
            ],
            nature: "Naughty",
            stats:{
                health: 241,
                attack: 171,
                defense: 166,
                specialAttack: 193,
                specialDefence: 170,
                speed: 222
            },
            moves: [ 
                {   name: "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 90,
                    effect: "Badly poisons opponent."
                },
                {   name: "Flamethrower",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of burning target."
                },
                {   name: "Dark Pulse",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance to cause flinching."
                },
                {   name: "Calm Mind",
                    type: "Psychic",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises both Sp. Attack and Sp. Defense by one stage."
                }
            ]
        },
        {   name: "Pinsir",
            level: 80,
            gender: false,
            types:[
                "Bug"
            ],
            nature: "Gentle",
            stats: {
                health: 211,
                attack: 279,
                defense: 178,
                specialAttack: 130,
                specialDefence: 170,
                speed: 182
            },
            moves: [
                {   name: "X-Scissor",
                    type: "Bug",
                    category: "physical",
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
                {   name: "Swords Dance",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises Attack by two stages."
                },
                {   name: "Rock Slide",
                    type: "Rock",
                    category: "physical",
                    accuracy: 90,
                    power: 75,
                    effect: "30% chance to cause flinching."
                }
            ]
        },
        {   name: "Exeggutor",
            gender: false,
            level: 80,
            types:[
                "Grass",
                "Psychic"
            ],
            nature: "Hasty",
            stats:{
                health: 260,
                attack: 211,
                defense: 157,
                specialAttack: 244,
                specialDefence: 164,
                speed: 143
            },
            moves: [
                {   name: "Sludge Bomb",
                    type: "Poison",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "30% chance of poisoning target."
                },
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance to lower targets Sp. Defence by one stage."
                },
                {   name: "Leech Seed",
                    type: "Grass",
                    category: "status",
                    accuracy: 90,
                    effect: "Drains HP from opponent each turn."
                },
                {   name: "Mega Drain",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 40,
                    effect: "User recovers 50% of damage delt to target."
                }
            ]
        },
        {   name: "Starmie",
            level: 80,
            types:[
                "Water",
                "Psychic"
            ],
            nature: "Hasty",
            stats:{
                health: 208,
                attack: 163,
                defense: 170,
                specialAttack: 205,
                specialDefence: 164,
                speed: 243
            },
            moves: [
                {   name: "Scald",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "30% chance of butning target."
                },
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of paralyzing target."
                },
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance to lower targets Sp. Defence by one stage."
                },
                {   name: "Ice Beam",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of freezing target."
                }
            ]
        }
    ],
    others: []
}