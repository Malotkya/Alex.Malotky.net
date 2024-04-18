import { Game } from "../PokemonTypes";

export const ruby:Game = {
    game: "Ruby",
    generation: 3,
    version:{
        normal: "emerald/pokemon",
        shiney: "Shiny/Em"
    },
    region: "Hoenn",
    team: [
        {   name: "Swampert",
            level: 47,
            gender: true,
            types:[
                "Water",
                "Ground"
            ],
            item: "Sea Incense",
            nature: "Lonely",
            ability: "Torrent",
            stats:{
                health: 166,
                attack: 127,
                defense: 88,
                specialAttack: 99,
                specialDefence: 103,
                speed: 78
            },
            moves: [
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 95
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
                    effect: "Power is doubled if the opponent is underground."
                },
                {   name: "Ice Beam",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance to freeze target."
                }
            ]
            
        },
        {   name: "Shiftry",
            level: 45,
            gender: true,
            types:[
                "Grass",
                "Dark"
            ],
            item: "Miracle Seed",
            nature: "Bashful",
            ability: "Early Bird",
            stats:{
                health: 156,
                attack: 110,
                defense: 65,
                specialAttack: 104,
                specialDefence: 67,
                speed: 92
            },
            moves: [
                {   name: "Faint Attack",
                    type: "Dark",
                    category: "special",
                    accuracy: 0,
                    power: 60,
                    effect: "Does not miss."
                },
                {   name: "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 85,
                    effect: "Badly poisons target."
                },
                {   name: "Growth",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises both Attack and Sp. Attack by one stage."
                },
                {   name: "Giga Drain",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 60,
                    effect: "User recovers 50% of damage delt to target."
                }
            ]
        },
        {   name: "Crobat",
            level: 45,
            gender: false,
            types:[
                "Poison",
                "Flying"
            ],
            item: "",
            nature: "Relaxed",
            ability: "Inner Focus",
            stats:{
                health: 147,
                attack: 100,
                defense: 99,
                specialAttack: 82,
                specialDefence: 89,
                speed: 124
            },
            moves: [
                {   name: "Aerial Ace",
                    type: "Flying",
                    category: "physical",
                    accuracy: 0,
                    power: 60,
                    effect: "Does not miss."
                }, 
                {   name: "Sludge Bomb",
                    type: "Poison",
                    category: "physical",
                    accuracy: 100,
                    power: 90,
                    effect: "30% chance of poisoning the target."
                },
                {   name: "Steel Wing",
                    type: "Steel",
                    category: "physical",
                    accuracy: 90,
                    power: 70,
                    effect: "10% chance of raising the user's Defense by one stage."
                },
                {   name: "Shadow Ball",
                    type: "Ghost",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of lowering the target's Special Defense by one stage."
                }
            ]
        },
        {   name: "Aggron",
            gender: true,
            level: 45,
            types:[
                "Steel",
                "Rock"
            ],
            item: "Hard Stone",
            nature: "Adamant",
            ability: "Sturdy",
            stats:{
                health: 133,
                attack: 123,
                defense: 182,
                specialAttack: 66,
                specialDefence: 67,
                speed: 65
            },
            moves: [
                {   name: "Iron Tail",
                    type: "Steel",
                    category: "physical",
                    accuracy: 75,
                    power: 100,
                    effect: "30% chance of lowering the target's Defense by one stage."
                },
                {   name: "Rock Tomb",
                    type: "Rock",
                    category: "physical",
                    accuracy: 80,
                    power: 50,
                    effect: "Lowers the target's Speed by one stage."
                },
                {   name: "Shock Wave",
                    type: "Electric",
                    category: "special",
                    accuracy: 0,
                    power: 60,
                    effect: "Does not miss."
                },
                {   name: "Dragon Claw",
                    type: "Dragon",
                    category: "special",
                    accuracy: 100,
                    power: 80
                }
            ]
        },
        {   name: "Alakazam",
            level: 46,
            gender: true,
            types:[
                "Psychic"
            ],
            item: "Lax Incense",
            nature: "Docile",
            ability: "Inner Focus",
            stats:{
                health: 122,
                attack: 61,
                defense: 52,
                specialAttack: 141,
                specialDefence: 89,
                speed: 130
            },
            moves: [
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Special Defense by one stage."
                },
                {   name: "Ice Punch",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 75,
                    effect: "10% chance of freezing target."
                },
                {   name: "Thunder Punch",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 75,
                    effect: "10% chance of paralyzing target."
                },
                {   name: "Fire Punch",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 75,
                    effect: "10% chance of burning target."
                }
            ]
        },
        {   name: "Groudon",
            level: 46,
            types:[
                "Ground"
            ],
            item: "Soft Sand",
            nature: "Docile",
            ability: "Drought",
            stats:{
                health: 160,
                attack: 150,
                defense: 141,
                specialAttack: 111,
                specialDefence: 95,
                speed: 93
            },
            moves: [
                {   name: "Slash",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 70
                },
                {   name: "Solarbeam",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 120,
                    effect: "Absorbs sunlight on the first turn."
                },
                {   name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if the opponent is underground."
                },
                {   name: "Flamethrower",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance of burning target."
                }
            ]
        }
    ],
    others: [
        {   name: "Linoone",
            level: 20,
            gender: false,
            moves: [
                {   name: "Strength",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Secret Power",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "30% chance of inducing a secondary effect based on the environment."
                },
                {   name: "Rock Smash",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 20,
                    effect: "50% chance of lowering the target's Defense by one stage."
                },
                {   name: "Cut",
                    type: "Normal",
                    category: "physical",
                    accuracy: 95,
                    power: 50
                }
            ],
            stats:{
                health: 66,
                attack: 34,
                defense: 33,
                specialAttack: 34,
                specialDefence: 34,
                speed: 48
                
            },
            types:[
                "Normal"
            ],
            nature: "Modest", 
            ability: "Pickup"
        },
        {   name: "Tropius",
            level: 26,
            gender: true,
            moves: [
                {   name: "Fly",
                    type: "Flying",
                    category: "physical",
                    accuracy: 95,
                    power: 75,
                    effect: "User goes into the sky on the first turn."
                },
                {   name: "Razor Leaf",
                    type: "Grass",
                    category: "special",
                    accuracy: 95,
                    power: 55
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
                }
            ],
            stats:{
                health: 89,
                attack: 44,
                defense: 55,
                specialAttack: 48,
                specialDefence: 53,
                speed: 31
            },
            types:[
                "Grass",
                "Flying"
            ],
            nature: "Quiet", 
            ability: "Chlorophyll"
        },
        {   name: "Gyarados",
            level: 24,
            gender: false,
            types:[
                "Water",
                "Flying"
            ],
            item: "",
            nature: "Docile",
            ability: "Intimidate",
            stats:{
                health: 85,
                attack: 71,
                defense: 45,
                specialAttack: 35,
                specialDefence: 59,
                speed: 47
            },
            moves: [
                {   name: "Waterfall",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of causing the target to flinch."
                },
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 95
                },
                {   name: "Bite",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 60,
                    effect: "30% chance of causing the target to flinch"
                },
                {   name: "Dive",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 60,
                    effect: "User goes underwater on the first turn."
                }
            ]
        }
    ],
    
}