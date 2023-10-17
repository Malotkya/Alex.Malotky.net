import { User } from "../firebase";
export { User } from "../firebase";

interface Authentication {
    signInUser(email:string, password:string):Promise<User>,
    signOutUser():Promise<void>,
    getCurrentUser():Promise<User>
}

let authentication:Authentication;

export default async function Authentication(): Promise<Authentication>{
    if(typeof authentication === "undefined") {
        //@ts-ignore
        authentication = (await import(/*webpackIgnore: true*/ "/firebase.js")).Authentication;
    }

    return authentication;
}