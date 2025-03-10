/** /routes/resume/view/job
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "zim-engine";
import { formatDate } from "@/util";
import Job from "../data/job";

/** Job List Item Card
 * 
 * @param {Job} item 
 * @param {boolean} edit 
 * @returns {Content}
 */
export function JobCard(item: Job, edit:boolean = false):Content {
    const startDate: string = formatDate(item.startDate, "%m, %Y");
    const endDate: string   = formatDate(item.endDate, "%m, %Y", "Current");
    const about: Array<string> = item.about || [];

    return _("li", {class: "resume-card"},
        _("h3", {class: "resume-title"},
            _("a", {href:`/Resume${edit?"/Edit":""}/Jobs/${item.id}`}, item.title)
        ),
        _('p', {class: "resume-date"},
            `${startDate} - ${endDate}`,
        ),
        _("p", {class: "resume-sub-title"}, item.employer),
        _("ul", {class: "resume-about"},
            about.map((a)=>_("li", a))
        ),
        edit? 
        _("div", {class: "button-container"},
            _("a", {class: "btn", href: `/Resume/Edit/Jobs/${item.id}`}, "Edit"),
            _("form", {method: "delete", action: `/Resume/Edit/Jobs/${item.id}`, onsubmit: (event)=>{
                if(!confirm(`Are you sure you want to delete Job?`)) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }},
                _("button", "Delete")
            )

        ): undefined
    );
}

/** Job List View
 * 
 * @param {Job[]} list 
 * @returns {Content} 
 */
export function JobListView(list:Array<Job>):Content {
    return [
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", "Work History"),
        _("ul", {class: "resume-card-list"},
            list.map((v)=>JobCard(v))
        )
    ]
}

/** Edit Job List View
 * 
 * @param {Job[]} list 
 * @returns {Content}
 */
export function JobEditListView(list:Array<Job>):Content {
    return [
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", "Edit Work Hisotry"),
        _("aside", {class: "new-button"},
            _("a", {class: "btn", href: "/Resume/Edit/Jobs/New"}, "New Job" )
        ),
        _("ul", {class: "resume-card-list"},
            list.map((v)=>JobCard(v, true))
        )
    ]
}

/** Detailed Job View
 * 
 * @param {Job} item 
 * @returns {Content}
 */
export function JobDetailed(item: Job):Content {
    const startDate: string = formatDate(item.startDate, "%M, %Y");
    const endDate: string   = formatDate(item.endDate, "%M, %Y", "Currently Employed");

    const about: Array<string> = item.about || [];

    return [
        _("a", {class: "btn", href: ".."}, "Back"),
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

/** Edit Job View
 * 
 * @param {Job} item 
 * @param {string} message 
 * @returns {Content}
 */
export function EditJob(item: Job|null, message?:string):Content {
    return _("form", {method: "post", class: "resume-editor"},
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", "Edit Job"),
        _("p", {class: "error", id: "error"}),
        _("p", {class: "message"}, message),
        _("label", {for: "title"}, "Title:"),
        _("input", {id: "title", name: "title", value:item?.title}),
        _("hr"),
        _("label", {for: "employer"}, "Employer:"),
        _("input", {id: "employer", name: "employer", value: item?.employer}),
        _("label", {for: "start"}, "Start Date:"),
        _("input", {type: "date", name: "startDate", id: "start", value: item?.startDate}),
        _("label", {for: "end"}, "End Date:"),
        _("input",  {type: "date", name: "endDate", id: "end", value: item?.endDate}),
        _("hr"),
        _("label", {for: "about"}, "About:"),
        _("textarea", {name: "about", id:"about"}, item?.about.join("\n")),
        _("hr"),
        _("div", {class: "button-container"},
            _("button", {type: "submit"}, "Save Changes"),
            _("button", {type: "reset"}, "Cancel Changes")
        )
    );
}