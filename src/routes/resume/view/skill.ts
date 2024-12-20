/** /routes/resume/view/skill
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "zim-engine";
import {Buffer} from "node:buffer";
import Skill from "../data/skill";

/** SKill List Item Card
 * 
 * @param {Skill} item 
 * @param {boolean} edit 
 * @returns {Content}
 */
export function SkillCard(item:Skill, edit:boolean = false):Content {
    const list = Object.getOwnPropertyNames(item.info);

    return _("li", {class: "resume-card"},
        _("h3", {class: "resume-title"},
            _("a", {href: `/Resume${edit?"/Edit":""}/Skills/${item.id}`}, item.name)
        ),
        _("ul", {class: "resume-sub-title"},
            list.map(i=>_("li", i))
        ),
        edit?
        _("div", {class: "button-container"},
            _("a", {class: "btn", href: `/Resume/Edit/Skills/${item.id}`}, "Edit"),
            _("form", {method: "delete", action: `/Resume/Edit/Skills/${item.id}`, onsubmit: (event)=>{
                if(!confirm(`Are you sure you want to delete Skill?`)) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }},
                _("button", "Delete")
            )

        ): undefined
    )
}

/** Skill List View
 * 
 * @param {Skill[]} list 
 * @returns {Content}
 */
export function SkillListView(list:Array<Skill>):Content {
    return [
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", "Skills"),
        _("ul", {class: "resume-card-list"},
            list.map((v)=>SkillCard(v))
        )
    ]
}

/** Edit Skill List View
 * 
 * @param {Skill[]} list 
 * @returns {Content}
 */
export function SkillEditListView(list:Array<Skill>):Content {
    return [
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", "Edit Skills"),
        _("aside", {class: "new-button"},
            _("a", {class: "btn", href: "/Resume/Edit/Skills/New"}, "New Skill")
        ),
        _("ul", {class: "resume-card-list"},
            list.map((v)=>SkillCard(v, true))
        )
    ]
}

/** Detailed Skill View
 * 
 * @param {Skill} item 
 * @returns {Content}
 */
export function SkillDetailed(item:Skill):Content {
    const list = Object.getOwnPropertyNames(item.info);

    return [
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", item.name),
        _("article", {class: "resume-detailed"},
            _("div", {class: "resume-about"}, 
                _("ol", 
                    list.map((skill,index)=>{
                        let about:string|Array<string> = item.info[skill] || "";

                        if(Array.isArray(about))
                            about = about.join("<br/>");
                        
                        return _("li", 
                            _("h2", `${Number(index)+1}: ${skill}`),
                            _("p", about)
                        )
                    })
                )
            )
        )
    ]
}

/** Edit Skill View
 * 
 * @param {Skill} item 
 * @param {string} message 
 * @returns {Content}
 */
export function EditSkill(item: Skill|null, message?:string):Content {
    const data = Buffer.from(
        JSON.stringify(item?.info || {})
    ).toString("base64");

    return _("form", {method: "post", class: "resume-editor"},
        _("a", {class: "btn", href: ".."}, "Back"),
        _("h1", "Edit Skill"),
        _("p", {class: "error", id: "error"}),
        _("p", {class: "message"}, message),
        _("label", {for: "name"}, "Name:"),
        _("input", {id: "name", name: "name", value:item?.name}),
        _("hr"),
        _("skill-input", {data}),
        _("hr"),
        _("div", {class: "button-container"},
            _("button", {type: "submit"}, "Save Changes"),
            _("button", {type: "reset"}, "Cancel Changes")
        )
    );
}