/** /routes/resume/element/SkillInput
 * 
 * @author Alex Malotky
 */
import { createElement as _ } from "@/util/Element";

function Section(index:number, name:string, data:Array<string> = [], update:EventListener){
    const title = `name${index}`;

    const txtName = _("input", {id:title, class: "name", value: name}) as HTMLInputElement;
    const txtAbout = _("textarea", {id: name}, data.join("\n")) as HTMLTextAreaElement;
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
    private _input:HTMLInputElement;
    private _list:Dictionary<string|string[]>;

    constructor(){
        super();

        this._input = _("input", {type:"hidden", name: "info", value: "{}"}) as HTMLInputElement;
        this._list = {};
    }

    static get observedAttributes(){
        return ["data"]
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        const value = atob(newValue);

        if(name === "data"){
            const data = JSON.parse(value) as Dictionary<string[]|string>|null

            if(data){
                this._list = data;
                this._input.value = value;
            } else {
                this._list = {}
                this._input.value = "{}";
            }
        }
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }

    connectedCallback(){
        this.appendChild(this._input);

        let index = 0;
        for(const name in this._list){
            let value = this._list[name];

            if(typeof value === "string"){
                value = value.split("\n");
            }

            this.appendChild(
                Section(index++, name, value, ()=>this.update())
            );
        }

        const btnNew = _("button", {type: "button"}, "New Section");
        const newSection = _("section", {class: "skill-section new-section"},
            btnNew
        )
        btnNew.addEventListener("click", ()=>{
            this.insertBefore(
                Section(index++, "", [], ()=>this.update()),
                newSection
            )
        });

        this.appendChild(newSection);
    }

    private update(){
        const info:Dictionary<Array<string>> = {};

        //@ts-ignore
        this.querySelectorAll(".name").forEach((txtName:HTMLInputElement)=>{
            const name = txtName.value;
            if(name){
                const about = this.querySelector(`#${name}`) as HTMLTextAreaElement;
                info[name] = about.value.split("\n");
            }
        });

        this._input.value = JSON.stringify(info);
    }
}

customElements.define("skill-input", SkillInput)