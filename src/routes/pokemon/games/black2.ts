import { Game } from "../content/PokemonTypes";

export const black:Game = {
    game: "Black 2",
    generation: 5,
    version: {
        normal: "blackwhite/pokemon",
        shiney: "Shiny/BW"
    },
    region: "Unova",
    team: [
        {   name: "Emboar",
            level: 61,
            gender: false,
            types:[
                "Fire",
                "Fighting"
            ],
            item: "Shell Bell",
            nature: "Adamant",
            ability: "Blaze",
            stats:{
                health: 217,
                attack: 202,
                defense: 93,
                specialAttack: 123,
                specialDefence: 89,
                speed: 115
            },
            moves: [
                {   name: "Fire Punch",
                    type: "Fire",
                    category: "physical",
                    accuracy: 100,
                    power: 75,
                    effect: "10% chance of burning the target."
                },
                {   name: "Thunder Punch",
                    type: "Electric",
                    category: "physical",
                    accuracy: 100,
                    power: 75,
                    effect: "10% chance of paralyzing the target."
                },
                {   name: "Hammer Arm",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 90,
                    power: 100,
                    effect: "Lowers the user's Speed by one stage."
                },
                {   name: "Iron Head",
                    type: "Steel",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "30% chance of causing the target to flinch."
                }
            ]
            
        },
        {   name: "Stoutland",
            level: 60,
            gender: true,
            types:[
                "Normal"
            ],
            item: "Muscle Band",
            nature: "Adamant",
            ability: "Intimidate",
            stats:{
                health: 187,
                attack: 174,
                defense: 119,
                specialAttack: 71,
                specialDefence: 122,
                speed: 125
            },
            moves: [
                {   name: "Crunch",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of lowering the target's Defense by one stage."
                },
                {   name: "Ice Fang",
                    type: "Ice",
                    category: "physical",
                    accuracy: 95,
                    power: 65,
                    effect: "10% chance to flinch and/or freezing the target."
                },
                {   name: "Return",
                    type: "Normal",
                    category: "physical",
                    accuracy: 100,
                    power: 102,
                    effect: "Power increases with the friendship level."
                },
                {   name: "Fire Fang",
                    type: "Fire",
                    category: "physical",
                    accuracy: 95,
                    power: 65,
                    effect: "10% chance to flinch and/or burn the target"
                }
            ]
        },
        {   name: "Seismitoad",
            level: 61,
            gender: true,
            types:[
                "Water",
                "Ground"
            ],
            item: "Muscle Band",
            nature: "Hardy",
            ability: "Swift Swim",
            stats:{
                health: 200,
                attack: 139,
                defense: 112,
                specialAttack: 128,
                specialDefence: 99,
                speed: 114
            },
            moves: [
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 95
                },
                {   name: "Bulldoze",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "Lower's opponents Speed."
                },
                {   name: "Drain Punch",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 100,
                    power: 75,
                    effect: "User recovers 50% of damage delt."
                },
                {   name: "Ice Punch",
                    type: "Ice",
                    category: "physical",
                    accuracy: 100,
                    power: 75,
                    effect: "10% chance of freezing the target."
                }
            ]
        },
        {   name: "Gothitelle",
            level: 60,
            gender: false,
            types:[
                "Psychic",
            ],
            item: "Shell Bell",
            nature: "Modest",
            ability: "Frisk",
            stats:{
                health: 177,
                attack: 76,
                defense: 138,
                specialAttack: 157,
                specialDefence: 152,
                speed: 99
            },
            moves: [
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Shadow Ball",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Psychock",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "Damage is based on targets Defense."
                },
                {   name: "Hidden Power",
                    type: "Fighting",
                    category: "special",
                    accuracy: 100,
                    power: 60
                }
            ]
        },
        {   name: "Galvantula",
            level: 61,
            gender: true,
            types:[
                "Bug",,
                "Electric"
            ],
            item: "Zoom Lens",
            nature: "Rash",
            ability: "Compound Eyes",
            stats:{
                health: 194,
                attack: 114,
                defense: 85,
                specialAttack: 159,
                specialDefence: 77,
                speed: 155
            },
            moves: [
                {   name: "Thunder",
                    type: "Electric",
                    category: "special",
                    accuracy: 70,
                    power: 120,
                    effect: "30% chance of paralyzing the target."
                },
                {   name: "Bug Buzz",
                    type: "Bug",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Energy Ball",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Thunder Wave",
                    type: "Electric",
                    category: "status",
                    accuracy: 100,
                    effect: "Paralyzes opponent."
                }
            ]
        },
        {   name: "Crobat",
            level: 60,
            gender: true,
            types:[
                "Poison",,
                "Flying"
            ],
            item: "",
            nature: "Naughty",
            ability: "Inner Focus",
            stats:{
                health: 191,
                attack: 148,
                defense: 118,
                specialAttack: 95,
                specialDefence: 104,
                speed: 183
            },
            moves: [
                {   name: "Cross Poison",
                    type: "Poison",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "10% chance of poisoning the target."
                },
                {   name: "Acrobatics",
                    type: "Flying",
                    category: "physical",
                    accuracy: 100,
                    power: 55,
                    effect: "Power is doubled if uswe ris not holding an item."
                },
                {   name: "U-Turn",
                    type: "Bug",
                    category: "physical",
                    accuracy: 100,
                    power: 70,
                    effect: "User returns to it's pokeball after attacking."
                },
                {   name: "Bite",
                    type: "Dark",
                    category: "physical",
                    accuracy: 100,
                    power: 60,
                    effect: "30% chance of causing the target to flinch."
                }
            ]
        }
    ],
    others: []
}