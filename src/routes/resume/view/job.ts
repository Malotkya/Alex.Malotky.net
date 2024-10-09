import { createContent as _ } from "Engine";
import { formatDate } from "@/util";

export interface JobItem {
    id: number,
    title: string,
    employer?: string,
    startDate: number,
    endDate?: number,
    about: Array<string>
}

export function validateJobItem(value:Dictionary<unknown>):JobItem {
    if(typeof value["id"] !== "number") 
        throw new TypeError("Invalid Job id!");

    if(typeof value["title"] !== "string")
        throw new TypeError("Invalid Job Title!");

    if(value["employer"] !== null && typeof value["employer"] !== "string")
        throw new TypeError("Invalid Job Employer!");

    if(typeof value["startDate"] !== "string")
        throw new TypeError("Invalid Job Start Date!");
    
    if(value["endDate"] !== null && typeof value["endDate"] !== "string")
        throw new TypeError("Invalid Job End Date!");

    if(typeof value["about"] === "string"){
        value["about"] = JSON.parse(value["about"]);
    } else if(value["about"] === null){
        value["about"] = [];
    } else {
        throw new TypeError("Invalid Job About!");
    }

    //@ts-ignore
    return value;
}

export function JobCard(item: JobItem, edit:boolean = false){
    const startDate: string = formatDate(item.startDate, "%m, %Y");
    const endDate: string   = formatDate(item.endDate, "%m, %Y", "Current");

    return _("li", {class: "resume-card"},
        _("h3", {class: "resume-title"},
            _("a", {href:`/Resume${edit?"/Edit":""}/Jobs/${item.id}`}, item.title)
        ),
        _('p', {class: "resume-date"},
            `${startDate} - ${endDate}`,
        ),
        _("p", {class: "resume-sub-title"}, item.employer)
    );
}

export function JobDetailed(item: JobItem){
    const startDate: string = formatDate(item.startDate, "%M, %Y");
    const endDate: string   = formatDate(item.endDate, "%M, %Y", "Currently Employed");

    const about: Array<string> = item.about || [];

    return [
        _("h1", item.title),
        _("article", {class: "resume-detailed"},
            _("h2", item.employer),
            _("p", {class: "resume-date"},
                _("span", `${startDate} - ${endDate}`)
            ),
            _("div", {class: "resume-about"},
                _("ul", about.map(a=>_("li", a)))
            )
        )
    ]
}

export function EditJob(item: JobItem){
    return _("form", {method: "post"},
        _("label", {for: "title"}, "Title:"),
        _("input", {id: "title", name: "title", value:item.title}),
        _("hr"),
        _("label", {for: "employer"}, "Employer:"),
        _("input", {id: "employer", name: "employer", value: item.employer}),
        _("label", {for: "start"}, "Start Date:"),
        _("input", {type: "date", name: "startDate", id: "start", value: item.startDate}),
        _("label", {for: "end"}, "End Date:"),
        _("input",  {type: "date", name: "endDate", id: "end", value: item.endDate}),
        _("hr"),
        _("label", {for: "about"}, "About:"),
        _("list-input", {name: "about", id:"about", value: JSON.stringify(item.about || [])})
    );
}