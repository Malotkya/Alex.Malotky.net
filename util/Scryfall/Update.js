"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadUpdate = exports.GetDatabaseMetadata = exports.CheckForUpdate = void 0;
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const ImportStream_1 = __importDefault(require("./ImportStream"));
const OptimizeStream_1 = __importDefault(require("./OptimizeStream"));
function CheckForUpdate(compare) {
    return new Promise((resolve, reject) => {
        https_1.default.get("https://api.scryfall.com/bulk-data", (res) => {
            let buffer = "";
            res.on("data", data => {
                buffer += data.toString();
            });
            res.on("error", (err) => {
                reject(err);
            });
            res.on("close", () => {
                try {
                    let responce = JSON.parse(buffer);
                    responce.data.forEach((object) => {
                        if (object.type == "all_cards") {
                            if (new Date(object.updated_at).valueOf() > new Date(compare).valueOf()) {
                                resolve(object.download_uri);
                            }
                            else {
                                resolve(null);
                            }
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }
                reject(new Error("all_cards not found!"));
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}
exports.CheckForUpdate = CheckForUpdate;
function GetDatabaseMetadata(database) {
    return new Promise((resolve, reject) => {
        fs_1.default.stat(database, (error, stats) => {
            if (error !== null) {
                if (error.code === "ENOENT")
                    resolve(new Date(0).toUTCString());
                else
                    reject(error);
            }
            else {
                resolve(stats.ctime.toUTCString());
            }
        });
    });
}
exports.GetDatabaseMetadata = GetDatabaseMetadata;
function DownloadUpdate(uri) {
    return new Promise((resolve, reject) => {
        const fileName = "temp.db";
        const fileStream = fs_1.default.createWriteStream(fileName);
        let download = 0;
        let saved = 0;
        let optimized = 0;
        const update = (refresh = true) => {
            process.stdout.write("Cards Downloaded: " + download + "\n" +
                " Cards Optimized: " + optimized + "\n" +
                "     Cards Saved: " + saved + "\n");
            if (refresh)
                process.stdout.write(`\u001b[${3}A`);
        };
        https_1.default.get(uri, (response) => {
            response.pipe(new ImportStream_1.default())
                .on("log", (message) => {
                console.log(message);
            }).on("inc", () => {
                download++;
                update();
            }).on("error", (error) => {
                reject(error);
            }).pipe(new OptimizeStream_1.default())
                .on("log", (message) => {
                console.log(message);
            }).on("inc", (type) => {
                if (type === "saved") {
                    saved++;
                    update();
                }
                else if (type === "optimized") {
                    optimized++;
                    update();
                }
                else {
                    console.log(type);
                }
            }).on("error", (error) => {
                reject(error);
            }).pipe(fileStream)
                .on("error", (error) => {
                reject(error);
            }).on("close", () => {
                update(false);
                resolve(fileName);
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}
exports.DownloadUpdate = DownloadUpdate;
function Update(database) {
    return new Promise((resolve, reject) => {
        GetDatabaseMetadata(database).then((data) => {
            CheckForUpdate(data).then((uri) => {
                console.log(uri);
                if (typeof uri === "string") {
                    DownloadUpdate(uri).then((fileName) => {
                        try {
                            fs_1.default.unlinkSync(database);
                        }
                        catch (err) {
                            //Don't care if the file doesn't exsist
                        }
                        try {
                            fs_1.default.renameSync(fileName, database);
                        }
                        catch (err) {
                            reject(err);
                        }
                        resolve();
                    }).catch(reject);
                }
                else {
                    resolve();
                }
            }).catch(reject);
        }).catch(reject);
    });
}
exports.default = Update;
