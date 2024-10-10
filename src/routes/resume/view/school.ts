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

    if(typeof value["graduated"] !== "string")
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

export function SchoolCard(item:SchoolItem, edit:boolean = false){
    const graduated = formatDate(item.graduated, "%m, %Y", "Current");
    const other = item.other || [];

    return _("li", {class: "resume-card"},
        _("h3", {class: "resume-title"},
            _("a", {href: `/Resume${edit?"/Edit":""}/School/${item.id}`}, item.name)
        ),
        _("p", {class: "resume-date"}, graduated),
        _("p", {class: "resume-sub-title"}, item.degree),
        _("ul", {class: "resume-about"},
            other.map(a=>_("li", a))
        ),
        edit? 
        _("div", {class: "button-container"},
            _("a", {class: "btn", href: `/Resume/Edit/School/${item.id}`}, "Edit"),
            _("form", {method: "delete", action: `/Resume/Edit/School/${item.id}`, onsubmit: (event)=>{
                if(!confirm(`Are you sure you want to delete School?`)) {
                    event.stopPropagation();
                }
            }},
                _("button", "Delete")
            )

        ): undefined
    )
}

export function SchoolDetailed(item:SchoolItem){
    const graduated = formatDate(item.graduated, "%M, %Y", "Currently Enrolled");
    const other = item.other || [];

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
export function EditSchool(item: SchoolItem){
    return _("form", {method: "post"},
        _("label", {for: "degree"}, "Degree:"),
        _("input", {id: "degree", name: "degree", value:item.degree}),
        _("hr"),
        _("label", {for: "school"}, "School:"),
        _("input", {id: "school", name: "name", value: item.name}),
        _("label", {for: "graduated"}, "Graduated:"),
        _("input", {type: "date", name: "graduated", id: "graduated", value: item.graduated}),
        _("hr"),
        _("label", {for: "about"}, "Other Info:"),
        _("list-input", {name: "about", id:"about", value: JSON.stringify(item.other || [])})
    );
}