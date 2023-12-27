const fs = require("fs");
const path = require("path");

function ModuleBundler(build, source){
    return (dir) => {
        const modules = {};
        const files = [];

        for(let module of fs.readdirSync( path.join(source, dir))){
            const directory = path.join(source, dir, module);
            const name = path.join("module", module);

            for(let file of fs.readdirSync(directory)){
                switch (file){
                    case "static":
                        files.push({
                            to: build,
                            from: path.join(directory, file)
                        });
                        break;
                    
                    case "module.ts":
                        modules[name] = path.join(directory, "module.ts");
                        break;
                }
            }
        }

        return [modules, files];
    }
}

module.exports = ModuleBundler;