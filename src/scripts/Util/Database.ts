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
    queryCollection:(name:string, opts?:any)=>Promise<Array<any>>,
    getDocument:(collectionName:string, documentId:string)=>Promise<any>
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
        schools: await database.queryCollection("School", {
            orderBy: ["graduated", "desc"],
            limit: [2]
        }),
        jobs: await database.queryCollection("Jobs", {
            orderBy: ["startDate", "desc"],
            limit: [2]
        }),
        skills: await database.queryCollection("Skills"),
    };
}