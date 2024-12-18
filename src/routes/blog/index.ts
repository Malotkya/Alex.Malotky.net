/** /routes/blog
 * 
 * @author Alex Malotky
 */
import {Context, HttpError, Router} from "zim-engine";
import { RequireLoginHandler } from "../login";
import styles from "./style.scss";
import BlogResults from "./view";
import {ViewPost, EditPost} from "./view/post";
import Post, {BlogPost} from "./data/post";

const PAGE_SIZE = 30;

const Blog = new Router("/Blog");

const Editor = new Router("/Edit");
Editor.use("*", RequireLoginHandler);
Blog.use(Editor);

Editor.delete("/:id", async(ctx:Context)=>{
    const id = ctx.params.get("id")!;
    ctx.query(BlogPost).delete({id});
    ctx.redirect("/Blog/Edit");
});

Editor.get("/New", async(ctx:Context)=>{
    ctx.render({
        head: {
            styles,
            title: `Edit Blog Post (New)`,
            meta: {
                description: "Blog Post Editor."
            }
        },
        body: {
            main: EditPost()
        }
    });
});

Editor.post("/New", async(ctx:Context)=>{
    const post = await ctx.formData(BlogPost);
    post.id = Date.now();

    try {
        await ctx.query(BlogPost).insert(post);  
    } catch (e){
        throw new HttpError(500, "There was a problem updating the blog post!");
    }

    ctx.redirect(`/Blog/Edit/${post.id}`);
});

Editor.post("/:id", async(ctx:Context)=>{
    const id = Number(ctx.params.get("id")!);
    const post = await ctx.formData(BlogPost);

    try {
        await ctx.query(BlogPost).update(post, {id});
    } catch (e){
        throw new HttpError(500, "There was a problem updating the blog post!");
    }

    ctx.render({
        head: {
            styles,
            title: `Edit Blog Post (${id})`,
            meta: {
                description: "Blog Post Editor."
            }
        },
        body: {
            main: EditPost(post)
        }
    });
});



Editor.get("/:id", async(ctx:Context)=>{
    const id = ctx.params.get("id")!;
    const post:Post|null = await ctx.query(BlogPost).get({id});

    if(post === null) {
        throw new HttpError(404, `Unable to find Blog Post with id '${id}'!`);
    }

    ctx.render({
        head: {
            styles,
            title: `Edit Blog Post (${id})`,
            meta: {
                description: "Blog Post Editor."
            }
        },
        body: {
            main: EditPost(post)
        }
    });
});

Editor.all(async(ctx: Context)=>{
    /*let page = Number(ctx.search.get("page"));
    if(isNaN(page) || page < 0)
        page = 0;
    else
        --page;
    */

    const results = await ctx.query(BlogPost).getAll();

    ctx.render({
        head: {
            styles,
            title: "Blog Posts",
            meta: {
                description: "List of Blog Posts to edit."
            }
        },
        body: {
            main: BlogResults(results, true)
        }
    });
});

Blog.get("/:id", async(ctx:Context)=>{
    const id = ctx.params.get("id")!;
    const post:Post|null = await ctx.query(BlogPost).get({id});

    if(post === null)
        throw new HttpError(404, `Unable to find Blog Post with id '${id}'!`);
    
    ctx.render({
        head: {
            styles,
            title: `Blog | ${post.title}`,
            meta: {
                description: "Blog Post."
            }
        },
        body: {
            main: ViewPost(post)
        }
    });
});

Blog.all(async(ctx:Context)=> {
    /*let page = Number(ctx.search.get("page"));
    if(isNaN(page) || page < 0)
        page = 0;
    else
        --page;
    */

    const results = await ctx.query(BlogPost).getAll();

    ctx.render({
        head: {
            styles,
            title: "Blog",
            meta: {
                description: "List of blog posts."
            }
        },
        body: {
            main: BlogResults(results)
        }
    })
});

export default Blog;