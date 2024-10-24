/** /Routes/Resume
 * 
 * @author Alex Malotky
 */
import { Router, Middleware, Content, Context } from "Engine";
import HttpError from "Engine/HttpError";
import ResumeView , { SingleView, ListView, SingleEditView, ListEditView, EditMainView, ROUTE } from "./view";
import { validateSchoolItem } from "./view/school";
import { validateJobItem } from "./view/job";
import { validateSkillItem } from "./view/skill";
import { UPDATE_QUERY, INSERT_QUERY, TABLES, ORDER_BY, DELETE, queryWrapper } from "./database";
import styles from "./style.scss";

const DESCRIPTION = "Alex's resume and other skills.";
const title = (table:string, id?:string) => `Resume - ${table}${id? `(${id})`: ""}`;

const Resume = new Router("/Resume");
const Editor = new Router("/Edit");
Resume.use(Editor);

/** Validate Login
 * 
 */
Editor.all("*", async(ctx)=>{
    const user = await ctx.getAuth();
    if(user === null) {
        ctx.redirect("/Login");
    }
})

/** New Record Handler
 * 
 */
Editor.get("/:table/New", async(ctx)=>{
    const table = (ctx.params.get("table") as string).toLocaleLowerCase();
    return ctx.render({
        head: {
            styles,
            title: title(table, "New"),
            meta: {
                description: DESCRIPTION
            }
        },
        body: {
            main: SingleEditView(table, null)
        }
    });
});
Editor.post("/:table/New", async(ctx)=>{
    const table = (ctx.params.get("table") as string).toLocaleLowerCase();
    const id = Date.now();
    const {query, data} = INSERT_QUERY(table, ctx.formData, id);

    if(query === undefined)
        throw new HttpError(404, `Unable to find ${table}!`);
    try {
        await ctx.env.DB.prepare(query).bind(...data).run();

        return ctx.redirect(ROUTE(table, true, id));
    } catch (e){
        console.error(e);
        throw new HttpError(500, "There was a problem updating from the database!");
    }
});


/** Query Table Handler
 * 
 */
function QueryTable(view:(t:string, r:Record<string,unknown>[])=>Content):Middleware {
    return async function handleTableQuery(ctx){
        const table = (ctx.params.get("table") as string).toLocaleLowerCase();
        let query = TABLES[table];
    
        if(query === undefined){
            throw new HttpError(404, `Unable to find ${table}!`);
        }
    
        query += ORDER_BY[table];
    
        try {
            const {results, error} = await ctx.env.DB.prepare(query).all();
    
            if(error)
                throw error;
    
            ctx.render({
                head: {
                    styles,
                    title: title(table),
                    meta: {
                        description: DESCRIPTION
                    },
                },
                body: {
                    main: view(table, results)
                }
            })
    
        } catch (e){
            console.error(e);
            throw new HttpError(500, "There was a problem querying the database!");
        }
        
    }
}
Resume.get("/:table", QueryTable(ListView));
Editor.get("/:table", QueryTable(ListEditView));

/** Query Record Handler
 * 
 */
function QueryRecord(view:(t:string, r:Record<string,unknown>)=>Content):Middleware {
    return async function handleTableRecord(ctx){
        const table = (ctx.params.get("table") as string).toLocaleLowerCase();
        const id = ctx.params.get("id") as string;
        let query = TABLES[table];
    
        if(query === undefined){
            throw new HttpError(404, `Unable to find ${table}!`);
        }
    
        query += "WHERE id = ?";
    
        try {
            const result = await ctx.env.DB.prepare(query).bind(id).first();
    
            if(result === null){
                throw new HttpError(404, `Unable to find id '${id}' in '${table}'!`);
            }
    
            return ctx.render({
                head: {
                    styles,
                    title: title(table, result["title"] as string || result["name"] as string || id),
                    meta: {
                        description: DESCRIPTION
                    }
                },
                body: {
                    main: view(table, result)
                }
            });
        } catch (e){
            console.error(e);
            throw new HttpError(500, "There was a problem querying the database!");
        }
    }
}
Resume.get("/:table/:id", QueryRecord(SingleView));
Editor.get("/:table/:id", QueryRecord(SingleEditView));

/** Delete Record Handler
 * 
 */
Editor.delete("/:table/:id", async(ctx:Context)=>{
    const table = (ctx.params.get("table") as string).toLocaleLowerCase();
    const id = ctx.params.get("id") as string;
    const query = DELETE[table];

    if(query === undefined)
        throw new HttpError(404, `Unable to find ${table}!`);

    try {
        await ctx.env.DB.prepare(query).bind(id).run();
        ctx.redirect(ROUTE(table, true));
    } catch (e){
        console.error(e);
        throw new HttpError(500, "There was a problem deleting from the database!");
    }
});

/** Update Record Handler
 * 
 */
Editor.post("/:table/:id", async(ctx:Context)=>{
    const table = (ctx.params.get("table") as string).toLocaleLowerCase();
    const id = ctx.params.get("id") as string;
    const {query, data, result} = UPDATE_QUERY(table, ctx.formData, id);

    if(query === undefined)
        throw new HttpError(404, `Unable to find ${table}!`);
    try {
        await ctx.env.DB.prepare(query).bind(...data).run();

        return ctx.render({
            head: {
                styles,
                title: title(table, result["title"] as string || result["name"] as string || id),
                meta: {
                    description: DESCRIPTION
                }
            },
            body: {
                main: SingleEditView(table, result, "Update Successful!")
            }
        });
    } catch (e){
        console.error(e);
        throw new HttpError(500, "There was a problem updating from the database!");
    }
});


/** Default Resume Handler
 * 
 */
Resume.get(async(ctx)=>{
    try {
        const school = await queryWrapper(ctx.env.DB, "SELECT * FROM School ORDER BY graduated DESC LIMIT 6");
        const jobs = await queryWrapper(ctx.env.DB, "SELECT * FROM Jobs ORDER BY startDate DESC LIMIT 6");
        const skills = await queryWrapper(ctx.env.DB, "SELECT * FROM Skills");
        
        ctx.render({
            head: {
                styles,
                title: "Resume",
                meta: {
                    description: DESCRIPTION
                }
            },
            body: {
                main: ResumeView(jobs.map(j=>validateJobItem(j)), school.map(s=>validateSchoolItem(s)), skills.map(s=>validateSkillItem(s)))
            }
        })

    } catch (e){
        console.error(e);
        throw new HttpError(500, "There was a problem getting the resume!");
    }
});

/** Default Editor Handler
 * 
 */
Editor.get(async(ctx)=>{
    ctx.render({
        head: {
            styles,
            title: "Resume Editor",
            meta: {
                description: DESCRIPTION
            }
        },
        body: {
            main: EditMainView()
        }
    })
})

export default Resume;