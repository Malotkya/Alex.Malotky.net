import { Game } from "../types";

export const shield:Game = {
    game: "Shield",
    generation: 8,
    region: "Galar",
    version: {
        normal: "swordshield/pokemon",
        shiney: "Shiny/SWSH"
    },
    team: [
        {   name: "Cinderace",
            level: 68,
            gender: true,
            types:[
                "Fire"
            ],
            item: "",
            nature: "Jolly",
            ability: "Blaze",
            gigantamax: true,
            dynamax: 10,
            stats:{
                health: 208,
                attack: 195,
                defense: 125,
                specialAttack: 102,
                specialDefence: 121,
                speed: 217
            },
            moves: [
                {   name:  "Pyro Ball",
                    type: "Fire",
                    category: "physical",
                    accuracy: 90,
                    power: 120,
                    effect: "10% chance of burning target."
                },
                {   name:  "Low Sweep",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 65,
                    effect: "Lowers opponent's speed."
                },
                {   name:  "Scorching Sands",
                    type: "Ground",
                    category: "special",
                    accuracy: 100,
                    power: 70,
                    effect: "30% chance of burning target."
                },
                {   name:  "Acrobatics",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 55,
                    effect: "Power is doubled if user is not holding an item."
                }
            ]
            
        },
        {   name: "Ludicolo",
            level: 67,
            gender: true,
            types:[
                "Water",
                "Grass"
            ],
            item: "Never-Melt Ice",
            nature: "Timid",
            ability: "Swift Swim",
            dynamax: 8,
            stats:{
                health: 199,
                attack: 120,
                defense: 126,
                specialAttack: 147,
                specialDefence: 152,
                speed: 145
            },
            moves: [
                {   name:  "Fake Out",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 40,
                    effect: "Can only be used on the first turn.<br/>Causes target to flinch.<br/>Has a priority of +3."
                },
                {   name:  "Ice Beam",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of freezing target."
                },
                {   name:  "Energy Ball",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "0% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name:  "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 90
                },
            ]
        },
        {   name: "Toxtricity",
            level: 68,
            gender: false,
            types:[
                "Electric",
                "Poison"
            ],
            item: "Black Sludge",
            nature: "Rash",
            ability: "Punk Rock",
            dynamax: 6,
            stats:{
                health: 203,
                attack: 179,
                defense: 123,
                specialAttack: 217,
                specialDefence: 116,
                speed: 130
            },
            moves: [ 
                {   name:  "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of paralyzing target."
                },
                {   name:  "Sludge Wave",
                    type: "Poison",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance of poisoning target."
                },
                {   name:  "Boomburst",
                    type: "Normal",
                    category: "special",
                    accuracy: 100,
                    power: 140
                },
                {   name:  "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 90,
                    effect: "Badly poisons opponent."
                }
            ]
        },
        {   name: "Grimmsnarl",
            level: 67,
            gender: true,
            types:[
                "Dark",
                "Fairy"
            ],
            item: "Focus Sash",
            nature: "Naughty",
            ability: "Prankster",
            dynamax: 0,
            stats:{
                health: 221,
                attack: 207,
                defense: 108,
                specialAttack: 139,
                specialDefence: 115,
                speed: 116
            },
            moves: [
                {   name:  "Bulk Up",
                    type: "Fighting",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises the user's Attack and Defense by one stage each."
                },
                {   name:  "False Surrender",
                    type: "Dark",
                    category: "physical",
                    accuracy: 0,
                    power: 80,
                    effect: "Does not miss."
                },
                {   name:  "Play Rough",
                    type: "Fairy",
                    category: "physical",
                    accuracy: 90,
                    power: 90,
                    effect: "10% chance of lowering the target's Attack by one stage."
                },
                {   name:  "Thunder Wave",
                    type: "Electric",
                    category: "status",
                    accuracy: 90,
                    effect: "Paralyzes opponent."
                }
            ]
        },
        {   name: "Metagross",
            level: 67,
            types:[
                "Steel",
                "Psychic"
            ],
            item: "Soft Sand",
            nature: "Serious",
            ability: "Clear Body",
            dynamax: 10,
            stats:{
                health: 200,
                attack: 225,
                defense: 198,
                specialAttack: 153,
                specialDefence: 140,
                speed: 125
            },
            moves: [
                {   name:  "Hammer Arm",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 90,
                    power: 100,
                    effect: "Lowers the user's Speed by one stage."
                },
                {   name:  "Zen Headbutt",
                    type: "Psychic",
                    category: "physical",
                    accuracy: 90,
                    power: 80,
                    effect: "20% chance of causing the target to flinch."
                },
                {   name:  "Meteor Mash",
                    type: "Steel",
                    category: "physical",
                    accuracy: 90,
                    power: 90,
                    effect: "20% chance of raising the user's Attack by one stage."
                },
                {   name:  "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if opponent is underground."
                }
            ]
        },
        {   name: "Dragapult",
            level: 66,
            gender: false,
            types:[
                "Dragon",
                "Ghost"
            ],
            item: "Leftovers",
            nature: "Bashful",
            ability: "Infiltrator",
            dynamax: 10,
            stats:{
                health: 209,
                attack: 191,
                defense: 117,
                specialAttack: 160,
                specialDefence: 111,
                speed: 200
            },
            moves: [
                {   name:  "U-Turn",
                    type: "Bug",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "User returns to it's pokeball after attacking."
                },
                {   name:  "Dragon Dance",
                    type: "Dragon",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises the user's Attack and Speed by one stage each."
                },
                {   name:  "Phantom Force",
                    type: "Ghost",
                    category: "physical",
                    accuracy: 100,
                    power: 90,
                    effect: "User dissapears on the first turn."
                },
                {   name:  "Dragon Darts",
                    type: "Dragon",
                    category: "physical",
                    accuracy: 100,
                    power: 50,
                    effect: "User attacks twice."
                }
            ]
        }
    ],
    others: []
}