/** Scryfall/OptimizeStream
 * 
 * @author Alex Malotky
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const {Transform} = require("stream");

/** Optimize Stream
 * 
 * Takes all cards with the same name, and converts them all to a single object.
 */
class OptimizeStream extends Transform {

    /** Constructor
     * 
     */
    constructor() {
        super();
        this.database = [];
        this.buffer = "";
    }

    /** Find Index of Card by Name
     * 
     * @param {string} name 
     * @returns {number}
     */
    find(name) {
        for (let i = 0; i < this.database.length; i++) {
            if (this.database[i].name == name)
                return i;
        }
        return -1;
    }

    /** Process line of stream
     * 
     * @param {string} line 
     */
    processLine(line) {
        try {
            let object = JSON.parse(line);
            let index = this.find(object.name);
            if (index == -1) { //New Card
                this.database.push(object);
            }
            else { //Existing Card
                for (let prop in object.sets) {
                    if (this.database[index].sets[prop]) //If duplicat set
                        throw new Error(JSON.stringify(object, null, 2));
                    else
                        this.database[index].sets[prop] = object.sets[prop];
                }
            }
        }
        catch (error) {
            this.emit("log", error.message + ": " + line);
        }
        this.emit("inc", "optimized");
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

    /** Flush Stream Override
     * 
     * @param {Function} callback 
     */
    _flush(callback) {
        this.database.forEach((card) => {
            //Sort sets alphabetically
            card.sets = Object.keys(card.sets)
                .sort().reduce((object, prop) => {
                object[prop] = card.sets[prop];
                return object;
            }, {});
            this.push(JSON.stringify(card) + "\n");
            this.emit("inc", "saved");
        });
        callback();
    }
}
exports.default = OptimizeStream;
