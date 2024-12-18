/** /routes/resume/view/school
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "zim-engine";
import { formatDate } from "@/util";
import School from "../data/school";

/** School List Item Card
 * 
 * @param {School} item 
 * @param {boolean} edit 
 * @returns {Content}
 */
export function SchoolCard(item:School, edit:boolean = false):Content {
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
                    event.preventDefault();
                }
            }},
                _("button", "Delete")
            )

        ): undefined
    )
}

/** School List View
 * 
 * @param {School[]} list 
 * @returns {Content}
 */
export function SchoolListView(list:Array<School>):Content {
    return [
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", "Schooling"),
        _("ul", {class: "resume-card-list"},
            list.map((v)=>SchoolCard(v))
        )
    ]
}

/** Edit School List View
 * 
 * @param {School[]} list 
 * @returns {Content}
 */
export function SchoolEditListView(list:Array<School>):Content{
    return [
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", "Edit Schooling"),
        _("aside", {class: "new-button"},
            _("a", {class: "btn", href: "/Resume/Edit/School/New"}, "New School")
        ),
        _("ul", {class: "resume-card-list"},
            list.map((v)=>SchoolCard(v, true))
        )
    ]
}

/** Detailed School View
 * 
 * @param {School} item 
 * @returns {Content}
 */
export function SchoolDetailed(item:School):Content {
    const graduated = formatDate(item.graduated, "%M, %Y", "Currently Enrolled");
    const other = item.other || [];

    return [
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", item.degree),
        _("article", {class: "resume-detailed"},
            _("h2", item.name),
            _("p", {class: "resume-date"}, 
                _("span", `Graduated: ${graduated}`)
            ),
            _("div", {class: "resume-about"},
                _("ul", other.map(a=>_("li", a)))
            )
        )
    ]
}

/** Edit School View
 * 
 * @param {School} item 
 * @param {string} message 
 * @returns {Content}
 */
export function EditSchool(item: School|null, message?:string):Content {
    return _("form", {method: "post", class: "resume-editor"},
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", "Edit School"),
        _("p", {class: "error", id: "error"}),
        _("p", {class: "message"}, message),
        _("label", {for: "degree"}, "Degree:"),
        _("input", {id: "degree", name: "degree", value:item?.degree}),
        _("hr"),
        _("label", {for: "school"}, "School:"),
        _("input", {id: "school", name: "name", value: item?.name}),
        _("label", {for: "graduated"}, "Graduated:"),
        _("input", {type: "date", name: "graduated", id: "graduated", value: item?.graduated}),
        _("hr"),
        _("label", {for: "other"}, "Other Info:"),
        _("textarea", {name: "other", id:"other"}, item?.other.join("\n")),
        _("hr"),
        _("div", {class: "button-container"},
            _("button", {type: "submit"}, "Save Changes"),
            _("button", {type: "reset"}, "Cancel Changes")
        )
    );
}