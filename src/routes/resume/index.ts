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

const TABLES:Dictionary<string|undefined> = {
    "jobs"  : "SELECT * FROM Jobs ",
    "skills": "SELECT * FROM Skills ",
    "school": "SELECT * FROM School "
}
const ORDER_BY:Dictionary<string> = {
    "jobs"  : " ORDER BY startDate DESC",
    "skills": "",
    "school": " ORDER BY graduated DESC"
}
const DELETE:Dictionary<string|undefined> = {
    "jobs"  :"DELETE FROM Jobs WHERE id = ?",
    "skills":"DELETE FROM Skills WHERE id = ?",
    "school":"DELETE FROM School WHERE id = ?"
}
const NEW:Dictionary<string|undefined> = {
    "jobs"  :"INSERT INTO Jobs(id) VALUES(?)",
    "skills":"INSERT INTO Skills(id) VALUES(?)",
    "school":"INSERT INTO School(id) VALUES(?)"
}

/** Update or Insert Query
 * 
 * @param {string} table 
 * @param {Map} data 
 * @param {string|number} id (stirng = update / number = insert)
 * @returns {{query:string|undefined, data:Array<unknown>, result:Record<string, unknown>}}
 */
function UPDATE_QUERY(table:string, data:Map<string, string>, id:string|number):{query:string|undefined, data:Array<unknown>, result:Record<string, unknown>} {
    let name:string|undefined;
    switch (table){
        case "jobs":
            const employer = data.get("employer");
            const startDate = data.get("startDate");
            const endDate = data.get("endDate");
            const title = data.get("title");
            const about = data.get("about");

            const job = {employer, startDate, endDate, title, about, id}
            validateJobItem(job, false);
            return {
                query: typeof id === "string"
                    ? "UPDATE Jobs SET employer = ? startDate = ? endDate = ? title = ? about = ? WHERE id = ?"
                    : "INSERT INTO Jobs(employer, startDate, endDate, title, about, id) VALUES(?, ?, ?, ?, ?, ?)",
                data: [employer, startDate, endDate, title, about, id],
                result: job
            }

        case "school":
            name = data.get("name");
            const graduated = data.get("graduated");
            const degree = data.get("degree");
            const other = data.get("other");

            const school = {name, graduated, degree, other, id}
            validateSchoolItem(school, false);
            return {
                query: typeof id === "string"
                ? "UPDATE School SET name = ? graduated = ? degree = ? other = ? WHERE id = ?"
                : "INSERT INTO School(name, graduated, degree, other, id) VALUES(?, ?, ?, ?, ?)",
                data: [name, graduated, degree, other, id],
                result: school
            }

        case "skills":
            name = data.get("name");
            const list = data.get("list");
            const info = data.get("info");
            
            const skill = {name, list, info, id};
            validateSkillItem(skill, false);
            return {
                query: typeof id === "string"
                    ? "UPDATE Skills SET name = ? list = ? info = ? WHERE id = ?"
                    : "INSERT INTO Jobs(name, list, info, id) VALUES(?, ?, ?, ?)",
                data: [name, list, info, id],
                result: skill
            }
    }

    return {
        query: undefined,
        data: [],
        result: {}
    }
}

/** Query Wrapper
 * 
 * @param db 
 * @param query 
 * @returns 
 */
async function queryWrapper(db:D1Database, query:string):Promise<Record<string, unknown>[]> {
    const {results, error} = await db.prepare(query).all();

    if(error)
        throw error;

    return results;
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

/** New Record Handler
 * 
 */
Editor.get("/:table/New", async(ctx)=>{
    const table = (ctx.params.get("table") as string).toLocaleLowerCase();
    return ctx.render({
        head: {
            title: title(table, "New"),
            meta: {
                description: DESCRIPTION
            }
        },
        body: SingleEditView(table, null)
    });
});
Editor.post("/:table/New", async(ctx)=>{
    const table = (ctx.params.get("table") as string).toLocaleLowerCase();
    const id = Date.now();
    const {query, data} = UPDATE_QUERY(table, ctx.formData, id);

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
                title: title(table, result["title"] as string || result["name"] as string || id),
                meta: {
                    description: DESCRIPTION
                }
            },
            body: SingleEditView(table, result)
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
                title: "Resume",
                meta: {
                    description: DESCRIPTION
                }
            },
            body: ResumeView(jobs.map(j=>validateJobItem(j)), school.map(s=>validateSchoolItem(s)), skills.map(s=>validateSkillItem(s)))
        })

    } catch (e){
        throw new HttpError(500, "There was a problem getting the resume!");
    }
});

/** Default Editor Handler
 * 
 */
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