import DataObject, {optional, number, string, record, TypeOf} from "zim-engine/Validation";

export const SkillItem = new DataObject("Skills", {
    id: optional(number()),
    name: string(),
    info: record(string())
});

type Skill = TypeOf<typeof SkillItem>;
export default Skill;