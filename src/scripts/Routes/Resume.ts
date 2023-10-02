/** /Routes/Resume.ts
 * 
 */
import {Context, Module, render, sleep, HtmlError} from "../App";
import { getResume } from "../Util/Database";
import { cache } from "../Util/Memory";

/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Module("Resume", "Alex's resume and other skills.");
Resume.path = "/Resume/:page?";

let results: any;

Resume.onLoad(async()=>{
    results = await cache("Resume", getResume);
    if(results.unknown.length > 0){
        console.warn(results.unknown);
    }
});

Resume.onRender(async(ctx: Context)=>{
    while(typeof results === "undefined")
        await sleep();

    let page:string = ctx.params.get("page");

    switch(page){
        case "Jobs":
            page = "resume/allJobs.html";
            break;
        
        case "Schools":
            page = "resume/allSchools.html";
            break;

        case "Skills":
            page = "resume/allSkills.html";
            break;

        case "undefined":
            page = "resume.html";
            break;

        default:
            throw new HtmlError(404, `Unknown page '${page}' in Resume!`);
    }

    ctx.body = await render(page, results);
});