import { createContent as _ } from "Engine";
import { SchoolItem, SchoolCard, SchoolDetailed } from "./school"
import { JobItem, JobCard, JobDetailed} from "./job";
import { SkillItem, SkillCard, SkillDetailed } from "./skill";

const style = _("style", require("./style.scss"));

export function SingleView(table:string, value:Dictionary<unknown>){
    switch (table){
        case "school":
            //@ts-ignore
            return [style, SchoolDetailed(value)];

        case "job":
            //@ts-ignore
            return [style, JobDetailed(value)];

        case "skill":
            //@ts-ignore
            return [style, SkillDetailed(value)];
    }

    throw new Error("Unable to find detailed table!");
}
type Card = (value:Dictionary<unknown>[])=>string;

export function getCard(table:string):{card:Card, title:string} {
    switch (table){
        case "school":
            //@ts-ignore
            return {card: SchoolCard, title: "Schooling:"};

        case "job":
            //@ts-ignore
            return {card: JobCard, title: "Work History:"};

        case "skill":
            //@ts-ignore
            return {card: SkillCard, title: "Skills:"};
    }

    throw new Error("Unable to find detailed card!");
}

export function ListView(table:string, value:Array<Dictionary<unknown>>){
    const {card, title} = getCard(table);

    return [
        style,
        _("h1", title),
        _("ul", {class: "resume-card-list"},
            //@ts-ignore
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