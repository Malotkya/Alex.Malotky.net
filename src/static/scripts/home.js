export default async function home(){
    //Message Constants
    const TEXT = "Hello,\r\nMy name is Alex Malotky.";
    const TEXT_DELAY = 15;//ms

    //Target Element
    const targetElement = document.querySelector("#text-target");

    if(typeof window.visited === "undefined"){
        window.visited = true;
        console.log("Welcome to Alex.Malotky.net!");
        console.log("This is being printed from a file that is being loaded and executed dynamically!")
    }

    //Animate Text
    let index = 0;
    const placeChar = () => {
        targetElement.textContent += TEXT[index++];

        if(index < TEXT.length)
            window.setTimeout(placeChar, TEXT_DELAY);
    }
    placeChar();
}