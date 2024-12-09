/** /routes/resume/view
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "zim-engine";
import { SchoolCard } from "./school"
import { JobCard} from "./job";
import { SkillCard } from "./skill";
import School from "../data/school";
import Job from "../data/job";
import Skill from "../data/skill";

/** Edit Resume View
 * 
 * @returns {Content}
 */
export function EditMainView():Content{
    return [
        _("a", {href: "/Resume", class: "btn"}, "Back"),
        _("h1", "Resume Editor"),
        _("section", {class: "resume-editor"},
            _("h2", "Choose section to edit:"),
            _("p",
                _("a", {href: "/Resume/Edit/Jobs"}, "Work History"),
                _("br"),
                _("a", {href: "/Resume/Edit/School"}, "School History"),
                _("br"),
                _("a", {href: "/Resume/Edit/Skills"}, "All Skills")
            )
        )
    ]
}

/** Resume View
 * 
 * @param {Job[]} jobs 
 * @param {School[]} school 
 * @param {Skill[]} skills 
 * @returns {Content}
 */
export default function Resume(jobs:Job[], school:School[], skills:Skill[]):Content{
    return [
        _("h1", "Resume"),
        _("article", {class: "resume-chunk"},
            _("h2", 
                _("a", {href: "/Resume/Jobs"}, "Work History:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                jobs.map((value)=>JobCard(value))
            )
        ),
        _("article", {class: "resume-chunk"},
            _("h2", 
                _("a", {href: "/Resume/School"}, "Schooling:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                school.map((value)=>SchoolCard(value))
            )
        ),
        _("article", {class: "resume-chunk"},
            _("h2", 
                _("a", {href: "/Resume/Skills"}, "Skills:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                skills.map((value)=>SkillCard(value))
            )
        )
    ]
}