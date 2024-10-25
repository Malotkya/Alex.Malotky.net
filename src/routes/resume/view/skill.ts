import { createElement as _ } from "zim-engine";
import {Buffer} from "node:buffer";

export interface SkillItem{
    id: number,
    name: string,
    info: Dictionary<string|undefined|Array<string>>
}

export function validateSkillItem(value:Dictionary<unknown>, transform:boolean = true):SkillItem {
    if(typeof value["id"] !== "number" || isNaN(value["id"])) 
        throw new TypeError("Invalid Skill id!");

    if(transform && value["name"] === null){
        value["name"] = "";
    } else if (typeof value["name"] !== "string") {
        throw new TypeError("Invalid Skill Name!");
    }

    if(typeof value["info"] === "string"){
        if(transform)
            value["info"] = JSON.parse(value["info"]);
    } else if(value["info"] === null){
        if(transform)
            value["info"] = {};
    } else {
        throw new TypeError("Invalid Skill Info!");
    }

    //@ts-ignore
    return value;
}

export function SkillCard(item:SkillItem, edit:boolean = false){
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

export function SkillDetailed(item:SkillItem){
    const list = Object.getOwnPropertyNames(item.info);

    return [
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

export function EditSkill(item: SkillItem|null, message?:string){
    const data = Buffer.from(
        JSON.stringify(item?.info || {})
    ).toString("base64");

    return _("form", {method: "post", class: "resume-editor"},
        _("a", {class: "btn", href: "/Resume/Edit/Skills"}, "Back"),
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