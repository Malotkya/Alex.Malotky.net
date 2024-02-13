/** Scryfall/ImportStream
 * 
 * @author Alex Malotky
 */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const {Transform} = require("stream");
const ScryfallCard_1 = __importDefault(require("./ScryfallCard"));

/** Import Stream
 * 
 * Takes Lines of JSON data and creates/ passes on card objects
 */
class ImportStream extends Transform {

    /** Constructor
     * 
     */
    constructor() {
        super();
        this.buffer = "";
        this.count = 0;
    }

    /** Process Scryfall Card Object
     * 
     * @param {any} object 
     */
    processCard(object) {
        let card = new ScryfallCard_1.default(object).toString();
        if (card != "delete")
            this.push(card.toString() + "\n");
        this.emit("inc");
    }

    /** Process line of stream
     * 
     * @param {string} line 
     */
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

    /** Transform Stream Override
     * 
     * @param {Buffer} data 
     * @param {string} encoding 
     * @param {Function} callback 
     */
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
