/** /Routes/Resume.ts
 * 
 */
import {Context, Module, render, sleep} from "../App";
import { getResume } from "../Util/Database";
import { cache } from "../Util/Memory";

/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Module("Resume", "Alex's resume and other skills.");

let results: any;

Resume.onLoad(async()=>{
    results = await cache("Resume", getResume);
    console.debug(results);
});

Resume.onRender(async(ctx: Context)=>{
    while(typeof results === "undefined")
        await sleep(5);

    let page:string = ctx.params.get("page");

    if(typeof page === "undefined")
        page = "all";

    ctx.body = await render("resume.html", {
        page: page,
        results: results
    });
});