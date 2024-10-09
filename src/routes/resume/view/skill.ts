import { createContent as _ } from "Engine";
import {Buffer} from "node:buffer";

export interface SkillItem{
    id: number,
    name: string,
    list: Array<string>,
    info: Dictionary<string|undefined|Array<string>>
}

export function validateSkillItem(value:Dictionary<unknown>):SkillItem {
    if(typeof value["id"] !== "number") 
        throw new TypeError("Invalid Skill id!");

    if(typeof value["name"] !== "string")
        throw new TypeError("Invalid Skill Name!");

    if(typeof value["list"] === "string"){
        value["list"] = JSON.parse(value["list"]);
    } else if(value["list"] === null){
        value["list"] = [];
    } else {
        throw new TypeError("Invalid Skill List!");
    }

    if(typeof value["info"] === "string"){
        value["info"] = JSON.parse(value["info"]);
    } else if(value["info"] === null){
        value["info"] = {};
    } else {
        throw new TypeError("Invalid Skill Info!");
    }

    //@ts-ignore
    return value;
}

export function SkillCard(item:SkillItem, edit:boolean = false){
    return _("li", {class: "resume-card"},
        _("h3", {class: "resume-title"},
            _("a", {href: `/Resume/Skills${edit?"/Edit":""}/${item.id}`}, item.name)
        ),
        _("ul", {class: "resume-sub-title"},
            item.list.map(i=>_("li", i))
        )
    )
}

export function SkillDetailed(item:SkillItem){
    return [
        _("h1", item.name),
        _("article", {class: "resume-detailed"},
            _("div", {class: "resume-about"}, 
                _("ol", 
                    item.list.map((skill,index)=>{
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

export function EditSkill(item: SkillItem){
    const data = Buffer.from(
        JSON.stringify(item)
    ).toString("base64");

    return _("form", {method: "post"},
        _("label", {for: "name"}, "Name:"),
        _("input", {id: "name", name: "name", value:item.name}),
        _("hr"),
        _("skill-input", {data}),
    );
}