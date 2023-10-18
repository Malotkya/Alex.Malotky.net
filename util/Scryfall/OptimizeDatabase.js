"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function OptimizeDatabase(filename) {
    return new Promise((resolve, reject) => {
        const sections = {};
        const file = fs_1.default.createReadStream(filename);
        let buffer = "";
        file.on('data', (chunck) => {
            buffer += chunck.toString();
            let index = buffer.indexOf("\n");
            while (index >= 0) {
                const card = JSON.parse(buffer.slice(0, index).trim());
                const match = card.name.match(/[a-zA-Z0-9_]/);
                let s = "?";
                if (match) {
                    s = match[0];
                }
                if (typeof sections[s] === "undefined")
                    sections[s] = [];
                sections[s].push(card);
                buffer = buffer.slice(index + 1);
                index = buffer.indexOf("\n");
            }
        });
        file.on('error', (err) => {
            reject(err);
        });
        file.on('close', () => {
            resolve(sections);
        });
    });
}
exports.default = OptimizeDatabase;
