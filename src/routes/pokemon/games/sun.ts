import { Game } from "../types";

export const sun: Game = {
    game: "Ultra Sun",
    generation: 7,
    version: {
        normal: "sunmoon/pokemon",
        shiney: "Shiny/SM"
    },
    region: "Alola",
    team: [
        {   name: "Decidueye",
            level: 65,
            gender: false,
            types:[
                "Grass",
                "Ghost"
            ],
            item: "Decidium Z",
            nature: "Adamant",
            ability: "Overgrow",
            stats:{
                health: 197,
                attack: 203,
                defense: 122,
                specialAttack: 135,
                specialDefence: 159,
                speed: 123
            },
            moves: [
                {   name: "Spirit Shackle",
                    type: "Ghost",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "Prevents the target from switching out."
                },
                {   name: "Leaf Blade",
                    type: "Grass",
                    category: "physical",
                    accuracy: 100,
                    power: 90
                },
                {   name: "Sucker Punch",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "Has a priority of +1.<br/>Fails if target is not attacking."
                },
                {   name: "Brave Bird",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "User takes 33% recoil of damage delt."
                }
            ]
        },
        {   name: "Vikavolt",
            level: 63,
            gender: false,
            types:[
                "Bug",
                "Electric"
            ],
            item: "Electrium Z",
            nature: "Timid",
            ability: "Levitate",
            stats:{
                health: 183,
                attack: 104,
                defense: 128,
                specialAttack: 210,
                specialDefence: 128,
                speed: 108
            },
            moves: [
                {   name: "Thunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance to paralyze target."
                },
                {   name: "Bug Buzz",
                    type: "Bug",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Special Defense by one stage."
                },
                {   name: "Flash Cannon",
                    type: "Steel",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "10% chance of lowering the target's Special Defense by one stage."
                },
                {   name: "Thunder Wave",
                    type: "Electric",
                    category: "status",
                    accuracy: 90,
                    effect: "Paralyzes opponent."
                }
            ]
        },
        {   name: "Slowbro",
            level: 63,
            gender: false,
            types:[
                "Water",
                "Psychic"
            ],
            item: "Waterium Z",
            nature: "Serious",
            ability: "Own Tempo",
            stats:{
                health: 209,
                attack: 140,
                defense: 173,
                specialAttack: 138,
                specialDefence: 125,
                speed: 79
            },
            moves: [
                {   name: "Psyshock",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "Damage is based on targets Defense."
                },
                {   name: "Scald",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "30% chance to burn target."
                },
                {   name: "Yawn",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Puts opponent to sleep on the next turn."
                },
                {   name: "Calm Mind",
                    type: "Psychic",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises both Sp. Attack and Sp. Defense by one stage."
                }
            ]
            
        },
        {   name: "Mudsdale",
            level: 62,
            gender: true,
            types:[
                "Ground"
            ],
            item: "Fightinium Z",
            nature: "Careful",
            ability: "Own Tempo",
            stats:{
                health: 202,
                attack: 184,
                defense: 157,
                specialAttack: 79,
                specialDefence: 147,
                speed: 73
            },
            moves: [
                {   name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if the opponent is underground."
                },
                {   name: "Superpower",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 120,
                    effect: "Lowers the user's Attack and Defense by one stage."
                },
                {   name: "Heavy Slam",
                    type: "Steel",
                    category: "physical",
                    accuracy: 100,
                    power: 0,
                    effect: "Inflicts greater damage the more heavy the user is to the target."
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
        {   name: "Salazzle",
            level: 63,
            gender: false,
            types:[
                "Poison",
                "Fire"
            ],
            item: "Firium Z",
            nature: "Lonely",
            ability: "Corrosion",
            stats:{
                health: 168,
                attack: 123,
                defense: 97,
                specialAttack: 171,
                specialDefence: 90,
                speed: 182
            },
            moves: [
                {   name: "Flamethrower",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance to burn target."
                },
                {   name: "Sludge Wave",
                    type: "Poison",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance of poisoning target."
                },
                {   name: "Dragon Pulse",
                    type: "Dragon",
                    category: "special",
                    accuracy: 100,
                    power: 85
                },
                {   name: "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 90,
                    effect: "Badly poisons opponent."
                }
            ]
        },
        {   name: "Ninetales",
            modifier: "-a",
            level: 62,
            gender: true,
            types:[
                "Ice",
                "Fairy"
            ],
            item: "Fairium Z",
            nature: "Naive",
            ability: "Snow Cloak",
            stats:{
                health: 174,
                attack: 119,
                defense: 120,
                specialAttack: 133,
                specialDefence: 126,
                speed: 184
            },
            moves: [
                {   name: "Dazzling Gleam",
                    type: "Fairy",
                    category: "special",
                    accuracy: 100,
                    power: 80
                },
                {   name: "Ice Beam",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of freezing target."
                },
                {   name: "Extrasensory",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "10% chance to cause flinching."
                },
                {   name: "Nasty Plot",
                    type: "Dark",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises the user's Special Attack by two stages."
                }
            ]
            
        }
    ],
    others: [
        {   name: "Zorua",
            level: 27,
            gender: true,
            types:[
                "Dark"
            ],
            item: "",
            nature: "Calm",
            ability: "Illusion",
            stats:{
                health: 58,
                attack: 40,
                defense: 30,
                specialAttack: 55,
                specialDefence: 29,
                speed: 44
            },
            moves: [
                {   name: "Fury Swipes",
                    type: "Normal",
                    category: "physical",
                    accuracy: 80,
                    power: 18,
                    effect: "Hits 2-5 times in one turn."
                },
                {   name: "Thief",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "Steals opponent's held item."
                },
                {   name: "Feint Attack",
                    type: "Dark",
                    category: "physical",
                    accuracy: 0,
                    power: 60,
                    effect: "Does not miss."
                },
                {   name: "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 80,
                    effect: "Badly poisons opponent."
                }
            ]
        },
        {   name: "Furfrou",
            level: 40,
            gender: true,
            types:[
                "Normal"
            ],
            item: "",
            nature: "Hardy",
            ability: "Fur Coat",
            stats:{
                health: 120,
                attack: 90,
                defense: 66,
                specialAttack: 73,
                specialDefence: 83,
                speed: 109
            },
            moves: [
                {   name: "Headbutt",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "30% chance to cause flinching."
                },
                {   name: "Retaliate",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "Doubles the damage if a teammate fainted on the last turn."
                },
                {   name: "Bite",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "30% chance to cause flinching."
                },
                {   name: "Baby-Doll Eyes",
                    type: "Fairy",
                    category: "status",
                    accuracy: 100,
                    effect: "Lowers the target's Attack by one stage.<br/>Has priority of +1"
                }
            ]
        }
    ]
}