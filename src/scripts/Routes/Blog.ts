/** /Router/Blog.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, render, sleep} from "../App"

/** Blog Module
 * 
 */
export const Blog = new Router("Blog", "A Blog from Alex.");
Blog.path = "/Blog/:page?";

Blog.use(async(ctx: Context)=>{
    let page: number = Number(ctx.params.get("page"));
    if(isNaN(page))
        page = 0;

    ctx.body = await render("");
});
