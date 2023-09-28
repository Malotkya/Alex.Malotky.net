/** /Router/Home.ts
 * 
 * @author Alex Malotky
 */
import {Context, Module, render, sleep} from "../App"

/** Home Module
 *
 */
export const Home = new Module("Home");

//Message Constants
const TEXT = "Hello,\r\nMy name is Alex Malotky.";
const TEXT_DELAY = 15;//ms

Home.onRender(async(ctx:Context)=>{
    ctx.body = await render("home.html");
});

Home.onConnected(async() => {
    const targetElement = document.querySelector("#text-target");
    for(let char of TEXT){
        targetElement.textContent += char;
        await sleep(TEXT_DELAY);
    }
});