/** /Util/Database.ts
 * 
 * @author Alex Malotky
 */
import {cache} from "./Memory";

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
    queryCollection:(collectionName:string, opts?:any)=>Promise<Array<any>>,
    getDocument:(collectionName:string, documentId:string)=>Promise<any>,
    countCollection:(collectionName:string)=>Promise<number>
}

//Database object.
let database: Database;

/** Initalized the database connection if it isn't already, and returns the connection.
 * 
 * Note: I dislike magic comments.
 * 
 * @returns {Database}
 */
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
    return await cache("Resume", async()=>{
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
    });
}

/** Get Whole Collection
 * 
 * @param {string} name 
 * @returns {Array<any>}
 */
export async function getWholeCollection(name:string): Promise<Array<any>>{
    return await cache(name, async()=>{
        const database:Database = await Database();
        return await database.queryCollection(name)
    });
}

/** Get Document By ID
 * 
 * @param {string} collectionName 
 * @param {string} documentId 
 * @returns {any}
 */
export async function getDocumentById(collectionName:string, documentId:string): Promise<any>{
    return await cache(`${collectionName}(${documentId})`, async()=>{
        const database:Database = await Database();
        return await database.getDocument(collectionName, documentId);
    });
}