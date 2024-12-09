/** /routes/blog/elemnt/MarkDownEditor
 * 
 * @author Alex Malotky
 */
import { createElement as _, appendChildren } from "@/util/Element";
import { MarkDown } from "@/util";

export default class MarkDownEditor extends HTMLElement {
    private _input:HTMLTextAreaElement;
    private _preview:HTMLElement;

    constructor(){
        super();
        this._input = _("textarea", {id: "post-content", }) as HTMLTextAreaElement;
        this._preview = _("div", {id: "content-preview", class: "markdown"});

        this._input.addEventListener("input", ()=>{
            this._preview.innerHTML = MarkDown(this._input.value)
        })
    }

    static get observedAttributes(){
        return ["data", "name"]
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "data"){
            const value = atob(newValue);
            this._input.value = value;
            this._preview.innerHTML = MarkDown(value);
        } else if(name === "name"){
            this._input.name = newValue;
        }
    }

    connectedCallback(){
        appendChildren(this, [
            _("div", {class: "post-content"},
                _("label", {for: "post-content"}, "Mark Down Editor:"),
                this._input
            ),
            _("div", {class: "content-preview"},
                _("label", {for: "content-preview"}, "Mark Down Preview:"),
                this._preview
            )
        ])
    }
}

customElements.define("mark-down-editor", MarkDownEditor);