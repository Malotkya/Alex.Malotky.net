import Router from "../App/Router";
import {render, sleep} from "../App";

/** Home Router
 * 
 * @author Alex Malotky
 */
export const Home = new Router("/", "Home", "");

const TEXT_DELAY = 15;//ms
let targetElement: HTMLElement;
let animatedText: string;

Home.onRender(()=>render("home.html"));

Home.onConnected(async()=>{
    targetElement = document.querySelector("#text-target");

    if(targetElement){
        animatedText = targetElement.textContent.replace(/\\n/gm, "\r\n").trim();
        targetElement.style.height = `${targetElement.offsetHeight}px`;
        targetElement.textContent = "";
        
    } else {
        console.error("Unable to find text element!");
    }
});

Home.onReady(async()=>{

    if(targetElement && animatedText){
        for(let char of animatedText){
            targetElement.textContent += char;
            await sleep(TEXT_DELAY);
        }
    }
})