/** /routes/resume/data/skill
 * 
 * @author Alex Malotky
 */
import DataObject, {optional, number, string, record, list, TypeOf} from "zim-engine/Validation";

export const SkillItem = new DataObject("Skills", {
    id: optional(number()),
    name: string(),
    info: record(list(string()))
});

type Skill = TypeOf<typeof SkillItem>;
export default Skill;