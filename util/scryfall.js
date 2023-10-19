"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Update_1 = __importDefault(require("./Scryfall/Update"));
const OptimizeDatabase_1 = __importDefault(require("./Scryfall/OptimizeDatabase"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dest = path_1.default.join(__dirname, "cards");
const database = path_1.default.join(__dirname, "cards.db");
(0, Update_1.default)(database).then(() => {
    console.log("Download Complete!");
    fs_1.default.mkdirSync(dest, { recursive: true });
    (0, OptimizeDatabase_1.default)(database).then((sections) => {
        for (let category in sections) {
            const section = sections[category];
            fs_1.default.writeFileSync(path_1.default.join(dest, category), section.map((card) => JSON.stringify(card)).join("\n"));
        }
        console.log("Success!");
    }).catch(console.error);
}).catch(console.error);
