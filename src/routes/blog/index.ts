/** /routes/Blog.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, importModule} from "../../backend/App";
import Authentication from "../../util/Authentication";
import Database from "../../util/Database";
import { cache } from "../../util/Memory";

const DATABASE_NAME = "Blog";

/** Blog Router
 * 
 */
export const Blog = new Router ("Blog", "Alex's thoughts and ideas.");

const Editor = new Router("Blog Editor");
Editor.use("*", async(ctx:Context) =>{
    const auth = await Authentication();

    if( !(await auth.getCurrentUser()) ){
        ctx.reRoute("/Login");
    }
});

Editor.use("/Delete/:id", async(ctx:Context)=>{
    const database = await Database();
    database.deleteDocument(DATABASE_NAME, ctx.get("id"));
    ctx.reRoute("/Blog/Edit");
});

Editor.use("/Update/:id", async(ctx:Context)=>{
    const database = await Database();

    try {
        const post = ctx.params.get("post");
        const id = ctx.get("id");

        if(post === undefined)
            throw new Error("Update information not in body!");

        await database.updateDocument(DATABASE_NAME, id, JSON.parse(post));
        ctx.reRoute(`/Blog/Edit/${id}`, {post: post});

    } catch (e) {
        console.error(e);
        throw new Error("There was a probelm updating the blog post!");
    }
});

Editor.use("/New", async(ctx:Context)=>{
    const database = await Database();
    const id = await database.createDocument(DATABASE_NAME, {date: await database.now()});
    ctx.reRoute(`/Decks/Editor/${id}`);
});

Editor.use("/:id", async(ctx:Context)=>{
    const database = await Database();

    const id:string = ctx.get("id");
    const result:any = await database.getDocument(DATABASE_NAME, id);
    if(typeof result === "undefined")
        throw new Error("Unable to find id: " + id);

    ctx.body = await importModule("blog", {edit:true, item:result});
});

Editor.use(async(ctx: Context)=>{
    const database = await Database();
    const results = await database.queryCollection(DATABASE_NAME);
    ctx.body = await importModule("blog", {edit: true, item: results});
})

Blog.use("/Edit", Editor);

Blog.use("/:id", async(ctx:Context)=>{
    const id = ctx.get("id");

    const results:any = await cache(`Blog(${id})`, async()=>{
        const database = await Database();
        return await database.getDocument(DATABASE_NAME, id);
    });

    if(typeof results === "undefined"){
        throw new Error("Unable to find id: " + id);
    }

    ctx.body = await importModule("blog", {item: results});
});

Blog.use(async(ctx:Context)=> {
    const results:any = await cache(DATABASE_NAME, async()=>{
        const database = await Database();
        return await database.queryCollection(DATABASE_NAME)
    });

    ctx.body = await importModule("blog", {item: results});
});