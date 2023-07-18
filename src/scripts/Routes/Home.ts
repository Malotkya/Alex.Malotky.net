import Router from "../App/Router";
import {render, sleep} from "../App";

/** Home Router
 * 
 * @author Alex Malotky
 */
export const Home = new Router("/", "Home", "");

const WELCOME_TEXT = "";
const TEXT_DELAY = 15;//ms

Home.onRender(()=>render("home.html"));

Home.onConnected(async()=>{
    const element: HTMLElement = document.querySelector("#text-target");

    if(element){
        let text: string = element.textContent.trim();
        element.textContent = "";
        
        return {
            text: text,
            element: element
        };

    } else {
        console.error("Unable to find text element!");
    }
});

Home.onReady(async(args: any)=>{

    if(args.text && args.element){

        for(let char of args.text){
            args.element.textContent += char;
            await sleep(TEXT_DELAY);
        }
    }
})