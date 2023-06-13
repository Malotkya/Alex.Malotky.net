import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, collection, getDocs } from "firebase/firestore";

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

export default class Database{
    private _firestore: Firestore;
    constructor(){
        const app = initializeApp(firebaseConfig);
        this._firestore = getFirestore(app);
    }

    async resume(){
        const raw = await getDocs(collection(this._firestore, "Resume"));

        const schools:Array<any> = [];
        const jobs: Array<any> = [];
        const skills: Array<any> = [];
        const unknown: Array<any> = [];

        raw.forEach(result=>{
            switch(result.data().type){
                case "school":
                schools.push(result.data());
                break;

                case "job":
                jobs.push(result.data());
                break;

                case "skill":
                skills.push(result.data());
                break;

                default:
                unknown.push(result.data());
            }
        });

        return {
            schools: schools,
            jobs: jobs,
            skills: skills,
            unknown: unknown
        };
    }
}