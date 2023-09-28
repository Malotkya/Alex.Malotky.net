/** /Routes/Resume.ts
 * 
 */
import Router from "../App/Core/Router";
import {getResume} from "../Database";
import {render, sleep} from "../App";

/** Resume Router
 * 
 * @author Alex Malotky
 */
/*export const Resume = new Router("/Resume/:page", "Resume", "Alex's resume and other skills.");

let results: any;

Resume.onLoad(async()=>{
    results = await getResume();
    console.debug(results);
});

Resume.onRender(async(args:any)=>{
    while(typeof results === "undefined")
        await sleep(5);

    if(typeof args.page === "undefined")
        args.page = "all";

    return render("resume.html", {
        page: args.page,
        results: results
    });
});
*/