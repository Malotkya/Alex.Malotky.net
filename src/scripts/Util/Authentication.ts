import {User, Auth} from "firebase/auth";
import Firebase from "./Firebase";

let auth: any;
let authentication:Auth;

export default async function init(): Promise<any>{
    if(typeof auth === "undefined"){
        //@ts-ignore
        auth =  await import(/*webpackIgnore: true*/ "/firebase.js");;
    }
    
    if(typeof authentication === "undefined") 
        authentication = auth.getAuth( await Firebase());

    return auth;
}

/** Sign User In
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {User}
 */
export async function signInUser(email:string, password:string): Promise<User>{
    const auth = await init();
    return (await auth.signInWithEmailAndPassword(authentication, email, password)).user;
}

/** Sign User Out
 * 
 */
export async function signOutUser(): Promise<void>{
    const auth = await init();
    return auth.signOut(authentication)
}

/** Get Current User
 * 
 * @returns {User}
 */
export function getCurrentUser(): Promise<User>{
    return new Promise( async(res, rej)=>{
        const auth = await init();
        auth.onAuthStateChanged(authentication, (user:User)=>{
            res(user);
        }, (err: any)=>{
            rej(err);
        });
    });
}