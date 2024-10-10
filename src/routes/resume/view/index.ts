import { createContent as _, Content } from "Engine";
import { SchoolItem, SchoolCard, SchoolDetailed, validateSchoolItem, EditSchool } from "./school"
import { JobItem, JobCard, JobDetailed, validateJobItem, EditJob} from "./job";
import { SkillItem, SkillCard, SkillDetailed, validateSkillItem, EditSkill } from "./skill";

/** Styling Element
 * 
 */
const style = _("style", require("../style.scss"));

/** Single Table View
 * 
 * @param {string} table 
 * @param {Dictionary<unknown>} value 
 * @returns {Content}
 */
export function SingleView(table:string, value:Dictionary<unknown>):Content{
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

/** Single Table Edit View
 * 
 * @param {string} table 
 * @param {Dictionary<unknown>} value 
 * @returns {Content}
 */
export function SingleEditView(table:string, value:Dictionary<unknown>):Content{
    switch(table){
        case "school":
            return [style, EditSchool(validateSchoolItem(value))];

        case "jobs":
            return [style, EditJob(validateJobItem(value))];

        case "skills":
            return [style, EditSkill(validateSkillItem(value))];
    }
}


type Card = (value:Dictionary<unknown>, edit?:boolean)=>string;
export function getCard(table:string):{card:Card, title:string} {
    switch (table){
        case "school":
            return {card: (value, edit)=>SchoolCard(validateSchoolItem(value), edit), title: "Schooling:"};

        case "jobs":
            return {card: (value, edit)=>JobCard(validateJobItem(value), edit), title: "Work History:"};

        case "skills":
            return {card: (value, edit)=>SkillCard(validateSkillItem(value), edit), title: "Skills:"};
    }

    throw new Error("Unable to find detailed card!");
}

export function ListView(table:string, value:Array<Dictionary<unknown>>){
    const {card, title} = getCard(table);

    return [
        style,
        _("h1", title),
        _("ul", {class: "resume-card-list"},
            value.map((v)=>card(v))
        )
    ]
}

export function ListEditView(table:string, value:Array<Dictionary<unknown>>){
    const {card, title} = getCard(table);

    return [
        style,
        _("h1", `Edit ${title}`),
        _("ul", {class: "resume-card-list"},
            value.map((v)=>card(v, true))
        )
    ]
}

export function EditMainView(){
    return [
        style,
        _("h1", "Resume Editor"),
        _("section", {class: "resume-editor"},
            _("h2", "Choose section to edit:"),
            _("p",
                _("a", {href: "/Resume/Edit/Jobs"}, "Work History"),
                _("br"),
                _("a", {href: "/Resume/Edit/School"}, "School History"),
                _("br"),
                _("a", {href: "/Resume/Edit/Skills"}, "Skills")
            )
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
                jobs.map((value)=>JobCard(value))
            )
        ),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/School"}, "School History:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                school.map((value)=>SchoolCard(value))
            )
        ),
        _("article",
            _("h2", 
                _("a", {href: "/Resume/Skills"}, "Skills:")
            ),
            _("ul", {class: "resume-card-list compact-resume"},
                skills.map((value)=>SkillCard(value))
            )
        )
    ]
}