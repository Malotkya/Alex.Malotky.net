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
        return (await import(/*webpackIgnore: true*/ "/firebase.js"));
    }

    return database;
}

/** Get Resume
 * 
 * @returns {ResumeResults}
 */
export async function getResume(): Promise<ResumeResults>{
    const database:Database = await Database();

    const constraint = {
        orderBy: ["startDate", "desc"],
        limit: [2]
    }

    return {
        schools: await database.getFromCollection("School", constraint),
        jobs: await database.getFromCollection("Jobs", constraint),
        skills: await database.getFromCollection("Skills"),
    };
}