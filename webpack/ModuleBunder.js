const fs = require("fs");
const path = require("path");

function ModuleBundler(build, source){
    return (dir) => {
        const output = {};

        for(let module of fs.readdirSync( path.join(source, dir))){
            const directory = path.join(source, dir, module);
            for(let file of fs.readdirSync(directory)){
                if(file === "module.ts") {
                    output[module] = path.join(directory, "module.ts");
                }
            }
        }

        return output;
    }
}

module.exports = ModuleBundler;