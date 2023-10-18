"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const ScryfallCard_1 = __importDefault(require("./ScryfallCard"));
class ImportStream extends stream_1.Transform {
    constructor() {
        super();
        this.buffer = "";
        this.count = 0;
    }
    processCard(object) {
        let card = new ScryfallCard_1.default(object).toString();
        if (card != "delete")
            this.push(card.toString() + "\n");
        console.log("D: " + this.count++);
    }
    processLine(line) {
        try {
            //Remove Comma from line
            if (line[line.length - 1] == ",")
                line = line.slice(0, -1);
            let object = JSON.parse(line);
            this.processCard(object);
        }
        catch (error) {
            if (line != "[" && line != "]")
                this.emit("log", error.message + ": " + line);
        }
    }
    _transform(data, encoding, callback) {
        this.buffer += data.toString();
        let index = this.buffer.indexOf('\n');
        ;
        while (index >= 0) {
            if (index != 0) {
                this.processLine(this.buffer.slice(0, index).trim());
                this.buffer = this.buffer.slice(index + 1);
            }
            else {
                this.buffer = this.buffer.slice(1);
            }
            index = this.buffer.indexOf('\n');
        }
        callback();
    }
}
exports.default = ImportStream;
