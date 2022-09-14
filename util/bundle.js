const { exec } = require("child_process");
const fs = require("fs");
const path = require("path")
const sass = require("sass");

let buildDirectory = path.join(process.cwd(), "build");

const copyDirectory = (target, source, callback) => {
    fs.readdirSync(source).forEach(file => {
        let oldFile = path.join(source, file);
        let newFile = path.join(target, file);

        const log = msg => {
            if (callback)
                callback(msg);
        }

        if (fs.lstatSync(oldFile).isDirectory()) {
            copyDirectory(newFile, oldFile, callback);
        } else {
            
            switch (path.extname(oldFile)) {
                case ".ts":
                    //Do Nothing;
                    break;

                case "scss":
                    //Compile:

                    let buffer = sass.compile(oldFile, { style: "compressed" });
                    fs.writeFileSync(newFile, buffer.css);
                    log(oldFile);
                    break;

                case ".js":
                case ".ejs":
                case ".json":
                default:
                    //Copy Files:

                    fs.cpSync(oldFile, newFile);
                    log(oldFile);
                    break;

            }
        }
    })
}

const sourceDirectory = path.join(process.cwd(), "src");
const publicJSDirectory = path.join(process.cwd(), "public", "javascripts");
const publicMediaDirectory = path.join(process.cwd(), "public", "media");
const masterCssFile = path.join(process.cwd(), "public", "stylesheets", "master.scss");
const buildCss = path.join(buildDirectory, "public", "stylesheets");

console.log("Deleting old Build Directory...");
fs.rmSync(buildDirectory, { recursive: true, force: true });

console.log("\nParsing src Directory...");
copyDirectory(buildDirectory, sourceDirectory, console.log);

console.log("\nParsing Public Directory...");
copyDirectory(path.join(buildDirectory, "public", "javascripts"), publicJSDirectory, console.log);
copyDirectory(path.join(buildDirectory, "public", "media"), publicMediaDirectory, console.log);

let buffer = sass.compile(masterCssFile, { style: "compressed" });
fs.mkdirSync(buildCss);
fs.writeFileSync(path.join(buildCss, "master.min.css"), buffer.css);
console.log(masterCssFile);

console.log("\nOther Files...")
fs.cpSync("package.json", path.join(buildDirectory, "package.json"));
console.log(path.join(process.cwd(), "package.json"));

console.log("\nNode Modules for Testing...");
copyDirectory(path.join(buildDirectory, "node_modules"), path.join(process.cwd(), "node_modules"));

console.log("\nCompiling Typescript...");
exec("tsc", (error, stdout, stderr) => {
    if (error)
        console.error(error);

    if (stdout)
        console.log(stdout);

    if (stderr)
        console.error(stderr);
});

