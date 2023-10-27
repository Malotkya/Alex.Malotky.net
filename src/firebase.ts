
/** Firebase.ts
 * 
 * Using this as a middleman untill I can figure out how to properly lazy load.
 * 
 * @author Alex Malotky
 */

//@ts-ignore
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { FirebaseApp } from "firebase/app";

import {QueryConstraint, QueryDocumentSnapshot, Firestore, Timestamp} from "firebase/firestore"
import {User, Auth} from "firebase/auth";

export { User } from "firebase/auth";
export {Timestamp} from "firebase/firestore";


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
const app: FirebaseApp = initializeApp(firebaseConfig);
let authentication: Auth;
let database: Firestore;

/** Initalize Firestore Database Connection
 * 
 * @returns {Firestore}
 */
async function initDatabase(): Promise<any>{
    //@ts-ignore
    const firestore = await import(/*webpackIgnore: true*/ "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js");

    if(typeof database === "undefined")
        database = firestore.getFirestore(app);

    return firestore;
}

export const Database = {

    /** Count Collection
     * 
     * @param {string} collectionName 
     * @returns {number}
     */
    async countCollection(collectionName:string): Promise<number>{
        const firestore = await initDatabase();

        const response = await firestore.getCountFromServer(firestore.collection(database, collectionName));
        return response.data().count
    },

    /** Get Document
     * 
     * @param {string} collectionName 
     * @param {string} documentId 
     * @returns {any}
     */
    async getDocument(collectionName:string, documentId:string): Promise<any>{
        const firestore = await initDatabase();

        const response = await firestore.getDoc(firestore.doc(database, collectionName, documentId));
        const data:any = response.data();
        
        if(data)
            data.id = response.id;
    
        return data;
    },

    /** Query Collection
     * 
     * @param {string} name 
     * @param {any} opts 
     * @returns {Array<any>}
     */
    async queryCollection(collectionName: string, opts?:any):Promise<Array<any>>{
        const firestore = await initDatabase();

        const output: Array<any> = [];
        const options: Array<QueryConstraint> = [];
    
        if(opts){
            for(let name in opts){
                let args: Array<any> = opts[name];
        
                if(!Array.isArray(args))
                    throw new TypeError("Arguments must be an array!");
        
                switch(name){
                    case "where": //       field    operator  value
                        options.push( firestore.where(args[0], args[1], args[2]) );
                        break;
        
                    case "orderBy": //       field     direction
                        options.push( firestore.orderBy(args[0], args[1]) );
                        break;
        
                    case "startAt": //        value (based on field in orderBy)
                        options.push( firestore.startAt(args[0]) );
                        break;
        
                    case "startAfter": //        value (based on field in orderBy)
                        options.push( firestore.startAfter(args[0]) );
                        break;
        
                    case "endBefore": //        value (based on field in orderBy)
                        options.push( firestore.endBefore(args[0]) );
                        break;
        
                    case "endAt": //        value (based on field in orderBy)
                        options.push( firestore.endAt(args[0]) );
                        break;
        
                    case "limit": //        value 
                        options.push( firestore.limit(args[0]) );
                        break;
        
                    case "limitToLast": //        value 
                        options.push( firestore.limitToLast(args[0]) );
                        break;
        
                    default:
                        throw new TypeError(`Unknown Constraint '${name}'!`)
                }
            }
        }
    
        (await firestore.getDocs(firestore.query(firestore.collection(database, collectionName), ...options))).forEach((result:QueryDocumentSnapshot) =>{
            const data:any = result.data();
            data.id = result.id;
            output.push(data);
        });
    
        return output;
    },

    /** Update Document
     * 
     * @param {string} collectionName 
     * @param {string} documentId 
     * @param {any} object 
     */
    async updateDocument(collectionName:string, documentId:string, object:any):Promise<void>{
        const firestore = await initDatabase();
        await firestore.updateDoc(firestore.doc(database, collectionName, documentId), object);
    },

    /** Delete Document
     * 
     * @param {string} collectionName 
     * @param {string} documentId 
     */
    async deleteDocument(collectionName:string, documentId:string):Promise<void>{
        const firestore = await initDatabase();
        await firestore.deleteDoc(firestore.doc(database, collectionName, documentId));
    },

    /** Create Document
     * 
     * @param {string} collectionName 
     * @param {any} object 
     * @returns {any}
     */
    async createDocument(collectionName:string, object:any):Promise<string>{
        const firestore = await initDatabase();

        const response:QueryDocumentSnapshot = await firestore.addDoc(firestore.collection(database, collectionName), object);

        return response.id;
    },

    /** Get Now
     * 
     * Current Time in the form of a timestamp.
     * 
     * @returns {Timestamp}
     */
    async now():Promise<Timestamp>{
        const firestore = await initDatabase();
        return firestore.Timestamp.now();
    }
}

/** Initalize Authentication Connection
 * 
 * @returns {Authentication}
 */
async function initAuthentication(): Promise<any>{
    //@ts-ignore
    const auth = await import(/*webpackIgnore: true*/ "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js");

    if(typeof authentication === "undefined")
        authentication = auth.getAuth(app);

    return auth;
}

export const Authentication = {

    /** Sign User In
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {User}
     */
    async signInUser(email:string, password:string): Promise<User>{
        const auth = await initAuthentication();

        return (await auth.signInWithEmailAndPassword(authentication, email, password)).user;
    },

    /** Sign User Out
     * 
     */
    async signOutUser(): Promise<void>{
        const auth = await initAuthentication();

        return auth.signOut(authentication)
    },

    /** Get Current User
     * 
     * @returns {User}
     */
    getCurrentUser(): Promise<User>{
        return new Promise( async(res, rej)=>{
            const auth = await initAuthentication();

            auth.onAuthStateChanged(authentication, (user:User)=>{
                res(user);
            }, (err: any)=>{
                rej(err);
            });
        });
    },
}