/** /Routes/Resume.ts
 * 
 */
import {Context, Router, importModule, render, HtmlError} from "../../backend/App";
import Database from "../../util/Database";
import { cache } from "../../util/Memory";



/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Router("Resume", "Alex's resume and other skills.");

Resume.use("/:page", async(ctx: Context)=>{
    const database = await Database();

    const page:string = ctx.get("page");
    
    const results = await cache(page, ()=>database.queryCollection(page));
    if(typeof results === "undefined")
        throw new HtmlError(404, `Unknown page ${page} in Resume!`);

    ctx.module = await importModule("resume", {
        type: page,
        arr: results
    });
});

Resume.use("/:page/:id", async(ctx: Context)=>{
    const database = await Database();

    const page:string = ctx.get("page");
    const id:string = ctx.get("id");

    const result:any = await cache(`${page}(${id})`, ()=>database.getDocument(page, id));
    if(typeof result === "undefined")
        throw new HtmlError(404, `Unknown page id '${id}' on page ${page} in Resume!`);
           
    ctx.module = await importModule("resume", {
        type: page,
        arr: result
    });
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

    ctx.module = await importModule("resume", results);
});