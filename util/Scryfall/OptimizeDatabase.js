/** /Scryfall/OptimizeDatabase
 * 
 * @author Alex Malotky
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));

/** Optimize Database into Shards
 * 
 * @param {string} filename 
 * @returns {Promise<Object>}
 */
function OptimizeDatabase(filename) {
    return new Promise((resolve, reject) => {
        const sections = {};
        const file = fs_1.default.createReadStream(filename);
        let buffer = "";

        //Read in Data
        file.on('data', (chunck) => {
            buffer += chunck.toString();
            let index = buffer.indexOf("\n");

            //Get Cards By Line
            while (index >= 0) {
                const card = JSON.parse(buffer.slice(0, index).trim());
                const match = card.name.match(/[a-zA-Z0-9_]/);

                //Get Shard Name
                let s = "?";
                if (match) {
                    s = match[0].toUpperCase();
                }

                //Create Shard if Doesn't Exist
                if (typeof sections[s] === "undefined")
                    sections[s] = [];

                //Add Card to Shard
                sections[s].push(card);

                //Next
                buffer = buffer.slice(index + 1);
                index = buffer.indexOf("\n");
            }
        });

        //Error
        file.on('error', (err) => {
            reject(err);
        });

        //Close
        file.on('close', () => {
            resolve(sections);
        });
    });
}
exports.default = OptimizeDatabase;
