/** /routes/pokemon/games/yellow
 * 
 * @author Alex Malotky
 */
import { Game } from "../types";

/** Yellow Content
 * 
 */
export const yellow: Game = {
    game: "Yellow",
    version: {
        "normal": "pokearth/sprites/yellow"
    },
    generation: 1,
    region: "Kanto",
    team: [
        {   name: "Pikachu",
            level: 48,
            moves: [
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    power: 95,
                    accuracy: 100,
                    effect: "10% chance to paralize target."
                },
                {   name: "Body Slam",
                    type: "Normal",
                    category: "physical",
                    power: 85,
                    accuracy: 100,
                    effect: "30% chance to paralize target<br/>Double damage if target has used minimize."
                },
                {   name: "Submission",
                    type: "Fighting",
                    category: "physical",
                    power: 80,
                    accuracy: 80,
                    effect: "User takes 25% recoil of damage delt."
                },
                {   name: "Thunder Wave",
                    type: "Electric",
                    category: "status",
                    accuracy: 100,
                    effect: "Paralyzes opponent."
                }
            ],
            stats: {
                attack: 73,
                defense: 48,
                speed: 117,
                special: 76,
                health: 119
            },
            types: [
                "Electric"
            ]
        },
        {   name: "Nidoking",
            level: 48,
            moves: [
                {   name: "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 85,
                    effect: "Badly poisons opponent."
                },
                {   name: "Rock Slide",
                    type: "Rock",
                    category: "physical",
                    accuracy: 90,
                    power: 75,
                    effect: "30% chance to cause flinching."
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
                    accuracy: 95,
                    power: 100,
                    effect: "10% chance to freeze target."
                }
            ],
            stats: {
                attack: 105,
                defense: 91,
                speed: 108,
                special: 100,
                health: 152
            },
            types: [
                "Poison",
                "Ground"
            ]
        },
        {   name: "Venusaur",
            level: 46,
            moves: [
                {   name: "Cut",
                    type: "Normal",
                    category: "physical",
                    accuracy: 95,
                    power: 50
                },
                {   name: "Poison Powder",
                    type: "Poison",
                    category: "status",
                    accuracy: 95,
                    effect: "Poisons opponent."
                },
                {   name: "Leech Seed",
                    type: "Grass",
                    category: "status",
                    accuracy: 90,
                    effect: "Drains HP from opponent each turn."
                },
                {   name: "Razor Leaf",
                    type: "Grass",
                    category: "special",
                    accuracy: 95,
                    power: 55
                }
            ],
            stats: {
                attack: 104,
                defense: 106,
                speed: 101,
                special: 116,
                health: 145
            },
            types: [
                "Grass",
                "Poison"
            ]
        },
        {   name: "Charizard",
            level: 46,
            moves: [
                {   name: "Strength",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Swords Dance",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises Attack by two stages."
                },
                {   name: "Flamethrower",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance to burn target."
                },
                {   name: "Dig",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "User goes underground on the first turn."
                }
            ],
            stats: {
                attack: 92,
                defense: 102,
                speed: 108,
                special: 98,
                health: 142
            },
            types: [
                "Fire",
                "Flying"
            ]
        },
        {   name: "Blastoise",
            level: 46,
            moves: [
                {   name: "Take Down",
                    type: "Normal",
                    category: "physical",
                    accuracy: 85,
                    power: 90,
                    effect: "User takes 25% recoil of damage delt."
                },
                {   name: "Withdraw",
                    type: "Water",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises Deffence by one stage."
                },
                {   name: "Blizard",
                    type: "Ice",
                    category: "special",
                    accuracy: 90,
                    power: 120,
                    effect: "May freeze opponent."
                },
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 95
                }
            ],
            stats: {
                attack: 104,
                defense: 123,
                speed: 87,
                special: 100,
                health: 143
            },
            types: [
                "Water"
            ]
        },
        {   name: "Mew",
            level: 50,
            moves: [
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "30% chance to lower targets special by one stage."
                },
                {   name: "Fly",
                    type: "Flying",
                    category: "physical",
                    accuracy: 95,
                    power: 70,
                    effect: "User goes into the sky on the first turn."
                },
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance to paralize target."
                },
                {   name: "Swift",
                    type: "Normal",
                    category: "physical",
                    accuracy: 0,
                    power: 60,
                    effect: "Does not miss."
                }
            ],
            stats: {
                attack: 128,
                defense: 120,
                speed: 131,
                special: 123,
                health: 172
            },
            types: [
                "Psychic"
            ]
        }
    ],
    others: [
        {   name: "Butterfree",
            level: 15,
            moves: [
                {   name: "Tackle",
                    type: "Normal",
                    category: "physical",
                    accuracy: 95,
                    power: 35
                },
                {   name: "Flash",
                    type: "Normal",
                    category: "status",
                    accuracy: 70,
                    effect: "Lowers the target's Accuracy by one stage."
                },
                {   name: "Sleep Powder",
                    type: "Grass",
                    category: "status",
                    accuracy: 75,
                    effect: "Puts opponent to sleep."
                },
                {   name: "Confusion",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 50,
                    effect: "10% chance to confuse target."
                }
            ],
            stats:{
                attack: 21,
                defense: 24,
                speed: 28,
                special: 32,
                health: 44
            },
            types:[
                "Bug",
                "Flying"
            ]
        }
    ]
}