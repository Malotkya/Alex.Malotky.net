/** /Util/Database.ts
 * 
 * @author Alex Malotky
 */
import { QuerySnapshot, DocumentReference } from "../firebase";

/** Resume Results Interface
 * 
 */
interface ResumeResults{
    schools: Array<any>,
    jobs: Array<any>,
    skills: Array<any>,
    unknown: Array<any>
}

/** Get Resume
 * 
 * @returns {ResumeResults}
 */
export async function getResume(): Promise<ResumeResults>{
    //@ts-ignore
    const database = (await import(/*webpackIgnore: true*/ "/firebase.js"));
    const raw:QuerySnapshot = await database.getTable("Resume");

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