import { Authentication } from "/firebase.js";

export default function LogIn() {
    Authentication.getCurrentUser().then(user=>{
        if(user) {
            location.reload();
        } else {
            document.querySelector("form").addEventListener("submit", performLogin);
        }
    });
}

function performLogin(event){
    event.preventDefault();

    const username = event.target.querySelector("#username").value.trim();
    const password = event.target.querySelector("#password").value.trim();
    
    if(username === "") {
        printErrorMessage("Please Enter a Username!");
    } else if(password === "") {
        printErrorMessage("Please Enter a Password!")
    } else {
        Authentication.signInUser(username, password).then(user=>{
            if(user) {
                location.reload();
            } else {
                printErrorMessage("Unable to login!");
            }
        }).catch(err =>{
            printErrorMessage("Wrong Username or Password!");
        })
    }

    return false;
}

function printErrorMessage(message){
    const htmlMessage = document.querySelector("#errorMessage");

    if(htmlMessage)
        htmlMessage.textContent = message;

    console.error(message);
}