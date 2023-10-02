/** /Routes/Resume.ts
 * 
 */
import {Context, Module, render, sleep} from "../App";
import { getResume, ResumeResults } from "../Util/Database";
import { cache } from "../Util/Memory";

/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Module("Resume", "Alex's resume and other skills.");
export const resumePath = "/Resume/:page?";

let results: ResumeResults;

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
            throw new Error(`Unknown Resume Page '${page}'!`)
    }

    ctx.body = await render(page, results);
});