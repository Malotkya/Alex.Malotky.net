"use strict";
const path = require("path");
const fs = require("fs");
const OptimizeDatabase = require("../util/Scryfall/OptimizeDatabase");

const src = path.join(process.cwd(), "cards.db");
const dest = path.join(process.cwd(), "build", "cards");

class SpliceWebpackPlugin {
    apply(compiler){
        compiler.hooks.run.tapPromise("SplicePlugin", (compilation)=>{
            return new Promise((res, rej)=>{
                fs.mkdirSync(dest, { recursive: true });

                OptimizeDatabase.default(src).then((sections)=>{
                    for(let cat in sections){
                        fs.writeFileSync(path.join(dest, cat), sections[cat].map(card=>JSON.stringify(card)).join("\n"));
                    }
                    res();
                }).catch(rej);
            });
        });
    }
}
module.exports = SpliceWebpackPlugin;