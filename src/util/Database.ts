/** /Util/Database.ts
 * 
 * @author Alex Malotky
 */
import {Timestamp} from "../firebase";

/** Database Interface
 * 
 */
export interface Database{
    queryCollection(collectionName:string, opts?:any):Promise<Array<any>>,
    getDocument(collectionName:string, documentId:string):Promise<any>,
    countCollection(collectionName:string):Promise<number>
    updateDocument(collectionName:string, documentId:string, object:any):Promise<void>,
    deleteDocument(collectionName:string, documentId:string):Promise<void>,
    createDocument(collectionName:string, object:any):Promise<string>,
    now():Promise<Timestamp>
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
        database = (await import(/*webpackIgnore: true*/ "/firebase.js")).Database;
    }

    return database;
}