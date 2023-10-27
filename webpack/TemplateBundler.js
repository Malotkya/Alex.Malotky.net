const fs = require("fs");
const path = require("path");

function TemplateBundler(build, source){
    return (dir) => {
        const output = [];
        for(let module of fs.readdirSync( path.join(source, dir))){
            const directory = path.join(source, dir, module);
            for(let file of fs.readdirSync(directory)){
                switch (file){
                    case "static":
                        output.push({
                            to: build,
                            from: path.join(directory, file)
                        });
                        break;
                    
                    case "views":
                    case "view":
                        output.push({
                            to: path.join(build, "templates", module),
                            from: path.join(directory, file)
                        });
                        break;

                    case "index.html":
                        output.push({
                            to: path.join(build, "templates", module+".html"),
                            from: path.join(directory, file)
                        });
                        break;
                }
            }
        }

        return output;
    }
}

module.exports = TemplateBundler;