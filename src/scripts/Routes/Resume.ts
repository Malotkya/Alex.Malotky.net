import Router from "../App/Router";
import Database, {firebaseConfig} from "../App/Database";
import {render} from "../App";

/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Router("/Resume", "Resume", "Alex's resume and other skills.");
const database = new Database();

Resume.onLoad(async()=>{

    let results = await database.resume();  
    console.log(results);

    return render("resume.html", results);
});