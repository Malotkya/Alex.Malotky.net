import DataObject, {optional, number, string, date, list, TypeOf} from "zim-engine/Validation";

export const SchoolItem = new DataObject("School", {
    id: optional(number()),
    name: string(),
    degree: string(),
    graduated: optional(date()),
    other: optional(list(string()))
});

type School = TypeOf<typeof SchoolItem>;
export default School;