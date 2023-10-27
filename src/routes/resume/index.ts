/** /Routes/Resume.ts
 * 
 */
import {Context, Router, render, HtmlError} from "../../backend/App";
import Database from "../../util/Database";
import { cache } from "../../util/Memory";



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
    
    const results = await cache(page, ()=>database.queryCollection(page));

    ctx.body = await render(file, {list: results});
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

    const result:any = await cache(`${page}(${id})`, ()=>database.getDocument(page, id));

    if(typeof result === "undefined")
        throw new Error("Unable to find id: " + id);
           
    ctx.body = await render(file, result);
});

Resume.use("/", async(ctx: Context)=>{
    const database = await Database();

    const results = await cache("Resume", async()=>{
        return {
            schools: await database.queryCollection("School", {
                orderBy: ["graduated", "desc"],
                limit: [2]
            }),
            jobs: await database.queryCollection("Jobs", {
                orderBy: ["startDate", "desc"],
                limit: [2]
            }),
            skills: await database.queryCollection("Skills"),
        };
    });

    ctx.body = await render("resume.html", results);
});