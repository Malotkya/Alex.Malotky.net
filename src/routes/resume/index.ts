/** /Routes/Resume.ts
 * 
 */
import {Context, Router, importModule, HtmlError} from "../../backend/App";
import Database from "../../util/Database";
import { cache } from "../../util/Memory";



/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Router("Resume", "Alex's resume and other skills.");

Resume.use("/:page", async(ctx: Context)=>{
    const page:string = ctx.get("page");
    
    const results = await cache(page, async()=>{
        const database = await Database();
        return database.queryCollection(page)
    });
    
    if(typeof results === "undefined")
        throw new HtmlError(404, `Unknown page ${page} in Resume!`);

    ctx.body = await importModule("resume", {
        type: page,
        result: results
    });
});

Resume.use("/:page/:id", async(ctx: Context)=>{
    const page:string = ctx.get("page");
    const id:string = ctx.get("id");

    const result:any = await cache(`${page}(${id})`, async ()=>{
        const database = await Database();
        return database.getDocument(page, id)
    });

    if(typeof result === "undefined")
        throw new HtmlError(404, `Unknown page id '${id}' on page ${page} in Resume!`);
           
    ctx.body = await importModule("resume", {
        type: page,
        result: result
    });
});

Resume.use("/", async(ctx: Context)=>{
    const results = await cache("Resume", async()=>{
        const database = await Database();

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

    ctx.body = await importModule("resume", results);
});