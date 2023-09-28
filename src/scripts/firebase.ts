/** Firebase.ts
 * 
 * Using this as a middleman untill I can figure out how to properly lazy load.
 * 
 * @author Alex Malotky
 */
import {initializeApp, FirebaseApp} from "firebase/app";
import {getFirestore, Firestore, collection, getDocs, QuerySnapshot} from "firebase/firestore"; 

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
const database:Firestore = getFirestore(app);

//Export Class References needed by app.
export {QuerySnapshot, DocumentReference} from "firebase/firestore";

/** Get Table
 * 
 * @param {String} name 
 * @returns {QuerySnapshot}
 */
export function getTable(name: string):Promise<QuerySnapshot>{
    return getDocs(collection(database, name));
}