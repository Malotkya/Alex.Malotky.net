/** /Routes/Resume.ts
 * 
 */
import {Context, Module, render, sleep} from "../App";
import { getResume } from "../Util/Database";

/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Module("Resume", "Alex's resume and other skills.");

let results: any;

Resume.onLoad(async()=>{
    results = await getResume();
    console.debug(results);
});

Resume.onRender(async(ctx: Context)=>{
    while(typeof results === "undefined")
        await sleep(5);

    if(typeof ctx.params.page === "undefined")
        ctx.params.page = "all";

    ctx.body = await render("resume.html", {
        page: ctx.params.page,
        results: results
    });
});