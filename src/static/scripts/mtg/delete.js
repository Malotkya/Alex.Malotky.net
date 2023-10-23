export default function Delete(){
    document.querySelectorAll(".delete").forEach(button=>{
        button.addEventListener("click", event=>{
            const id = event.target.getAttribute("target");

            if(id){
                event.preventDefault();
                event.stopPropagation();
                if( confirm("Are you sure you want to delete the deck?") ){
                    window.route("/Decks/Editor/Delete/" + id);
                }
            } else {
                console.warn("There was an issue finding the ID!");
            }
        });
    });
}