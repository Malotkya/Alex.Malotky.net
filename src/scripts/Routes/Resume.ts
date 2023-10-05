/** /Routes/Resume.ts
 * 
 */
import {Context, Module, render, sleep, HtmlError} from "../App";
import Database, { getResume, ResumeResults } from "../Util/Database";
import { cache } from "../Util/Memory";

/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Module("Resume", "Alex's resume and other skills.");

function fileList(page:string):string {
    switch(page){
        case "Jobs":
            return "resume/allJobs.html";

        case "School":
            return "resume/allSchools.html";

        case "Skills":
            return "resume/allSkills.html";
    }
     
    return undefined;
}

Resume.use("/:page", async(ctx: Context)=>{
    let page:string = ctx.params.get("page");
    let file:string = fileList(page);

    if(typeof file === "undefined")
        throw new HtmlError(404, `Unknown page ${page} in Resume!`);

    ctx.body = await render(file, (await Database()).getTable(page));
});

Resume.use("/", async(ctx: Context)=>{
    ctx.body = await render("resume.html", await cache("Resume", getResume));
});