/** /Util/Firebase.ts
 * 
 * @author Alex Malotky
 */
import { FirebaseApp } from "firebase/app";

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

let firebase: any;

export default async function init(): Promise<FirebaseApp>{
    if(typeof firebase === "undefined"){
        //@ts-ignore
        firebase = await import(/*webpackIgnore: true*/ "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js");
    }

    return firebase.initializeApp(firebaseConfig);
}