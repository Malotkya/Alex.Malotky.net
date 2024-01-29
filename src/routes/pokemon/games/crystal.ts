import { Game } from "../content/PokemonTypes";

export const crystal:Game = {
    game: "Crystal",
    version: {
        normal: "pokearth/sprites/crystal",
        shiney: "Shiny/Crystal"
    },
    generation: 2,
    region: "Johto // Kanto",
    team: [
        {   name: "Typhlosion",
            gender: true,
            level: 60,
            moves: [
                {   name: "Flamethrower",
                    type: "Fire",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance to burn target."
                },
                {   name: "Thunder Punch",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 75,
                    effect: "10% chance to paralize target."
                },
                {   name: "Dynamic Punch",
                    type: "Fighting",
                    category: "physical",
                    accuracy: 50,
                    power: 100,
                    effect: "Confuses target."
                },
                {   name: "Iron Tail",
                    type: "Steel",
                    category: "physical",
                    accuracy: 75,
                    power: 100,
                    effect: "30% chance of lowering the target's defense."
                }
            ],
            stats:{
                attack: 127,
                defense: 124,
                specialAttack: 158,
                specialDefence: 129,
                speed: 156,
                health: 198
            },
            types:[
                "Fire"
            ],
            item: "Leftovers"
        },
        {   name: "Victreebel",
            level: 60,
            gender: true,
            moves: [
                {   name: "Razor Leaf",
                    type: "Grass",
                    category: "special",
                    accuracy: 95,
                    power: 55
                },
                {   name: "Sludge Bomb",
                    type: "Poison",
                    category: "physical",
                    accuracy: 100,
                    power: 90,
                    effect: "30% chance of poisoning the target."
                },
                {   name: "Growth",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises both Attack and Sp. Attack by one stage."
                },
                {   name: "Sleep Powder",
                    type: "Grass",
                    category: "status",
                    accuracy: 75,
                    effect: "Puts target to sleep."
                }
            ],
            stats:{
                attack: 165,
                defense: 102,
                specialAttack: 156,
                specialDefence: 108,
                speed: 116,
                health: 194
            },
            types:[
                "Grass",
                "Poison"
            ],
            item: "Miracle Seed"
        },
        {   name: "Gyarados",
            level: 60,
            gender: true,
            shiney: true,
            moves: [
                {   name: "Waterfall",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance to cause flinching."
                },
                {   name: "Tunderbolt",
                    type: "Electric",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect: "10% chance to paralize target."
                },
                {   name: "Icy Wind",
                    type: "Ice",
                    category: "special",
                    accuracy: 95,
                    power: 55,
                    effect: "Lowers target's Speed by one stage."
                },
                {   name: "Surf",
                    type: "Water",
                    category: "special",
                    accuracy: 100,
                    power: 95
                }
            ],
            stats:{
                attack: 177,
                defense: 137,
                specialAttack: 98,
                specialDefence: 146,
                speed: 128,
                health: 210
            },
            types:[
                "Water",
                "Flying"
            ],
            item: "Never Melt Ice"
        },
        {   name: "Espeon",
            level: 60,
            gender: true,
            moves: [
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Shadow Ball",
                    type: "Ghost",
                    category: "physical",
                    accuracy: 100,
                    power: 80,
                    effect: "20% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Swift",
                    type: "Normal",
                    category: "physical",
                    accuracy: 0,
                    power: 60,
                    effect: "Does not miss."
                },
                {   name: "Bite",
                    type: "Dark",
                    category: "special",
                    accuracy: 100,
                    power: 60,
                    effect: "30% chance to cause flinching."
                }
            ],
            stats:{
                attack: 116,
                defense: 104,
                specialAttack: 182,
                specialDefence: 140,
                speed: 165,
                health: 181
            },
            types:[
                "Psychic"
            ],
            item: "Black Glasses"
        },
        {   name: "Togetic",
            level: 60,
            gender: true,
            moves: [
                {   name: "Psychic",
                    type: "Psychic",
                    category: "special",
                    accuracy: 100,
                    power: 90,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                },
                {   name: "Steel Wing",
                    type: "Steel",
                    category: "physical",
                    accuracy: 90,
                    power: 70,
                    effect: "10% chance of raising the user's Defense by one stage."
                },
                {   name: "Toxic",
                    type: "Poison",
                    category: "status",
                    accuracy: 85,
                    effect: "Badly poisons opponent."
                },
                {   name: "Fly",
                    type: "Flying",
                    category: "physical",
                    accuracy: 95,
                    power: 70,
                    effect: "User goes into the sky on the first turn."
                }
            ],
            stats:{
                attack: 82,
                defense: 125,
                specialAttack: 128,
                specialDefence: 158,
                speed: 86,
                health: 170
            },
            types:[
                "Normal",
                "Flying"
            ],
            item: "Sharp Beak"
        },
        {   name: "Piloswine",
            level: 60,
            gender: false,
            moves: [
                {   name: "Ice Beam",
                    type: "Ice",
                    category: "special",
                    accuracy: 100,
                    power: 95,
                    effect:"10% chance to freeze target."
                },
                {   name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if opponenet is underground."
                },
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
                    power: 20,
                    effect: "50% chance of lowering the target's Defense by one stage."
                }
            ],
            stats:{
                attack: 144,
                defense: 134,
                specialAttack: 104,
                specialDefence: 104,
                speed: 92,
                health: 216
            },
            types:[
                "Ice",
                "Ground"
            ],
            item: "Soft Sand"
        }
    ],
    others: [
        {   name: "Bellsprout",
            gender: false,
            level: 5,
            moves: [
                {   name: "Vine Whip",
                    type: "Grass",
                    category: "special",
                    accuracy: 100,
                    power: 35
                },
                {   name: "Flash",
                    type: "Normal",
                    category: "special",
                    accuracy: 70,
                    effect: "Lowers the target's Accuracy by one stage."
                },
                {   name: "Cut",
                    type: "Normal",
                    category: "physical",
                    accuracy: 95,
                    power: 50
                }
            ],
            stats:{
                attack: 13,
                defense: 9,
                specialAttack: 13,
                specialDefence: 9,
                speed: 9,
                health: 20
            },
            types:[
                "Grass",
                "Poison"
            ]
        },
        {   name: "Tentacruel",
            gender: false,
            level: 22,
            moves: [
                {   name: "Poison Sting",
                    type: "Poison",
                    category: "physical",
                    accuracy: 100,
                    power: 15,
                    effect: "30% chance of poisoning the target."
                },
                {   name: "Supersonic",
                    type: "Normal",
                    category: "status",
                    accuracy: 55,
                    effect: "Confuses target."
                },
                {   name: "Whirlpool",
                    type: "Water",
                    category: "special",
                    accuracy: 70,
                    power: 15,
                    effect: "Traps and damages target for 4-5 turns."
                },
                {   name: "Acid",
                    type: "Poison",
                    category: "physical",
                    accuracy: 100,
                    power: 40,
                    effect: "10% chance of lowering the target's Sp. Defense by one stage."
                }
            ],
            stats:{
                attack: 37,
                defense: 40,
                specialAttack: 41,
                specialDefence: 58,
                speed: 55,
                health: 72
            },
            types:[
                "Water",
                "Poison"
            ]
        }
    ]
}

/*comments: [
    "So many quality of life upgrades from Generation 1.",
    "The team you see above is the team that I used to defeat Red.  I had a hard counter for everything on his team except for his Snorlax, ended up relying on the confusion from Dynamic Punch.",
    "This is the same team that I used to defeat the elite four, except I only really used Typhlosion, Victreebel, Gyarados, and Espeon there.",
    "Similarly to yellow, I wish I had palnned a little better and had a fighting type to really close the coverage gap of normal types.",
    "Lastyly, Bellsprout and Tentacruel are there for the HM moves Cut, Flash, and Whirlpool."
]*/