import { Game } from "../content/PokemonTypes";

export const platinum:Game = {
    game: "Platinum",
    generation: 4,
    version: {
        normal: "pokearth/sprites/dp",
        shiney: "Shiny/DP"
    },
    region: "Sinnoh",
    team: [
        {   name: "Torterra",
            level: 52,
            gender: true,
            types:[
                "Grass",
                "Ground"
            ],
            item: "",
            nature: "Brave",
            ability: "Overgrow",
            stats:{
                health: 174,
                attack: 155,
                defense: 133,
                specialAttack: 96,
                specialDefence: 106,
                speed: 81
            },
            moves: [
                {   name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if the opponent is underground."
                },
                {   name: "Wood Hammer",
                    type: "Grass",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "User takes 33% recoil of damage delt."
                },
                {   name: "Crunch",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of lowering the target's Defense by one stage."
                },
                {   name: "Swords Dance",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises Attack by two stages."
                }
            ]
            
        },
        {   name: "Floatzel",
            gender: true,
            level: 58,
            types:[
                "Water"
            ],
            item: "Splash Plate",
            nature: "Lax",
            ability: "Swift Swim",
            stats:{
                health: 184,
                attack: 151,
                defense: 100,
                specialAttack: 114,
                specialDefence: 68,
                speed: 163
            },
            moves: [
                {   name: "Waterfall",
                    type: "Water",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of causing flinching."
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
                {   name: "Dig",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "User goes underground on the first turn."
                }
            ]
        },
        {   name: "Staraptor",
            level: 50,
            gender: false,
            types:[
                "Normal",
                "Flying"
            ],
            item: "Razor Claw",
            nature: "Modest",
            ability: "Intimidate",
            stats:{
                health: 156,
                attack: 135,
                defense: 86,
                specialAttack: 74,
                specialDefence: 67,
                speed: 118
            },
            moves: [ 
                {   name: "Brave Bird",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "User takes 33% recoil of damage delt."
                },
                {   name: "Close Combat",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "Lowers the user's Defense and Special Defense by one stage."
                },
                {   name: "U-Turn",
                    type: "Bug",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "User returns to it's pokeball after attacking."
                },
                {   name: "Fly",
                    type: "Flying",
                    category: "physical",
                    accuracy: 95,
                    power: 90,
                    effect: "User goes into the sky on the first turn."
                }
            ]
        },
        {   name: "Rotom",
            level: 52,
            types:[
                "Electric",
                "Ghost"
            ],
            item: "Spell Tag // Magnet",
            nature: "Bold",
            ability: "Levitate",
            stats:{
                health: 128,
                attack: 75,
                defense: 105,
                specialAttack: 125,
                specialDefence: 99,
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
                {   name: "Shadow Ball",
                    type: "Ghost",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of lowering the target's Special Defense by one stage"
                },
                {   name: "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 85,
                    effect: "Badly poisons opponent."
                },
                {   name: "Thunder Wave",
                    type: "Electric",
                    category: "status",
                    accuracy: 100,
                    effect: "Paralyzes opponenet."
                }
            ]
        },
        {   name: "Houndoom",
            gender: true,
            level: 54,
            types:[
                "Dark",
                "Fire"
            ],
            item: "Dread Plate",
            nature: "Mild",
            ability: "Early Bird",
            stats:{
                health: 148,
                attack: 113,
                defense: 71,
                specialAttack: 155,
                specialDefence: 102,
                speed: 135
            },
            moves: [
                {   name: "Flamethrower",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance of burning target."
                },
                {   name: "Dark Pulse",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of causing the target to flinch."
                },
                {   name: "Sludge Bomb",
                    type: "Poison",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "30% chance of poisoning the target."
                },
                {   name: "Iron Tail",
                    type: "Steel",
                    category: "physical",
                    accuracy: 75,
                    power: 100,
                    effect: "30% chance of lowering the target's Defense by one stage."
                }
            ]
        },
        {   name: "Gallade",
            gender: true,
            level: 52,
            types:[
                "Psychic",
                "Fighting"
            ],
            item: "Odd Incense",
            nature: "Serious",
            ability: "Steadfast",
            stats:{
                health: 144,
                attack: 156,
                defense: 89,
                specialAttack: 93,
                specialDefence: 137,
                speed: 110
            },
            moves: [
                {   name: "Psycho Cut",
                    type: "Psychic",
                    category: "physical",
                    accuracy: 100,
                    power: 70
                },
                {   name: "Brick Break",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 75,
                    effect: "Removes effects of Reflect and Light Screen."
                },
                {   name: "X-Scissor",
                    type: "Bug",
                    category: "physical",
                    accuracy: 100,
                    power: 80
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
            nature: "Bashful",
            ability: "Unaware",
            stats:{
                health: 62,
                attack: 37,
                defense: 30,
                specialAttack: 26,
                specialDefence: 32,
                speed: 32
            },
            moves: [
                {   name: "Strength",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Rock Smash",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 40,
                    effect: "50% chance of lowering the target's Defense by one stage."
                },
                {   name: "Surf",
                    type: "Water",
                    category: "special",
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
        }
    ]
}

/* comments: [
        "This is almost a first for me, its the first pokemon game that I have played on the DS, but I have already played brilliant diamond.",
        "Staraptor was a real champion for gyms 2 - 4, I feal almost guilty that it turned into the pokemon that takes a hit so I can heal in the elite four.",
        "Floatzel was the other champion of the team being able to almost single handely taken on the elite four by himself.",
        "I find that I am starting to get tired of HM's now that pokemon are able to learn a real variaty of moves, and as typing feels more important.  I ended up with a whole fleat of Bibarels knowing a variaty of HM moves, I reocorded just the one I used to get through Victory Road.",
        "Platinum might be one of my favorite pokemon games, with a real variaty of moves and pokemon to choose from."
    ] */