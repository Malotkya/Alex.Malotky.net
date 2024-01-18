import {createElement as _, Content} from "../../util/Elements";
import {SkillItem, SkillCard, SkillDetailed} from "./content/SkillElements";
import {JobItem, JobCard, JobDetailed} from "./content/JobElements";
import {SchoolItem, SchoolCard, SchoolDetailed} from "./content/SchoolElements";

/** Resume Skills Module
 * 
 * @param {Array<SkillItem>|SkillItem} args 
 * @returns {Content}
 */
export function Skills(args:Array<SkillItem>|SkillItem): Content{
    if(Array.isArray(args)){
        return [
            _("h1", "Skills:"),
            _("ul", {class: "resume-card-list"},
                args.map(SkillCard)
            )
        ]
    }

    return SkillDetailed(args);
}

/** Resume School Module
 * 
 * @param {Array<SchoolItem>|SchoolItem} args 
 * @returns {Content}
 */
export function School(args:Array<SchoolItem>|SchoolItem): Content{
    if(Array.isArray(args)){
        return [
            _("h1", "School:"),
            _("ul", {class: "resume-card-list"},
                 args.map(SchoolCard)
            )
        ]
    }

    return SchoolDetailed(args);
}

/** Resume Job Module
 * 
 * @param {Array<JobItem>|JobItem} args 
 * @returns {Content}
 */
export function Jobs(args:Array<JobItem>|JobItem): Content{
    if(Array.isArray(args)){
        return [
            _("h1", "Work History:"),
            _("ul", {class: "resume-card-list"},
                args.map(JobCard)
            )
        ]
    }

    return JobDetailed(args);
}

/** Main Resume Module
 * 
 * @param args 
 * @returns 
 */
export default function Resume(args?: any): Content{
    switch(args.type) {
        case "Jobs":
            return Jobs(args.result);

        case "School":
            return School(args.result);

        case "Skills":
            return Skills(args.result);
    }

    //If no type then assume is default page.
    return [
        _("h1", "Resume"),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/Jobs"}, "Work History:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                args.jobs.map(JobCard)
            )
        ),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/School"}, "School History:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                args.schools.map(SchoolCard)
            )
        ),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/Skills"}, "Skills:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                args.skills.map(SkillCard)
            )
        ),
    ]
}