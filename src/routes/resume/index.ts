/** /Routes/Resume
 * 
 * @author Alex Malotky
 */
import { Router, Middleware, Content } from "Engine";
import HttpError from "Engine/HttpError";
import ResumeView , { SingleView, ListView, SingleEditView, ListEditView, EditMainView } from "./view";
import { validateSchoolItem } from "./view/school";
import { validateJobItem } from "./view/job";
import { validateSkillItem } from "./view/skill";

const TABLES:Dictionary<string|undefined> = {
    "jobs": "SELECT * FROM Jobs ",
    "skills": "SELECT * FROM Skills ",
    "school": "SELECT * FROM School "
}
const ORDER_BY:Dictionary<string> = {
    "jobs": " ORDER BY startDate DESC",
    "skills": "",
    "school": " ORDER BY graduated DESC"
}

const DESCRIPTION = "Alex's resume and other skills.";
const title = (table:string, id?:string) => `Resume - ${table}${id? `(${id})`: ""}`;

const Resume = new Router("/Resume");
const Editor = new Router("/Edit");
Resume.use(Editor);

/** Validate Login
 * 
 */
Editor.all(async(ctx)=>{
    const user = await ctx.getAuth();
    if(user === null) {
        ctx.redirect("/Login");
    }
})

async function queryWrapper(db:D1Database, query:string):Promise<Record<string, unknown>[]> {
    const {results, error} = await db.prepare(query).all();

    if(error)
        throw error;

    return results;
}

/** Querry Table Handler
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
                    title: title(table),
                    meta: {
                        description: DESCRIPTION
                    },
                },
                body: view(table, results)
            })
    
        } catch (e){
            throw new HttpError(500, "There was a problem querying the database!");
        }
        
    }
}
Resume.get("/:table", QueryTable(ListView));
Editor.get("/:table", QueryTable(ListEditView));

/** Querry Record Handler
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
                    title: title(table, result["title"] as string || result["name"] as string || id),
                    meta: {
                        description: DESCRIPTION
                    }
                },
                body: view(table, result)
            });
        } catch (e){
            throw new HttpError(500, "There was a problem querying the database!");
        }
    }
}
Resume.get("/:table/:id", QueryRecord(SingleView));
Editor.get("/:table/:id", QueryRecord(SingleEditView));



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
                title: "Resume",
                meta: {
                    description: DESCRIPTION
                }
            },
            body: ResumeView(jobs.map(validateJobItem), school.map(validateSchoolItem), skills.map(validateSkillItem))
        })

    } catch (e){
        throw new HttpError(500, "There was a problem getting the resume!");
    }
});

Editor.get(async(ctx)=>{
    ctx.render({
        head: {
            title: "Resume Editor",
            meta: {
                description: DESCRIPTION
            }
        },
        body: EditMainView()
    })
})

export default Resume;