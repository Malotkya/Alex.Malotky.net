"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
class OptimizeStream extends stream_1.Transform {
    constructor() {
        super();
        this.database = [];
        this.buffer = "";
        this.count = 0;
    }
    find(name) {
        for (let i = 0; i < this.database.length; i++) {
            if (this.database[i].name == name)
                return i;
        }
        return -1;
    }
    processLine(line) {
        try {
            let object = JSON.parse(line);
            let index = this.find(object.name);
            if (index == -1) {
                this.database.push(object);
            }
            else {
                for (let prop in object.sets) {
                    if (this.database[index].sets[prop])
                        throw new Error(JSON.stringify(object, null, 2));
                    else
                        this.database[index].sets[prop] = object.sets[prop];
                }
            }
        }
        catch (error) {
            this.emit("log", error.message + ": " + line);
        }
        console.log("O: " + this.count++);
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
    _flush(callback) {
        let index = 0;
        this.database.forEach((card) => {
            //Sort sets alphabetically
            card.sets = Object.keys(card.sets)
                .sort().reduce((object, prop) => {
                object[prop] = card.sets[prop];
                return object;
            }, {});
            this.push(JSON.stringify(card) + "\n");
            console.log("S: " + index++);
        });
        callback();
    }
}
exports.default = OptimizeStream;
