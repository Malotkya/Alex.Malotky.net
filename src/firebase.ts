
/** Firebase.ts
 * 
 * Using this as a middleman untill I can figure out how to properly lazy load.
 * 
 * @author Alex Malotky
 */
import { initializeApp, FirebaseApp } from "firebase/app";

import {getCountFromServer, getDoc, getDocs, query, collection, updateDoc, deleteDoc, addDoc, getFirestore, doc} from "firebase/firestore";
import {where, orderBy, startAt, startAfter, endBefore, endAt, limit} from "firebase/firestore";
import {QueryConstraint, QueryDocumentSnapshot, Firestore, Timestamp} from "firebase/firestore";


import {User, Auth, getAuth} from "firebase/auth";
import {onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";;

export { User } from "firebase/auth";
export {Timestamp} from "firebase/firestore";

type Options = Dictionary<Array<unknown>>;

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

export class Database {
    private _conn: Firestore;

    constructor() {
        this._conn = getFirestore(app);
    }

    /** Count Collection
     * 
     * @param {string} collectionName 
     * @returns {number}
     */
    async countCollection(collectionName:string): Promise<number>{

        const response = await getCountFromServer(collection(this._conn, collectionName));
        return response.data().count
    }

    /** Get Document
     * 
     * @param {string} collectionName 
     * @param {string} documentId 
     * @returns {any}
     */
    async getDocument(collectionName:string, documentId:string): Promise<any>{
        const response = await getDoc(doc(this._conn, collectionName, documentId));
        const data:any = response.data();
        
        if(data)
            data.id = response.id;
    
        return data;
    }

    /** Query Collection
     * 
     * @param {string} collectionName 
     * @param {Options} opts 
     * @returns {Array<any>}
     */
    async queryCollection(collectionName: string, opts?:Options):Promise<Array<any>>{
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
        
                    default:
                        throw new TypeError(`Unknown Constraint '${name}'!`)
                }
            }
        }
    
        (await getDocs(query(collection(this._conn, collectionName), ...options))).forEach((result:QueryDocumentSnapshot) =>{
            const data:any = result.data();
            data.id = result.id;
            output.push(data);
        });
    
        return output;
    }

    /** Update Document
     * 
     * @param {string} collectionName 
     * @param {string} documentId 
     * @param {any} object 
     */
    async updateDocument(collectionName:string, documentId:string, object:any):Promise<void>{

        for(let name in object){
            const dateTest = object[name];
            if( !(dateTest instanceof Timestamp) &&
                 (typeof dateTest.seconds === "number" && typeof dateTest.nanoseconds === "number")){
                object[name] = new Timestamp(dateTest.seconds, dateTest.nanoseconds);
            }
        }

        await updateDoc(doc(this._conn, collectionName, documentId), object);
    }

    /** Delete Document
     * 
     * @param {string} collectionName 
     * @param {string} documentId 
     */
    async deleteDocument(collectionName:string, documentId:string):Promise<void>{
        await deleteDoc(doc(this._conn, collectionName, documentId));
    }

    /** Create Document
     * 
     * @param {string} collectionName 
     * @param {any} object 
     * @returns {any}
     */
    async createDocument(collectionName:string, object:any):Promise<string>{
        const response = await addDoc(collection(this._conn, collectionName), object);
        return response.id;
    }

    /** Get Now
     * 
     * Current Time in the form of a timestamp.
     * 
     * @returns {Timestamp}
     */
    now():Timestamp{
        return Timestamp.now();
    }
}

export class Authentication {
    private _conn: Auth;

    constructor() {
        this._conn = getAuth(app);
    }

    /** Sign User In
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {User}
     */
    async signInUser(email:string, password:string): Promise<User>{
        return (await signInWithEmailAndPassword(this._conn, email, password)).user;
    }

    /** Sign User Out
     * 
     */
    async signOutUser(): Promise<void>{
        return signOut(this._conn)
    }

    /** Get Current User
     * 
     * @returns {User}
     */
    getCurrentUser(): Promise<User>{
        return new Promise( async(res, rej)=>{
            onAuthStateChanged(this._conn, (user:User)=>{
                res(user);
            }, (err: any)=>{
                rej(err);
            });
        });
    }
}

export default function init(name:string):Database|Authentication{
    switch (name.toLowerCase()){
        case "database":
            return new Database();

        case "auth":
            return new Authentication();

        default:
            throw new Error(`Unable to create firebase connection '${name}'!`);
    }
}