/** Scryfall.js
 * 
 * @author Alex Malotky
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Update_1 = __importDefault(require("./Scryfall/Update"));
const path_1 = __importDefault(require("path"));

//Database file location
const database = path_1.default.join(process.cwd(), "cards.db");

(0, Update_1.default)(database).then(() => {
    console.log("Download Complete!");
}).catch(console.error);
