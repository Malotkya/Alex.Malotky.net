import { validateSchoolItem } from "./view/school";
import { validateJobItem } from "./view/job";
import { validateSkillItem } from "./view/skill";

/** Query Wrapper
 * 
 * @param db 
 * @param query 
 * @returns 
 */
export async function queryWrapper(db:D1Database, query:string):Promise<Record<string, unknown>[]> {
    const {results, error} = await db.prepare(query).all();

    if(error)
        throw error;

    return results;
}

export const TABLES:Dictionary<string|undefined> = {
    "jobs"  : "SELECT * FROM Jobs ",
    "skills": "SELECT * FROM Skills ",
    "school": "SELECT * FROM School "
}
export const ORDER_BY:Dictionary<string> = {
    "jobs"  : " ORDER BY startDate DESC",
    "skills": "",
    "school": " ORDER BY graduated DESC"
}
export const DELETE:Dictionary<string|undefined> = {
    "jobs"  :"DELETE FROM Jobs WHERE id = ?",
    "skills":"DELETE FROM Skills WHERE id = ?",
    "school":"DELETE FROM School WHERE id = ?"
}

/** Update or Insert Query
 * 
 * @param {string} table 
 * @param {Map} data 
 * @param {string|number} id (stirng = update / number = insert)
 * @returns {{query:string|undefined, data:Array<unknown>, result:Record<string, unknown>}}
 */
export function UPDATE_QUERY(table:string, data:Map<string, string|Blob>, id:string|number):{query:string|undefined, data:Array<unknown>, result:Record<string, unknown>} {
    id = Number(id);
    let name:string|undefined;
    switch (table){
        case "jobs":
            const employer = data.get("employer");
            const startDate = data.get("startDate");
            const endDate = data.get("endDate");
            const title = data.get("title");
            const about = data.get("about");

            const job = {employer, startDate, endDate, title, about, id}
            validateJobItem(job, false);
            return {
                query: "UPDATE Jobs SET employer = ?, startDate = ?, endDate = ?, title = ?, about = ? WHERE id = ?",
                data: [employer, startDate, endDate, title, about, id],
                result: job
            }

        case "school":
            name = data.get("name") as string;
            const graduated = data.get("graduated");
            const degree = data.get("degree");
            const other = data.get("other");

            const school = {name, graduated, degree, other, id}
            validateSchoolItem(school, false);
            return {
                query: "UPDATE School SET name = ?, graduated = ?, degree = ?, other = ? WHERE id = ?",
                data: [name, graduated, degree, other, id],
                result: school
            }

        case "skills":
            name = data.get("name") as string;
            const info = data.get("info");
            
            const skill = {name, info, id};
            validateSkillItem(skill, false);
            return {
                query: "UPDATE Skills SET name = ?, info = ? WHERE id = ?",
                data: [name, info, id],
                result: skill
            }
    }

    return {
        query: undefined,
        data: [],
        result: {}
    }
}

/** Insert Query
 * 
 * @param {string} table 
 * @param {Map} data 
 * @param {number} id
 * @returns {{query:string|undefined, data:Array<unknown>, result:Record<string, unknown>}}
 */
export function INSERT_QUERY(table:string, data:Map<string, string|Blob>, id:number):{query:string|undefined, data:Array<unknown>, result:Record<string, unknown>} {
    let name:string|undefined;
    switch (table){
        case "jobs":
            const employer = data.get("employer");
            const startDate = data.get("startDate");
            const endDate = data.get("endDate");
            const title = data.get("title");
            const about = data.get("about");

            const job = {employer, startDate, endDate, title, about, id}
            validateJobItem(job, false);
            return {
                query: "INSERT INTO Jobs(employer, startDate, endDate, title, about, id) VALUES(?, ?, ?, ?, ?, ?)",
                data: [employer, startDate, endDate, title, about, id],
                result: job
            }

        case "school":
            name = data.get("name") as string;
            const graduated = data.get("graduated");
            const degree = data.get("degree");
            const other = data.get("other");

            const school = {name, graduated, degree, other, id}
            validateSchoolItem(school, false);
            return {
                query: "INSERT INTO School(name, graduated, degree, other, id) VALUES(?, ?, ?, ?, ?)",
                data: [name, graduated, degree, other, id],
                result: school
            }

        case "skills":
            name = data.get("name") as string;
            const info = data.get("info");
            
            const skill = {name, info, id};
            validateSkillItem(skill, false);
            return {
                query: "INSERT INTO Skills(name, info, id) VALUES(?, ?, ?)",
                data: [name, info, id],
                result: skill
            }
    }

    return {
        query: undefined,
        data: [],
        result: {}
    }
}