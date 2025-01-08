/** /routes/pokemon/games/violet
 * 
 * @author Alex Malotky
 */
import { Game } from "../types";

/** Violet Content
 * 
 */
export const violet:Game = {
    game: "Violet",
    generation: 9,
    region: "Paldea",
    version: {
        normal: "scarletviolet/pokemon/new",
        shiney: "Shiny/SV/new"
    },
    team: [
        {   name: "Meowscarada",
            level: 100,
            gender: true,
            types:[
                "Grass",
                "Dark"
            ],
            terraType: "Grass",
            item: "Metronome",
            nature: "Naughty",
            ability: "Overgrow",
            stats:{
                health: 315,
                attack: 281,
                defense: 174,
                specialAttack: 237,
                specialDefence: 147,
                speed: 312
            },
            moves: [
                {
                    name:  "Flower Trick",
                     type: "Grass",
                     category: "physical",
                     power: 70,
                     accuracy: 0,
                     effect: "Never Misses, always a critical hit."
                 },
                 {
                    name:  "Night Slash",
                     type: "Dark",
                     category: "physical",
                     power: 70,
                     accuracy: 100
                 },
                 {
                    name:  "Play Rough",
                     type: "Fairy",
                     category: "physical",
                     power: 90,
                     accuracy: 90,
                     effect: "10% chance of lowering Atk."
                 },
                 {
                    name:  "Hone Claws",
                     type: "Dark",
                     category: "status",
                     power: 0,
                     accuracy: 0,
                     effect: "Raises Atack and Accuracy by one stage."
                 }
            ]
            
        },
        {   name: "Gardevoir",
            level: 100,
            gender: false,
            types:[
                "Psychic",
                "Fairy"
            ],
            terraType: "Fairy",
            item: "Wise Glasses",
            nature: "Timid",
            ability: "Trace",
            stats:{
                health: 289,
                attack: 174,
                defense: 155,
                specialAttack: 300,
                specialDefence: 265,
                speed: 224
            },
            moves: [
                {
                    name:  "Moonblast",
                     type: "Fairy",
                     category: "special",
                     power: 95,
                     accuracy: 100,
                     effect: "30% chance of lowering Sp. Atk."
                 },
                 {
                    name:  "Psychic",
                     type: "Psychic",
                     category: "special",
                     power: 90,
                     accuracy: 100,
                     effect: "10% chance of lowering Sp. Def."
                 },
                 {
                    name:  "Focus Blast",
                     type: "Fighting",
                     category: "special",
                     power: 120,
                     accuracy: 70,
                     effect: "10% chance of lowering Sp. Def."
                 },
                 {
                    name:  "Shadow Ball",
                     type: "Ghost",
                     category: "special",
                     power: 80,
                     accuracy: 100,
                     effect: "20% chance of lowering Sp. Def."
                 }
            ]
        },
        {   name: "Ceruledge",
            level: 100,
            gender: false,
            types:[
                "Fire",
                "Ghost"
            ],
            terraType: "Fire",
            item: "Muscle Band",
            nature: "Naughty",
            ability: "Flash Fire",
            stats:{
                health: 281,
                attack: 330,
                defense: 177,
                specialAttack: 135,
                specialDefence: 227,
                speed: 206
            },
            moves: [ 
                {
                    name:  "Bitter Blade",
                     type: "Fire",
                     category: "physical",
                     power: 90,
                     accuracy: 100,
                     effect: "Recovers 50% of damage delt."
                 },
                 {
                    name:  "Poison Jab",
                     type: "Poison",
                     category: "physical",
                     power: 80,
                     accuracy: 100,
                     effect: "30% chance of poisoning target."
                 },
                 {
                    name:  "Shadow Claw",
                     type: "Ghost",
                     category: "physical",
                     power: 70,
                     accuracy: 100,
                 },
                 {
                    name:  "X-Scissor",
                     type: "Bug",
                     category: "physical",
                     power: 80,
                     accuracy: 100
                 }
            ]
        },
        {   name: "Kilowattrel",
            level: 100,
            gender: false,
            types:[
                "Electric",
                "Flying"
            ],
            terraType: "Flying",
            item: "Quick Claw",
            nature: "Modest",
            ability: "Wind Power",
            stats:{
                health: 300,
                attack: 163,
                defense: 137,
                specialAttack: 297,
                specialDefence: 174,
                speed: 281
            },
            moves: [
                {
                    name:  "Thunderbolt",
                     type: "Electric",
                     category: "special",
                     power: 90,
                     accuracy: 100,
                     effect: "10% chance of paralyzing target."
                 },
                 {
                    name:  "Brave Bird",
                     type: "Flying",
                     category: "physical",
                     power: 120,
                     accuracy: 100,
                     effect: "User takes 25% recoil of damage delt."
                 },
                 {
                    name:  "Volt Switch",
                     type: "Electric",
                     category: "special",
                     power: 70,
                     accuracy: 100,
                     effect: "User switches out after attacking."
                 },
                 {
                    name:  "Thunder Wave",
                     type: "Electric",
                     category: "status",
                     power: 0,
                     accuracy: 90,
                     effect: "Paralyzes opponent."
                 }
            ]
        },
        {   name: "Garchomp",
            level: 100,
            types:[
                "Dragon",
                "Ground"
            ],
            terraType: "Ground",
            item: "Soft Sand",
            nature: "Adamant",
            ability: "Rough Skin",
            stats:{
                health: 360,
                attack: 361,
                defense: 206,
                specialAttack: 188,
                specialDefence: 194,
                speed: 259
            },
            moves: [
                {
                    name: "Swords Dance",
                    type: "Normal",
                    category: "status",
                    accuracy: 0,
                    effect: "Raises Attack by two stages."
                },
                 {
                    name:  "Dragon Claw",
                     type: "Dragon",
                     category: "physical",
                     power: 80,
                     accuracy: 100
                 },
                 {
                    name: "Earthquake",
                    type: "Ground",
                    category: "physical",
                    accuracy: 100,
                    power: 100,
                    effect: "Power is doubled if opponent is underground."
                },
                 {
                    name:  "Sandstorm",
                     type: "Rock",
                     category: "status",
                     power: 0,
                     accuracy: 0,
                     effect: "Creates a sandstorm for 5 turns."
                 }
            ]
        },
        {   name: "Vaporeon",
            level: 100,
            gender: true,
            types:[
                "Water"
            ],
            terraType: "Ice",
            item: "Quick Claw",
            nature: "Modest",
            ability: "Water Absorb",
            stats:{
                health: 418,
                attack: 168,
                defense: 160,
                specialAttack: 298,
                specialDefence: 242,
                speed: 181
            },
            moves: [
                {
                    name:  "Surf",
                     type: "Water",
                     category: "special",
                     power: 90,
                     accuracy: 100,
                     effect: "Hits all adjacent Pokemon."
                 },
                 {
                    name:  "Ice Beam",
                     type: "Ice",
                     category: "special",
                     power: 90,
                     accuracy: 100,
                     effect: "10% chance of freezing target."
                 },
                 {
                    name:  "Swift",
                     type: "Normal",
                     category: "special",
                     power: 60,
                     accuracy: 0
                 },
                 {
                    name:  "Calm Mind",
                     type: "Psychic",
                     category: "status",
                     power: 0,
                     accuracy: 0,
                     effect: "Raises Sp. Atk & Sp. Def by one stage."
                 },
            ]
        }
    ],
    others: []
}