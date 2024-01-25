/** /Util/Database.ts
 * 
 * @author Alex Malotky
 */
import {Timestamp, Database} from "../firebase";
export {Timestamp};

//Database object.
let database: Database;

/** Initalized the database connection if it isn't already, and returns the connection.
 * 
 * Note: I dislike magic comments.
 * 
 * @returns {Database}
 */
export default async function init(): Promise<Database>{
    if(typeof database === "undefined") {
        //@ts-ignore
        database = (await import(/*webpackIgnore: true*/ "/firebase.js")).default("database");
    }

    return database;
}