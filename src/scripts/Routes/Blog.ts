/** /Router/Blog.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, execute, render} from "../App";
import {getDocumentById, getBlogPage, BLOG_PAGENATION_SIZE, countDocsInCollection} from "../Util/Database";

/** Blog Module
 * 
 */
export const Blog = new Router("Blog", "A Blog from Alex.");

Blog.use(async(ctx:Context)=>{
    ctx.connected = await execute("./blog.js");
});

Blog.use("/Id/:id", async(ctx: Context)=>{
    const id:string = ctx.params.get("id");
    const result: any = await getDocumentById("Blog", id);

    if(typeof result === "undefined")
        throw new Error("Unable to find id: " + id);

    ctx.body = await render("blog/entry.html", result);
});

Blog.use("/:page?",async(ctx: Context)=>{
    let page: string = ctx.params.get("page");
    let currentPage: number = Number(page);
    if(page === "undefined")
        currentPage = 0;

    let maxPages: number = Math.floor( await countDocsInCollection("Blog") / BLOG_PAGENATION_SIZE );

    if(isNaN(currentPage) || currentPage < 0) {
        return ctx.reRoute("/Blog");
    } else if(currentPage > maxPages){
        return ctx.reRoute(`/Blog/${maxPages}`);
    }

    //ctx.body = "<h1>Blog Comming Soon!</h1>";

    const results = await getBlogPage(currentPage);
 
    ctx.body = await render("blog.html", {
        results: results,
        page: currentPage+1,
        pageCount: maxPages
    });
});
