import { createContent as _ } from "Engine";
import { formatDate } from "@/util";

export interface SchoolItem {
    id: number,
    name: string,
    degree: string,
    graduated: number,
    other: Array<string>
}

export function validateSchoolItem(value:Dictionary<unknown>):SchoolItem {
    if(typeof value["id"] !== "number") 
        throw new TypeError("Invalid School id!");

    if(typeof value["name"] !== "string")
        throw new TypeError("Invalid School Name!");

    if(typeof value["degree"]  !== "string")
        throw new TypeError("Invalid School Degree!");

    if(typeof value["graduated"] !== "number")
        throw new TypeError("Invalid School Graduated!");

    if(typeof value["other"] === "string"){
        value["other"] = JSON.parse(value["other"]);
    } else if(value["other"] === null){
        value["other"] = [];
    } else {
        throw new TypeError("Invalid School Other!");
    }

    //@ts-ignore
    return value;
}

export function SchoolCard(item:SchoolItem){
    const graduated = formatDate(item.graduated, "%m, %Y", "Current");

    return _("li", {class: "resume-card"},
        _("h3", {class: "resume-title"},
            _("a", {href: `/Resume/School/${item.id}`}, item.name)
        ),
        _("p", {class: "resume-date"}, graduated),
        _("p", {class: "resume-sub-title"}, item.degree)
    )
}

export function SchoolDetailed(item:SchoolItem){
    const graduated = formatDate(item.graduated, "%M, %Y", "Currently Enrolled");

    return [
        _("h1", item.degree),
        _("article", {class: "resume-detailed"},
            _("h2", item.name),
            _("p", {class: "resume-date"}, 
                _("span", `Graduated: ${graduated}`)
            ),
            _("div", {class: "resume-about"},
                _("ul", item.other.map(a=>_("li", a)))
            )
        )
    ]
}