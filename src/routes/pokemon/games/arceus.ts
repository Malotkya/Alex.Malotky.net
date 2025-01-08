/** /routes/pokemon/games/violet
 * 
 * @author Alex Malotky
 */
import { Game } from "../types";

/** Violet Content
 * 
 */
export const arceus:Game = {
    game: "Legends: Arceus",
    generation: 8,
    region: "Hisui",
    version: {
        normal: "legendsarceus/pokemon",
        shiney: "Shiny/SWSH"
    },
    team: [
        {   name: "Typhlosion",
            modifier: "-h",
            level: 80,
            gender: true,
            types:[
                "Fire",
                "Ghost"
            ],
            item: "",
            nature: "Naughty",
            stats:{
                health: 328,
                attack: 250,
                defense: 224,
                specialAttack: 347,
                specialDefence: 223,
                speed: 293
            },
            moves: [
                {
                   name:  "Flamethrower",
                    type: "Fire",
                    category: "special",
                    power: 90,
                    accuracy: 100,
                    effect: "10% chance of burning target."
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
                    name:  "Drain Punch",
                     type: "Fighting",
                     category: "physical",
                     power: 75,
                     accuracy: 100,
                     effect: "Recovers half the damage delt."
                 },
                 {
                    name:  "Swift",
                     type: "Normal",
                     category: "special",
                     power: 60,
                     accuracy: 0
                 },
            ]
        },
        {   name: "Luxray",
            level: 79,
            shiney: true,
            gender: true,
            types:[
                "Electric"
            ],
            item: "",
            nature: "Quirky",
            stats:{
                health: 343,
                attack: 347,
                defense: 223,
                specialAttack: 257,
                specialDefence: 223,
                speed: 235
            },
            moves: [
                {
                    name:  "Wild Charge",
                     type: "Electric",
                     category: "physical",
                     power: 90,
                     accuracy: 100,
                     effect: "User takes 25% recoil of damage delt."
                 },
                 {
                     name:  "Crunch",
                      type: "Dark",
                      category: "physical",
                      power: 80,
                      accuracy: 100,
                      effect: "20% chance of lowering Def."
                  },
                  {
                     name:  "Ice Fang",
                      type: "Ice",
                      category: "physical",
                      power: 75,
                      accuracy: 95,
                      effect: "10% chance to flinch or freeze."
                  },
                  {
                     name:  "Iron Tail",
                      type: "Steel",
                      category: "physical",
                      power: 100,
                      accuracy: 75,
                      effect: "30% chacne of lowering Def."
                  }
            ]
        },
        {   name: "Sylveon",
            level: 79,
            gender: true,
            types:[
                "Fairy"
            ],
            item: "",
            nature: "Quirky",
            stats:{
                health: 378,
                attack: 194,
                defense: 194,
                specialAttack: 325,
                specialDefence: 328,
                speed: 212
            },
            moves: [
                {
                    name:  "Dazzling Gleam",
                     type: "Fairy",
                     category: "special",
                     power: 80,
                     accuracy: 100,
                     effect: "Hits all adjacent opponents."
                 },
                 {
                     name:  "Magical Leaf",
                      type: "Grass",
                      category: "special",
                      power: 60,
                      accuracy: 0
                  },
                  {
                     name:  "Quick Attack",
                      type: "Normal",
                      category: "physical",
                      power: 40,
                      accuracy: 100,
                      effect: "User attacks first."
                  },
                  {
                     name:  "Calm Mind",
                      type: "Psychic",
                      category: "status",
                      power: 0,
                      accuracy: 0,
                      effect: "Raises Sp. Attack & Sp. Defence"
                  }
            ]
        },
        {   name: "Gastrodon",
            level: 79,
            gender: true,
            modifier: "-e",
            types:[
                "Water",
                "Ground"
            ],
            item: "",
            nature: "Modest",
            stats:{
                health: 414,
                attack: 217,
                defense: 200,
                specialAttack: 301,
                specialDefence: 234,
                speed: 161
            },
            moves: [
                {
                    name:  "Water Pulse",
                     type: "Water",
                     category: "special",
                     power: 60,
                     accuracy: 100,
                     effect: "20% chance of confusing target."
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
                     name:  "Ancient Power",
                      type: "Fighting",
                      category: "physical",
                      power: 60,
                      accuracy: 100,
                      effect: "10% chance of raising all user stats."
                  },
                  {
                     name:  "Recover",
                      type: "Normal",
                      category: "status",
                      power: 0,
                      accuracy: 0,
                      effect: "Recovers half of max HP"
                  }
            ]
        },
        {   name: "Crobat",
            level: 79,
            gender: true,
            types:[
                "Poison",
                "Flying"
            ],
            item: "",
            nature: "Naughty",
            stats:{
                health: 255,
                attack: 295,
                defense: 226,
                specialAttack: 205,
                specialDefence: 212,
                speed: 369
            },
            moves: [
                {
                    name:  "Cross Poison",
                     type: "Poison",
                     category: "physical",
                     power: 70,
                     accuracy: 100,
                     effect: "20% chance of poisoning target."
                 },
                 {
                     name:  "Aerial Ace",
                      type: "Flying",
                      category: "physical",
                      power: 60,
                      accuracy: 0
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
                     name:  "Zen Headbutt",
                      type: "Psychic",
                      category: "physical",
                      power: 80,
                      accuracy: 90,
                      effect: "20% chance of flinching target."
                  }
            ]
        },
        {   name: "Bronzong",
            level: 79,
            types:[
                "Poison",
                "Flying"
            ],
            item: "",
            nature: "Serious",
            stats:{
                health: 311,
                attack: 279,
                defense: 300,
                specialAttack: 223,
                specialDefence: 300,
                speed: 145
            },
            moves: [
                {
                    name:  "Flash Cannon",
                     type: "Steel",
                     category: "special",
                     power: 80,
                     accuracy: 100,
                     effect: "10% chance of lowering Sp. Def."
                 },
                 {
                     name:  "Extrasensory",
                      type: "Psychic",
                      category: "special",
                      power: 80,
                      accuracy: 100,
                      effect: "20% chance of flinching target."
                  },
                  {
                     name:  "Rock Slide",
                      type: "Rock",
                      category: "physical",
                      power: 75,
                      accuracy: 90,
                      effect: "30% chance of flinching target."
                  },
                  {
                     name:  "Charge Beam",
                      type: "Electric",
                      category: "special",
                      power: 50,
                      accuracy: 90,
                      effect: "70% chance of raising users Sp. Atk."
                  }
            ]
        }
    ],
    others: []
}