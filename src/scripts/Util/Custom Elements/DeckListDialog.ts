export default class DeckListDialog extends HTMLDialogElement {
    private _input: HTMLTextAreaElement;
    private _submit: EventListener;

    constructor() {
        super();

        this._input = document.createElement("textarea");
        this.style.top = "100px";
    }

    get value():string{
        return this._input.value;
    }

    set value(value:string){
        this._input.value = value;
    }
    
    public promptEvent(listener:EventListener){
        this._submit = listener;
    }

    public connectedCallback(){
        const btnSubmit = document.createElement("button");
        btnSubmit.textContent = "Submit";
        btnSubmit.addEventListener("click", event=>{
            this.close();
            if(this._submit)
                this._submit(event);
        });

        const btnCancel = document.createElement("button");
        btnCancel.textContent = "Cancel";
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