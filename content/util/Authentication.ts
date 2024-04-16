/** /Util/Authentication.ts
 * 
 * @author Alex Malotky
 */
import { User, Authentication } from "../firebase";
export { User } from "../firebase";

let authentication:Authentication;

export default async function init(): Promise<Authentication>{
    if(typeof authentication === "undefined") {
        //@ts-ignore
        authentication = (await import(/*webpackIgnore: true*/ "/firebase.js")).default("auth");
    }

    return authentication;
}