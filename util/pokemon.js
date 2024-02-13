/** Pokemon.js
 * 
 * @author Alex Malotky
 */
"use strict";
const { JSDOM } = require("jsdom");
const https = require("https");
const fs = require("fs");
const path = require("path");

//Location of Pokemon Inormation.
const URI = "https://www.serebii.net/pokemon/";

/** Download Serebi Pokemon HTML page
 * 
 * @returns {Promise<string>}
 */
function download(){
    return new Promise((resolve, reject)=>{
        https.get(URI, (response)=>{
            let buffer = "";

            response.on("data", (chunk)=>{
                buffer += chunk.toString();
            });
        
            response.on("error", (err)=>{
                reject(err);
            });
        
            response.on("close", ()=>{
                resolve(buffer);
            });
        });
    });
}

/** Expected Option Text
 * 
 */
const EXPECTED = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Alola",
    "Galar",
    "Hisui",
    "Paldea",
]

/** Check innerHTML for Region
 * 
 * @param {string} string 
 * @returns {boolean}
 */
function check(string){
    for(let region of EXPECTED) {
        if(string.includes(region))
            return true;
    }

    return false;
}

/** Generate List of Pokemon
 * 
 * @returns {Array<string>}
 */
function generateList(){
    return new Promise((resolve, reject)=>{
        download().then(blob=>{
            const {document} = (new JSDOM(blob)).window;
            const masterList = [];
        
            try {
                document.querySelectorAll("select").forEach(select=>{
                    const list = select.querySelectorAll("option");
                    const test = list[0];
                    
                    if( check(test.innerHTML) ){
                        for(let i=1; i<list.length; i++) {
                            masterList.push(list[i].innerHTML);
                        }
                    }
                });
            } catch (err){
                reject(err);
            }
            
        
            resolve(masterList.map(item=>item.replace(/^\d+\s+/gs, "")));
        
        }).catch(reject);
    })
}

generateList().then(list=>{
    const target = path.join(process.cwd(), "pokemon.json");
    fs.writeFileSync(target, JSON.stringify(list, null, 2));
    console.log("Download Complete!");
});

