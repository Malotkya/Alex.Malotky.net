/** /Routes/Resume.ts
 * 
 */
import {Context, Router, render, HtmlError} from "../App";
import Database, { getResume } from "../Util/Database";
import { cache } from "../Util/Memory";

/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Router("Resume", "Alex's resume and other skills.");

Resume.use("/:page", async(ctx: Context)=>{
    const database = await Database();

    let page:string = ctx.params.get("page");
    let file:string;

    switch(page){
        case "Jobs":
            file = "resume/allJobs.html";
            break;

        case "School":
            file = "resume/allSchools.html";
            break;

        case "Skills":
            file = "resume/allSkills.html";
            break;

        default:
            throw new HtmlError(404, `Unknown page ${page} in Resume!`);
    }     

    ctx.body = await render(file, {list: await database.queryCollection(page)});
});

Resume.use("/:page/:id", async(ctx: Context)=>{
    const database = await Database();

    let page:string = ctx.params.get("page");
    let id:string = ctx.params.get("id");
    let file:string;

    switch(page){
        case "Jobs":
            file = "resume/detailedJob.html";
            break;

        case "School":
            file = "resume/detailedSchool.html";
            break;

        case "Skills":
            file = "resume/detailedSkill.html";
            break;

        default:
            throw new HtmlError(404, `Unknown page ${page} in Resume!`);
    }

    const result:any = await database.getDocument(page, id);

    if(typeof result === "undefined")
        throw new Error("Unable to find id: " + id);

    console.log(result);
           
    ctx.body = await render(file, result);
});

Resume.use("/", async(ctx: Context)=>{
    ctx.body = await render("resume.html", await cache("Resume", getResume));
});