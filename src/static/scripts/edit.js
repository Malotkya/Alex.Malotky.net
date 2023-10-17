export default function Edit(){
    document.querySelector("form").addEventListener("click", performEdit)
}

function performEdit(event){
    event.preventDefault();

    const id = event.target.querySelector("#submit").getAttribute("target").trim();

    if(typeof id === "undefined" || id.length === 0){
        console.error("Unable to find or invalid id!");
    } else {
        alert("Submit!");
    }

    return false;
}