import Router from "../App/Router";
import {render, sleep} from "../App";

/** Home Router
 * 
 * @author Alex Malotky
 */
export const Home = new Router("/", "Home", "");

const WELCOME_TEXT = "Hello,\nMy name is Alex Malotky.";
const TEXT_DELAY = 15;//ms

Home.onLoad(()=>render("home.html"));

Home.onConnected(async()=>{
    const element: HTMLElement = document.querySelector("#text-target");

    if(element){
        
        for(let char of WELCOME_TEXT){
            element.textContent += char;
            await sleep(TEXT_DELAY);
        }

    } else {
        console.error("Unable to find text element!");
    }
});