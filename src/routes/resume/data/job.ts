/** /routes/resume/data/job
 * 
 * @author Alex Malotky
 */
import DataObject, {optional, number, string, date, list, TypeOf} from "zim-engine/Validation";

export const JobItem = new DataObject("Jobs", {
    id: optional(number()),
    title: string(),
    employer: optional(string()),
    startDate: date(),
    endDate: optional(date()),
    about: list(string(), "\n", [])
})

type Job = TypeOf<typeof JobItem>;
export default Job;