export default function Edit(){
    document.querySelector("form").addEventListener("click", performEdit);
    document.querySelector("#test").addEventListener("click", test);
}

function performEdit(event){
    event.preventDefault();

    const id = document.querySelector("#submit").getAttribute("target").trim();

    if(typeof id === "undefined" || id.length === 0){
        console.error("Unable to find id or invalid id!");
    } else {
        alert("Submit!");
    }

    return false;
}

function test(event){
    const name = document.querySelector("#card").value;
    const start = Date.now();

    getCardByName(name).then(resp=>{
        if(resp){
            console.log(resp);
        } else {
            alert("Card Not Found!");
        }
        const end = Date.now();
        console.log(end - start);
    })
}

async function getCardByName(name){
    let shardName = "?";

    const match = name.match(/[a-zA-Z0-9_]/);
    if(match)
        shardName = match[0];

    const shard = await getShard(shardName);

    if(shard === null)
        return null;

    const lines = shard.split("\n");
    const names = shard.match(/(?<="name":").*?(?=")/gm);

    for(let i=0; i<names.length; i++){
        if(names[i] === name){
            return JSON.parse(lines[i].trim());
        }
    }

    return null;
}

async function getShard(shard){
    const response = await fetch("/cards/"+shard);

    if(response.status !== 200)
        throw new Error("Unable to load file: " + response.statusText);

    const fileText = await response.text();

    if(fileText.match("<!DOCTYPE html>"))
        return null;

    return fileText;
}