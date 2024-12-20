/** /routes/magic/element/DeckListDialog
 * 
 * @author Alex Malotky
 */
import { createElement as _ } from "@/util/Element";

/** Deck List Dialog Element
 * 
 */
export default class DeckListDialog extends HTMLDialogElement {
    private _input: HTMLTextAreaElement;
    private _submit: EventListener|undefined;

    /** Constructor
     * 
     */
    constructor() {
        super();

        this._input = document.createElement("textarea");
        this.style.top = "100px";
        this.style.zIndex = "100";
    }

    /** Value Getter
     * 
     */
    get value():string{
        return this._input.value;
    }

    /** Value Setter
     * 
     */
    set value(value:string){
        this._input.value = value;
    }
    
    /** Prompt Event Listener
     * 
     * @param {EventListener} listener 
     */
    public promptEvent(listener:EventListener){
        this._submit = listener;
    }

    /** Connected Callback
     * 
     */
    public connectedCallback(){
        this.innerHTML = "";

        const btnSubmit = _("button", {type: "button"}, "Submit");
        btnSubmit.addEventListener("click", event=>{
            this.close();
            if(this._submit)
                this._submit(event);
        });

        const btnCancel = _("button", {type: "button"}, "Cancel");
        btnCancel.addEventListener("click", ()=>this.close());
        
        const div = document.createElement("div");
        div.appendChild(btnSubmit);
        div.appendChild(btnCancel);

        const wrapper = document.createElement("div");
        wrapper.className = "dialog";
        wrapper.appendChild(this._input);
        wrapper.appendChild(div);

        this.appendChild(wrapper);
    }
}

customElements.define("deck-list-dialog", DeckListDialog, { extends: "dialog" });