/** /Util/Database.ts
 * 
 * @author Alex Malotky
 */
import {cache} from "./Memory";
import Firebase from "./Firebase";
import {QueryConstraint, QueryDocumentSnapshot, Firestore} from "firebase/firestore";

/** Resume Results Interface
 * 
 */
export interface ResumeResults{
    schools: Array<any>,
    jobs: Array<any>,
    skills: Array<any>
}

//Database object.
let firestore: any;
let database: Firestore;

/** Initalized the database connection if it isn't already, and returns the connection.
 * 
 * Note: I dislike magic comments.
 * 
 * @returns {Database}
 */
async function init(): Promise<any>{
    if(typeof firestore === "undefined") {
        //@ts-ignore
        firestore = await import(/*webpackIgnore: true*/ "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js");
    }
    

    if(typeof database === "undefined")
        database = firestore.getFirestore(await Firebase());

    
    return firestore;
}

/** Get Resume
 * 
 * @returns {ResumeResults}
 */
export async function getResume(): Promise<ResumeResults>{
    return await cache("Resume", async()=>{

        return {
            schools: await queryCollection("School", {
                orderBy: ["graduated", "desc"],
                limit: [2]
            }),
            jobs: await queryCollection("Jobs", {
                orderBy: ["startDate", "desc"],
                limit: [2]
            }),
            skills: await queryCollection("Skills"),
        };
    });
}

export async function getWholeCollection(collectionName:string):Promise<Array<any>>{
    return await cache(collectionName, async()=>{
        return await queryCollection(collectionName);
    });
}

/** Count Documents In Collection
 * 
 * @param {string} collectionName 
 * @returns {number}
 */
async function countDocsInCollection(collectionName:string):Promise<number>{
    const firestore = await init();
    const response = await firestore.getCountFromServer(firestore.collection(database, collectionName));
    return response.data().count;
}

/** Get Whole Collection
 * 
 * @param {string} name
 * @param {any} opts
 * @returns {Array<any>}
 */
async function queryCollection(collectionName:string, opts?:any): Promise<Array<any>>{
    const firstore = await init();

    const output: Array<any> = [];
    const options: Array<QueryConstraint> = [];

    if(opts){
        for(let name in opts){
            let args: Array<any> = opts[name];
    
            if(!Array.isArray(args))
                throw new TypeError("Arguments must be an array!");
    
            switch(name){
                case "where": //       field    operator  value
                    options.push( firstore.where(args[0], args[1], args[2]) );
                    break;
    
                case "orderBy": //       field     direction
                    options.push( firstore.orderBy(args[0], args[1]) );
                    break;
    
                case "startAt": //        value (based on field in orderBy)
                    options.push( firstore.startAt(args[0]) );
                    break;
    
                case "startAfter": //        value (based on field in orderBy)
                    options.push( firstore.startAfter(args[0]) );
                    break;
    
                case "endBefore": //        value (based on field in orderBy)
                    options.push( firstore.endBefore(args[0]) );
                    break;
    
                case "endAt": //        value (based on field in orderBy)
                    options.push( firstore.endAt(args[0]) );
                    break;
    
                case "limit": //        value 
                    options.push( firstore.limit(args[0]) );
                    break;
    
                case "limitToLast": //        value 
                    options.push( firstore.limitToLast(args[0]) );
                    break;
    
                default:
                    throw new TypeError(`Unknown Constraint '${name}'!`)
            }
        } //End For
    }

    (await firstore.getDocs(firstore.query(firstore.collection(database, collectionName), ...options)))
        .forEach((result:QueryDocumentSnapshot) =>{
            const data:any = result.data();
            data.id = result.id;
            output.push(data);
        });

    return output;
}

/** Get Document By ID
 * 
 * @param {string} collectionName 
 * @param {string} documentId 
 * @returns {any}
 */
export async function getDocumentById(collectionName:string, documentId:string): Promise<any>{
    const firebase = await init();
    const response:QueryDocumentSnapshot = await firebase.getDoc(firebase.doc(database, collectionName, documentId));
    const data:any = response.data();

    if(data)
        data.id = response.id;

    return data;
}