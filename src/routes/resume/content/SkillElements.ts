import { createElement as _ } from "../../../util/Elements";

export interface SkillItem{
    info: {[index: string]: string|undefined|Array<string>},
    id: string,
    name: string,
    list: Array<string>
}

export function SkillCard(item:SkillItem){
    return _("li", {class: "resume-card"},
        _("h3", {class: "resume-title"},
            _("a", {href: `/Resume/Skills/${item.id}`}, item.name)
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