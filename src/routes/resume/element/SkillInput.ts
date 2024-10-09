import ListInput from "./ListInput";
import { createElement as _ } from "@/util/Element";

function Section(index:number, name:string, data:Array<string> = [], update:EventListener){
    const title = `name${index}`;

    const txtName = _("input", {id:title, class: "name", value: name}) as HTMLInputElement;
    const txtAbout = _("textarea", {id: name, value: data.join("/n")}) as HTMLTextAreaElement;
    txtAbout.addEventListener("input", update);
    txtName.addEventListener("input", (event)=>{
        txtAbout.id = txtName.value;
        update(event);
    });

    const btnDelete = _("button", {type: "button"}, "Delete");
    const section = _("section", {class: "skill-section"},
        _("div", {class: "header"},
            _("label", {for: title}, "Skill Title:"),
            btnDelete
        ),
        txtName,
        _("hr"),
        _("label", {for: name}, "About:"),
        txtAbout,
    );

    btnDelete.addEventListener("click", ()=>{
        section.parentElement!.removeChild(section);
        update(new Event("delete"));
    });

    return section;
}

export default class SkillInput extends HTMLElement{
    private _list:HTMLInputElement;
    private _info:HTMLInputElement;

    constructor(){
        super();

        this._list = _("input", {type:"hidden", name: "list"}) as HTMLInputElement
        this._info = _("input", {type:"hidden", name: "info"}) as HTMLInputElement
    }

    static get observedAttributes(){
        return ["data"]
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "data"){
            const {list, info} = JSON.parse(atob(newValue)) as {list:Array<string>, info:Dictionary<Array<string>|undefined>}

            if(list === undefined || !Array.isArray(list)) {
                throw new TypeError("Invalid list!");
            } else {
                this._list.value = JSON.stringify(list);
            }
                
        
            if(info === undefined || typeof info !== "object") {
                throw new TypeError("Invalid Info!");
            } else {
                this._info.value = JSON.stringify(info);
            } 
        }
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }

    connectedCallback(){
        const info = JSON.parse(this._info.value) as Dictionary<Array<string>|undefined>;
        const list = JSON.parse(this._list.value) as Array<string>;

        let index = 0;
        for(const name of list){

            this.appendChild(
                Section(index++, name, info["name"], ()=>this.update())
            );
        }

        const btnNew = _("button", {type: "button"}, "New Section");
        const newSection = _("section", {class: "skill-section new-section"},
            btnNew
        )
        btnNew.addEventListener("click", ()=>{
            this.insertBefore(
                Section(list.length, "", [], ()=>this.update()),
                newSection
            )
        });

        this.appendChild(newSection);
    }

    private update(){
        const list:Array<string> = [];
        const info:Dictionary<Array<string>> = {};

        //@ts-ignore
        this.querySelectorAll(".name").forEach((txtName:HTMLInputElement)=>{
            const name = txtName.value;
            const about = this.querySelector(`#${name}`) as HTMLTextAreaElement;

            list.push(name);
            info[name] = about.value.split("\n");
        });

        this._list.value = JSON.stringify(list);
        this._info.value = JSON.stringify(info);
    }
}

customElements.define("skill-input", SkillInput)