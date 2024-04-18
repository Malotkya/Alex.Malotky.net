import {Game} from "../PokemonTypes";

export const sapphire:Game = {
    game : "Alpha Sapphire",
    generation: 6,
    version: {
        normal: "xy/pokemon",
        shiney: "Shiny/XY"
    },
    region: "Hoenn",
    team: [
        {   name: "Blaziken",
            level: 67,
            gender: true,
            types:[
                "Fire",
                "Fighting"
            ],
            item: "Blazikenite",
            nature: "Lonely",
            ability: "Blaze",
            stats:{
                health: 208,
                attack: 226,
                defense: 106,
                specialAttack: 169,
                specialDefence: 110,
                speed: 146
            },
            moves: [
                {   name: "Flare Blitz",
                    type: "Fire",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "10% chance of burning the target<br/>User takes 33% recoil of damage delt."
                },
                {   name: "Brave Bird",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "User takes 33% recoil of damage delt."
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
                }
            ]
            
        },
        {   name: "Gardevoir",
            level: 65,
            gender: false,
            shiney: true,
            types:[
                "Psychic",
                "Fairy"
            ],
            item: "Lax Incense",
            nature: "Timid",
            ability: "Synchronize",
            stats:{
                health: 186,
                attack: 94,
                defense: 94,
                specialAttack: 224,
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
                    effect: "30% chance of lowering the target's Sp. Attack by one stage."
                },
                {   name: "Shadow Ball",
                    type: "Ghost",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Calm Mind",
                    type: "Psychic",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises the user's Sp. Attack and Sp. Defense by one stage each."
                }
            ]
        },
        {   name: "Flygon",
            level: 64,
            gender: true,
            types:[
                "Ground",
                "Dragon"
            ],
            item: "Wide Lens",
            nature: "Adamant",
            ability: "Levitate",
            stats:{
                health: 201,
                attack: 187,
                defense: 131,
                specialAttack: 117,
                specialDefence: 129,
                speed: 161
            },
            moves: [
                {   name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if opponent is underground."
                },
                {   name: "Stone Edge",
                    type: "Fairy",
                    category: "physical",
                    accuracy: 100,
                    power: 80
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
        {   name: "Cacturne",
            level: 64,
            gender: true,
            types:[
                "Grass",
                "Dark"
            ],
            item: "Miracle Seed",
            nature: "Modest",
            ability: "Sand Veil",
            stats:{
                health: 191,
                attack: 158,
                defense: 104,
                specialAttack: 202,
                specialDefence: 96,
                speed: 115
            },
            moves: [
                {   name: "Energy Ball",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Venoshock",
                    type: "Poison",
                    category: "special",
                    accuracy: 100,
                    power: 65,
                    effect: "Damage is doubled if the target is poisoned."
                },
                {   name: "Dark Pulse",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of causing the target to flinch."
                },
                {   name: "Nasty Plot",
                    type: "Dark",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises the user's Special Attack by two stages."
                }
            ]
        },
        {   name: "Magnezone",
            level: 65,
            types:[
                "Electric",
                "Steel"
            ],
            item: "Metal Coat",
            nature: "Calm",
            ability: "Sturdy",
            stats:{
                health: 176,
                attack: 115,
                defense: 172,
                specialAttack: 203,
                specialDefence: 145,
                speed: 110
            },
            moves: [
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of paralyzing target."
                },
                {   name: "Flash Cannon",
                    type: "Steel",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Tri Attack",
                    type: "Normal",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of paralyzing, burning or freezing the target."
                },
                {   name: "Tunder Wave",
                    type: "Electric",
                    category: "status",
                    accuracy: 100,
                    effect: "Paralyzes opponent."
                }
            ]
        },
        {   name: "Kyogre",
            level: 64,
            types:[
                "Water"
            ],
            item: "Blue Orb",
            nature: "Quiet",
            ability: "Drizzle",
            stats:{
                health: 250,
                attack: 157,
                defense: 140,
                specialAttack: 249,
                specialDefence: 202,
                speed: 139
            },
            moves: [
                {   name: "Origin Pulse",
                    type: "Water",
                    category: "special",
                    accuracy: 85,
                    power: 110
                },
                {   name: "Ice Beam",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance to freeze target."
                },
                {   name: "Tunder",
                    type: "Electric",
                    category: "special",
                    accuracy: 70,
                    power: 110,
                    effect: "30% chance of paralyzing the target.<br/>Ignores accuracy when used during rain."
                },
                {   name: "Ancient Power",
                    type: "Rock",
                    category: "special",
                    accuracy: 100,
                    power: 60,
                    effect: "10% chance of raising all the user's stats at once."
                }
            ]
        }
    ],
    others: [
        {   name: "Linoone",
            level: 40,
            gender: true,
            types:[
                "Normal"
            ],
            item: "",
            nature: "Careful",
            ability: "Pickup",
            stats:{
                health: 121,
                attack: 78,
                defense: 67,
                specialAttack: 57,
                specialDefence: 73,
                speed: 106
            },
            moves: [
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 90
                },
                {   name: "Strength",
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
        {   name: "Tropius",
            level: 27,
            gender: false,
            types:[
                "Grass",
                "Flying"
            ],
            item: "",
            nature: "Sassy",
            ability: "Solar Power",
            stats:{
                health: 96,
                attack: 48,
                defense: 51,
                specialAttack: 45,
                specialDefence: 62,
                speed: 35
            },
            moves: [
                {   name: "Fly",
                    type: "Flying",
                    category: "special",
                    accuracy: 95,
                    power: 90,
                    effect: "User goes into the sky on the first turn."
                },
                {   name: "Strength",
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
        {   name: "Sharpedo",
            level: 40,
            gender: true,
            types:[
                "Water",
                "Dark"
            ],
            item: "",
            nature: "Impish",
            ability: "Rough Skin",
            stats:{
                health: 107,
                attack: 117,
                defense: 41,
                specialAttack: 76,
                specialDefence: 39,
                speed: 92
            },
            moves: [
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 90
                },
                {   name: "Dive",
                    type: "Water",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "User goes underwater on the first turn."
                },
                {   name: "Waterfall",
                    type: "Water",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of causing the target to flinch."
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