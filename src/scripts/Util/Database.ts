/** /Util/Database.ts
 * 
 * @author Alex Malotky
 */

/** Resume Results Interface
 * 
 */
export interface ResumeResults{
    schools: Array<any>,
    jobs: Array<any>,
    skills: Array<any>
}

/** Database Interface
 * 
 */
export interface Database{
    getFromCollection:(name:string, opts?:any)=>Promise<Array<any>>
}

//Database object.
let database: Database;

export default async function Database(): Promise<Database>{
    if(typeof database === "undefined") {
        //@ts-ignore
        database = await import(/*webpackIgnore: true*/ "/firebase.js");
    }

    return database;
}

/** Get Resume
 * 
 * @returns {ResumeResults}
 */
export async function getResume(): Promise<ResumeResults>{
    const database:Database = await Database();
        

    return {
        schools: await database.getFromCollection("School", {
            orderBy: ["graduated", "desc"],
            limit: [2]
        }),
        jobs: await database.getFromCollection("Jobs", {
            orderBy: ["startDate", "desc"],
            limit: [2]
        }),
        skills: await database.getFromCollection("Skills"),
    };
}