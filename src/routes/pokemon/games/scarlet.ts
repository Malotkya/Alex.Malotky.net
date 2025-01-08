/** /routes/pokemon/games/violet
 * 
 * @author Alex Malotky
 */
import { Game } from "../types";

/** Violet Content
 * 
 */
export const scarlet:Game = {
    game: "Scarlet",
    generation: 9,
    region: "Paldea",
    version: {
        normal: "scarletviolet/pokemon/new",
        shiney: "Shiny/SV/new"
    },
    team: [
        {   name: "Skeledirge",
            level: 76,
            gender: true,
            types:[
                "Fire",
                "Ghost"
            ],
            terraType: "Steller",
            item: "",
            nature: "Jolly",
            ability: "Unaware",
            stats:{
                health: 266,
                attack: 109,
                defense: 160,
                specialAttack: 256,
                specialDefence: 121,
                speed: 159
            },
            moves: [
                {
                    name:  "Torch Song",
                     type: "Fire",
                     category: "special",
                     power: 80,
                     accuracy: 100,
                     effect: "Raises user's Sp. Attack."
                 },
                 {
                    name:  "Shadow Ball",
                     type: "Ghost",
                     category: "special",
                     power: 80,
                     accuracy: 100,
                     effect: "20% chance of lowering Sp. Def."
                 },
                 {
                    name:  "Earth Power",
                     type: "Ground",
                     category: "special",
                     power: 90,
                     accuracy: 100,
                     effect: "10% chance of lowering Sp. Def."
                 },
                 {
                    name:  "Sing",
                     type: "Normal",
                     category: "status",
                     power: 0,
                     accuracy: 55,
                     effect: "Puts target to sleep."
                 }
            ]
        },
        {   name: "Zebstrika",
            level: 74,
            gender: false,
            types:[
                "Electric"
            ],
            terraType: "Steel",
            item: "",
            nature: "Rash",
            ability: "Motor Drive",
            stats:{
                health: 234,
                attack: 231,
                defense: 116,
                specialAttack: 125,
                specialDefence: 114,
                speed: 203
            },
            moves: [
                {
                    name:  "Supercell Slam",
                     type: "Electric",
                     category: "physical",
                     power: 100,
                     accuracy: 95
                 },
                 {
                    name:  "Smart Strike",
                     type: "Steel",
                     category: "physical",
                     power: 70,
                     accuracy: 0
                 },
                 {
                    name:  "High Hoursepower",
                     type: "Ground",
                     category: "physical",
                     power: 95,
                     accuracy: 95
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
        {   name: "Noivern",
            level: 74,
            gender: true,
            types:[
                "Flying",
                "Dragon"
            ],
            terraType: "Dark",
            item: "",
            nature: "Quiet",
            ability: "Infiltrator",
            stats:{
                health: 249,
                attack: 121,
                defense: 147,
                specialAttack: 214,
                specialDefence: 125,
                speed: 215
            },
            moves: [
                {
                    name:  "Air Slash",
                     type: "Flying",
                     category: "special",
                     power: 75,
                     accuracy: 95,
                     effect: "30% chance of flinching target."
                 },
                 {
                    name:  "Dragon Pulse",
                     type: "Dragon",
                     category: "special",
                     power: 85,
                     accuracy: 100
                 },
                 {
                    name:  "Dark Pulse",
                     type: "Dark",
                     category: "special",
                     power: 80,
                     accuracy: 100,
                     effect: "20% chance of flinching target."
                 },
                 {
                    name:  "Tailwind",
                     type: "Flying",
                     category: "status",
                     power: 0,
                     accuracy: 0,
                     effect: "Doubles Speed for 4 turns."
                 }
            ]
        },
        {   name: "Leavanny",
            level: 74,
            gender: true,
            types:[
                "Bug",
                "Grass"
            ],
            terraType: "Poison",
            item: "",
            nature: "Lax",
            ability: "Overcoat",
            stats:{
                health: 220,
                attack: 249,
                defense: 138,
                specialAttack: 111,
                specialDefence: 135,
                speed: 204
            },
            moves: [
                {
                    name:  "Leaf Blade",
                     type: "Grass",
                     category: "physical",
                     power: 90,
                     accuracy: 100,
                     effect: "High critical hit ratio."
                 },
                 {
                    name:  "X-Scissor",
                     type: "Bug",
                     category: "physical",
                     power: 80,
                     accuracy: 100
                 },
                 {
                    name:  "Poison Jab",
                     type: "Poison",
                     category: "physical",
                     power: 80,
                     accuracy: 100,
                     effect: "30% chance of poisoning taget."
                 },
                 {
                    name:  "Swords Dance",
                     type: "Normal",
                     category: "status",
                     power: 0,
                     accuracy: 55,
                     effect: "Raises Attack by two stages."
                 }
            ]
        },
        {   name: "Reuniclus",
            level: 74,
            gender: true,
            types:[
                "Psychic"
            ],
            terraType: "Psychic",
            item: "",
            nature: "Impish",
            ability: "Magic Guard",
            stats:{
                health: 251,
                attack: 111,
                defense: 140,
                specialAttack: 255,
                specialDefence: 133,
                speed: 116
            },
            moves: [
                {
                    name:  "Psychic",
                     type: "Psychic",
                     category: "special",
                     power: 90,
                     accuracy: 100,
                     effect: "10% chance of lowering Sp. Def."
                 },
                 {
                    name:  "Energy Ball",
                     type: "Grass",
                     category: "special",
                     power: 90,
                     accuracy: 100,
                     effect: "10% chance of lowering Sp. Def."
                 },
                 {
                    name:  "Calm Mind",
                     type: "Psychic",
                     category: "status",
                     power: 0,
                     accuracy: 0,
                     effect: "Raises Sp. Atk & Sp. Def by one stage."
                 },
                 {
                    name:  "Reflect",
                     type: "Normal",
                     category: "status",
                     power: 0,
                     accuracy: 0,
                     effect: "Halfs damage from Physical attacks for 5 turns."
                 }
            ]
        },
        {   name: "Azumarill",
            level: 75,
            gender: false,
            types:[
                "Water",
                "Fairy"
            ],
            terraType: "Fighting",
            item: "",
            nature: "Lonely",
            ability: "Huge Power",
            stats:{
                health: 239,
                attack: 160,
                defense: 150,
                specialAttack: 98,
                specialDefence: 143,
                speed: 150
            },
            moves: [
                {
                    name:  "Play Rough",
                     type: "Fairy",
                     category: "physical",
                     power: 90,
                     accuracy: 90,
                     effect: "10% chance of lowering Atk."
                 },
                 {
                    name:  "Liquidation",
                     type: "Water",
                     category: "physical",
                     power: 85,
                     accuracy: 100,
                     effect: "10% chance of lowering Def."
                 },
                 {
                    name:  "Ice Punch",
                     type: "Ice",
                     category: "physical",
                     power: 75,
                     accuracy: 100,
                     effect: "10% chance of freezing target."
                 },
                 {
                    name:  "Superpower",
                     type: "Fighting",
                     category: "physical",
                     power: 120,
                     accuracy: 100,
                     effect: "Lowers user Atk and Def by one stage."
                 }
            ]
        }
    ],
    others: []
}