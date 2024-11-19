/** /routes/Blog.ts
 * 
 * @author Alex Malotky
 */
import {Context, HttpError, Router} from "zim-engine";
import styles from "./style.scss";
import BlogResults from "./view";
import Post, {ViewPost, EditPost, validatePost} from "./view/post";

const PAGE_SIZE = 30;

/** Blog Router
 * 
 */
export const Blog = new Router("/Blog");

const Editor = new Router("/Edit");
Blog.use(Editor);

Editor.use(async(ctx:Context) =>{
    const user = await ctx.getAuth();

    if( user === null ){
        ctx.redirect("/Login");
    }
});

Editor.delete("/:id", async(ctx:Context)=>{
    await ctx.env.DB.prepare("DELETE FROM Blog WHERE id = ?")
        .bind(ctx.params.get("id")).run();

    ctx.redirect("/Blog/Edit");
});

Editor.get("/New", async(ctx:Context)=>{
    const id = Date.now();

    await ctx.env.DB.prepare("INSERT INTO Blog(id) VALUES(?)")
        .bind(id).run();

    ctx.redirect(`/Blog/Edit/${id}`);
});

Editor.post("/:id", async(ctx:Context)=>{
    const id = Number(ctx.params.get("id")!);

    const title = ctx.formData.get("title");
    if(title === undefined)
        throw new HttpError(400, "Must set title value!");

    const content = ctx.formData.get("content");
    if(content === undefined)
        throw new HttpError(400, "Must set content value!");

    try {
        await ctx.env.DB.prepare("UPDATE Blog Set title = ?, content = ? WHERE id = ?")
                .bind(title, content, id).run();
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
            main: EditPost({id, title, content})
        }
    });
});



Editor.get("/:id", async(ctx:Context)=>{
    const id = ctx.params.get("id")!;

    let post:Post|null;
    try {
        post = await ctx.env.DB.prepare("SELECT * FROM Blog WHERE id = ?")
                        .bind(id).first();
    } catch (e){
        throw new HttpError(500, "There was a problem getting the Blog Post!");
    }

    if(post === null) {
        throw new HttpError(404, `Unable to find Blog Post iwht id '${id}'!`);
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
    let page = Number(ctx.search.get("page"));
    if(isNaN(page) || page < 0)
        page = 0;
    else
        --page;

    const {results, error} = await ctx.env.DB.prepare("SELECT * FROM Blog ORDER BY id DESC LIMIT ? OFFSET ?")
            .bind(PAGE_SIZE, PAGE_SIZE * page).all();

    if(error)
        throw error;

    ctx.render({
        head: {
            styles,
            title: "Blog Posts",
            meta: {
                description: "List of Blog Posts to edit."
            }
        },
        body: {
            main: BlogResults(results.map(validatePost), true)
        }
    });
});

Blog.get("/:id", async(ctx:Context)=>{
    const id = ctx.params.get("id")!;

    let post:Post|null;
    try {
        post = await ctx.env.DB.prepare("SELECT * FROM Post where id = ?")
                .bind(id).first();
    } catch (e){
        throw new HttpError(500, "There was a problem getting the Blog Post!");
    }

    if(post === null)
        throw new HttpError(404, `Unable to find Blog Post iwht id '${id}'!`);
    
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
    let page = Number(ctx.search.get("page"));
    if(isNaN(page) || page < 0)
        page = 0;
    else
        --page;

    const {results, error} = await ctx.env.DB.prepare("SELECT * FROM Decks ORDER BY id DESC LIMIT ? OFFSET ?")
            .bind(PAGE_SIZE, PAGE_SIZE * page).all();

    if(error)
        throw error;

    ctx.render({
        head: {
            styles,
            title: "Blog",
            meta: {
                description: "List of blog posts."
            }
        },
        body: {
            main: BlogResults(results.map(validatePost))
        }
    })
});