/** /Util/Database.ts
 * 
 * @author Alex Malotky
 */
import { QuerySnapshot, DocumentReference } from "../firebase";

/** Resume Results Interface
 * 
 */
export interface ResumeResults{
    schools: Array<any>,
    jobs: Array<any>,
    skills: Array<any>
}

let database: Database;

export interface Database{
    getTable:(name:string)=>Promise<QuerySnapshot>
}

export default async function Database(): Promise<Database>{
    if(typeof database === "undefined") {
        //@ts-ignore
        return (await import(/*webpackIgnore: true*/ "/firebase.js"));
    }

    return database;
}

/** Get Resume
 * 
 * @returns {ResumeResults}
 */
export async function getResume(): Promise<ResumeResults>{
    
    const database = await Database();

    return {
        schools: [],
        jobs: await database.getTable("Jobs"),
        skills: await database.getTable("Skills"),
    };
}