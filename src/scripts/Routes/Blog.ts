/** /Router/Blog.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, render} from "../App";
import Database from "../Util/Database";
import { cache } from "../Util/Memory";

const PAGENATION_SIZE = 25;

/** Blog Module
 * 
 */
export const Blog = new Router("Blog", "A Blog from Alex.");

Blog.use("/:page?",async(ctx: Context)=>{
    //const database = await Database();

    let page: string = ctx.params.get("page");
    let currentPage: number = Number(page);
    if(page === "undefined")
        currentPage = 0;

    let maxPages: number = 5; //Math.floor((await database.countCollection("Blog")) / PAGENATION_SIZE);

    if(isNaN(currentPage) || currentPage < 0) {
        return ctx.reRoute("/Blog");
    } else if(currentPage > maxPages){
        return ctx.reRoute(`/Blog/${maxPages}`);
    }

    ctx.body = "Comming Soon!";

    /* const results = await database.queryCollection("Blog", {
        orderBy: ["postDate", "desc"],
        startAt: [currentPage * PAGENATION_SIZE],
        limit: [PAGENATION_SIZE]
    });
 
    ctx.body = await render("", {
        results: results,
        page: currentPage+1,
        pageCount: maxPages
    });*/
});
