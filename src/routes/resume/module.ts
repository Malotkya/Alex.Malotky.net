import {createElement as _} from "../../util/Elements";
import {SkillItem, SkillCard, SkillDetailed} from "./content/SkillElements";
import {JobItem, JobCard, JobDetailed} from "./content/JobElements";
import {SchoolItem, SchoolCard, SchoolDetailed} from "./content/SchoolElements";

export default function Resume(args?: any){
    switch(args.type) {
        case "Jobs":
            return Jobs(args.arr);

        case "School":
            return School(args.arr);

        case "Skills":
            return Skills(args.arr);
    }

    return [
        _("h1", "Resume"),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/Jobs"}, "Job History:")
            ),
            _("ul", {class: "resume-card-list"},
                args.jobs.map(JobCard)
            )
        ),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/School"}, "School History:")
            ),
            _("ul", {class: "resume-card-list"},
                args.schools.map(SchoolCard)
            )
        ),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/Jobs"}, "Skills:")
            ),
            _("ul", {class: "resume-card-list"},
                args.skills.map(SkillCard)
            )
        ),
    ]
}

export function Skills(args:Array<SkillItem>|SkillItem){
    if(Array.isArray(args)){
        return [
            _("h1", "Skills:"),
            _("ul", args.map(SkillCard))
        ]
    }

    return SkillDetailed(args);
}

export function School(args:Array<SchoolItem>|SchoolItem){
    if(Array.isArray(args)){
        return [
            _("h1", "Skills:"),
            _("ul", args.map(SchoolCard))
        ]
    }

    return SchoolDetailed(args);
}

export function Jobs(args:Array<JobItem>|JobItem){
    if(Array.isArray(args)){
        return [
            _("h1", "Skills:"),
            _("ul", args.map(JobCard))
        ]
    }

    return JobDetailed(args);
}