import Router from "../App/Router";
import {getResume} from "../App/Database";
import {render, sleep} from "../App";

/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Router("/Resume", "Resume", "Alex's resume and other skills.");

let results: any;

Resume.onLoad(async()=>{
    results = await getResume();
    console.debug(results);
});

Resume.onRender(async()=>{
    while(typeof results === "undefined")
        await sleep(5);
    return render("resume.html", results);
});