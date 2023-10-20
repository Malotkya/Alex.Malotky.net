"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function OptimizeDatabase(filename) {
    return new Promise((resolve, reject) => {
        const sections = {};
        let count = 0;
        const update = (refresh = true) => {
            console.log("Cards Seperated: " + count);
            if (refresh)
                process.stdout.moveCursor(-100, -1);
        };
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
                    s = match[0].toUpperCase();
                }
                if (typeof sections[s] === "undefined")
                    sections[s] = [];
                sections[s].push(card);
                count++;
                update();
                buffer = buffer.slice(index + 1);
                index = buffer.indexOf("\n");
            }
        });
        file.on('error', (err) => {
            reject(err);
        });
        file.on('close', () => {
            update(false);
            resolve(sections);
        });
    });
}
exports.default = OptimizeDatabase;
