import { createContent as _ } from "Engine";
import { SchoolItem, SchoolCard, SchoolDetailed, validateSchoolItem } from "./school"
import { JobItem, JobCard, JobDetailed, validateJobItem} from "./job";
import { SkillItem, SkillCard, SkillDetailed, validateSkillItem } from "./skill";

const style = _("style", require("./style.scss"));

export function SingleView(table:string, value:Dictionary<unknown>){
    switch (table){
        case "school":
            return [style, SchoolDetailed(validateSchoolItem(value))];

        case "jobs":
            return [style, JobDetailed(validateJobItem(value))];

        case "skills":
            return [style, SkillDetailed(validateSkillItem(value))];
    }

    throw new Error("Unable to find detailed table!");
}
type Card = (value:Dictionary<unknown>)=>string;

export function getCard(table:string):{card:Card, title:string} {
    switch (table){
        case "school":
            return {card: (value)=>SchoolCard(validateSchoolItem(value)), title: "Schooling:"};

        case "jobs":
            return {card: (value)=>JobCard(validateJobItem(value)), title: "Work History:"};

        case "skills":
            return {card: (value)=>SkillCard(validateSkillItem(value)), title: "Skills:"};
    }

    throw new Error("Unable to find detailed card!");
}

export function ListView(table:string, value:Array<Dictionary<unknown>>){
    const {card, title} = getCard(table);

    return [
        style,
        _("h1", title),
        _("ul", {class: "resume-card-list"},
            value.map(card)
        )
    ]
}

export default function Resume(jobs:JobItem[], school:SchoolItem[], skills:SkillItem[]){
    return [
        style,
        _("h1", "Resume"),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/Jobs"}, "Work History:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                jobs.map(JobCard)
            )
        ),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/School"}, "School History:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                school.map(SchoolCard)
            )
        ),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/Skills"}, "Skills:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                skills.map(SkillCard)
            )
        )
    ]
}