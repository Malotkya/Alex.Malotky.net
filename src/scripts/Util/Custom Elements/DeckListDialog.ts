export default class DeckListDialog extends HTMLDialogElement {
    private _input: HTMLTextAreaElement;
    private _submit: EventListener;

    constructor() {
        super();

        this._input = document.createElement("textarea");
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
        

        this.appendChild(this._input);
        this.appendChild(btnSubmit);
        this.appendChild(btnCancel);
    }
}

customElements.define("deck-list-dialog", DeckListDialog, { extends: "dialog" });