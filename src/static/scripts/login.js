export default function LogIn(){
    import("/firebase.js").then(auth=>{
        auth.getCurrentUser().then(user=>{
            if(user) {
                location.reload();
            } else {
                document.querySelector("form").addEventListener("submit", performLogin);
            }
        })
    });
}

function performLogin(event){
    event.preventDefault();
    import("/firebase.js").then(auth=>{
        const username = event.target.querySelector("#username").value;
        const password = event.target.querySelector("#password").value;

        auth.signInUser(username, password).then(user=>{
            if(user) {
                location.reload();
            } else {
                //Print Error
            }
        })
    });
    return false;
}