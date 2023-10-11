/** Firebase.ts
 * 
 * Using this as a middleman untill I can figure out how to properly lazy load.
 * 
 * @author Alex Malotky
 */
import {initializeApp} from "firebase/app";
import {getFirestore, collection, query, QueryConstraint, getDocs, getDoc, doc} from "firebase/firestore";
import {where, orderBy, startAt, startAfter, endBefore, endAt, limit, limitToLast} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBLLSqjAFfA5EFgQ0Y_L5Ed24vhnpl_dkE",
    authDomain: "alexmalotky-com.firebaseapp.com",
    databaseURL: "https://alexmalotky-com.firebaseio.com",
    projectId: "alexmalotky-com",
    storageBucket: "alexmalotky-com.appspot.com",
    messagingSenderId: "76606919461",
    appId: "1:76606919461:web:2a2b1fd5e67da5bc22c0cc",
    measurementId: "G-GT065KPVZ7"
  };


//Initalize Firebase App
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

/** Get Document
 * 
 * @param {string} collectionName 
 * @param {string} documentId 
 * @returns {any}
 */
export async function getDocument(collectionName:string, documentId:string): Promise<any>{
    const response = await getDoc(doc(database, collectionName, documentId));
    const data:any = response.data();
    
    if(data)
        data.id = response.id;

    return data;
}

/** Query Collection
 * 
 * @param {string} name 
 * @returns {Array<any>}
 */
export async function queryCollection(name: string, opts?:any):Promise<Array<any>>{
    const output: Array<any> = [];
    const options: Array<QueryConstraint> = [];

    if(opts){
        for(let name in opts){
            let args: Array<any> = opts[name];
    
            if(!Array.isArray(args))
                throw new TypeError("Arguments must be an array!");
    
            switch(name){
                case "where": //       field    operator  value
                    options.push( where(args[0], args[1], args[2]) );
                    break;
    
                case "orderBy": //       field     direction
                    options.push( orderBy(args[0], args[1]) );
                    break;
    
                case "startAt": //        value (based on field in orderBy)
                    options.push( startAt(args[0]) );
                    break;
    
                case "startAfter": //        value (based on field in orderBy)
                    options.push( startAfter(args[0]) );
                    break;
    
                case "endBefore": //        value (based on field in orderBy)
                    options.push( endBefore(args[0]) );
                    break;
    
                case "endAt": //        value (based on field in orderBy)
                    options.push( endAt(args[0]) );
                    break;
    
                case "limit": //        value 
                    options.push( limit(args[0]) );
                    break;
    
                case "limitToLast": //        value 
                    options.push( limitToLast(args[0]) );
                    break;
    
                default:
                    throw new TypeError(`Unknown Constraint '${name}'!`)
            }
        }
    }

    (await getDocs(query(collection(database, name), ...options))).forEach(result =>{
        const data:any = result.data();
        data.id = result.id;
        output.push(data);
    });

    return output;
}