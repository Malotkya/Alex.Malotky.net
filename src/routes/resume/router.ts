/** /routes/resume/router
 * @author Alex Malotky
 */
import { Router, Middleware, Content, Context, HttpError } from "zim-engine";
import {TypeOf} from "zim-engine/Validation";
import { SchoolItem } from "./data/school";
import { JobItem } from "./data/job";
import { SkillItem } from "./data/skill";
import styles from "./style.scss";

//Resume Data Objects
const DATA_OBJECTS = {
    "Skills": SkillItem,
    "School": SchoolItem,
    "Jobs": JobItem
} as const;

//View Types
type SingleView<T extends keyof typeof DATA_OBJECTS> = (value:TypeOf<typeof DATA_OBJECTS[T]>)=>Content;
type SingleEditView<T extends keyof typeof DATA_OBJECTS> = (value:TypeOf<typeof DATA_OBJECTS[T]>|null, message?:string)=>Content;
type GroupView<T extends keyof typeof DATA_OBJECTS>  = (value:TypeOf<typeof DATA_OBJECTS[T]>[])=>Content;

//Resume Description
export const DESCRIPTION = "Alex's resume and other skills.";

//Resume Title
export const title = (table:string, id?:string) => `Resume - ${table}${id? `(${id})`: ""}`;

//Resume Route
export const ROUTE = (table:string, edit:boolean = false, id?:unknown) => `/Resume${edit?"/Edit":""}/${table.charAt(0).toLocaleUpperCase()+table.substring(1)}${id?"/"+String(id):""}`;

/** Resume Data Router
 * 
 */
export default class ResumeRouter<T extends keyof typeof DATA_OBJECTS> extends Router {
    constructor(name:T, recordView:SingleEditView<T>, tableView:GroupView<T>, edit:true)
    constructor(name:T, recordView:SingleView<T>, tableView:GroupView<T>, edit:false)
    constructor(name:T, recordView:SingleView<T>, tableView:GroupView<T>)
    constructor(name:T, recordView:SingleEditView<T>, tableView:GroupView<T>, edit:boolean = false) {
        super(name);

       if(edit) {

            /** Delete Record Handler
             * 
             */
            this.delete("/:id", async (ctx:Context)=>{
                const id = ctx.params.get("id")!;

                try {
                    await ctx.query(DATA_OBJECTS[name] as any).delete({id});
                } catch (e){
                    console.error(e);
                    throw new HttpError(500, `There was a probem deleted from ${name}!`);
                }
                
                ctx.redirect(ROUTE(name, edit))
            });

            /** Update Record Handler
             * 
             */
            this.post("/:id", async(ctx:Context)=>{
                const id = ctx.params.get("id")!;
                const data = await ctx.formData(DATA_OBJECTS[name] as any);
                delete data.id;
                try {
                    await ctx.query(DATA_OBJECTS[name] as any).update(data, {id});
                } catch (e){
                    console.error(e);
                    throw new HttpError(500, `There was a probem updating to ${name}!`);
                }
                
                ctx.render({
                    head: {
                        styles,
                        title: title(name, data["title"] || data["name"] || id),
                        meta: {
                            description: DESCRIPTION
                        }
                    },
                    body: {
                        main: recordView(data as any)
                    }
                });
            });

            /** New Record Handler
             * 
             */
            this.get("/New", async(ctx)=>{
                ctx.render({
                    head: {
                        styles,
                        title: title(name, "New"),
                        meta: {
                            description: DESCRIPTION
                        }
                    },
                    body: {
                        main: recordView(null)
                    }
                });
            });

            /** New Record Handler
             * 
             */
            this.post("/New", async(ctx)=>{
                const id = Date.now();
                const data = await ctx.formData(DATA_OBJECTS[name] as any);
                data["id"] = id;
            
                try {
                    await ctx.query(DATA_OBJECTS[name] as any).insert(data);
                } catch (e){
                    console.error(e);
                    throw new HttpError(500, `There was a probem inserting into ${name}!`);
                }

                ctx.redirect(ROUTE(name, true, id));
            });
       } //End If Edit

        /** Query Record Handler
         * 
         */
        this.get("/:id", async(ctx:Context)=>{
            const id = ctx.params.get("id")!;
            let result:any|null;
            try {
                result = await ctx.query(DATA_OBJECTS[name] as any).get({id});
            } catch (e){
                console.error(e);
                throw new HttpError(500, `There was a problem querying ${name}!`);
            }

            if(result === null){
                throw new HttpError(404, `Unable to find id '${id}' in '${name}'!`);
            }

            ctx.render({
                head: {
                    styles,
                    title: title(name, result["title"] || result["name"] || id),
                    meta: {
                        description: DESCRIPTION
                    }
                },
                body: {
                    main: recordView(result as any)
                }
            });
        });

        /** Default Query Handler
         * 
         */
        this.get(async(ctx)=>{
            let results:any[];
            try {
                results = await ctx.query(DATA_OBJECTS[name] as any).getAll();
            } catch (e){
                console.error(e);
                throw new HttpError(500, `There was a problem querying ${name}!`);
            }

            ctx.render({
                head: {
                    styles,
                    title: title(name),
                    meta: {
                        description: DESCRIPTION
                    },
                },
                body: {
                    main: tableView(results)
                }
            })
        });
    }
}