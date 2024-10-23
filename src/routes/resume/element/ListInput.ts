import { createElement as _ } from "@/util/Element";

function InputLine(value:string, update:EventListener){
    const btnRemove = _("button", {type: "button"}, "X");
    const txtInput = _("input", {value});
    txtInput.addEventListener("input", update);

    const line = _("li",
        _("div", {class: "input-line"}, 
            txtInput, btnRemove
        )
    );

    btnRemove.addEventListener("click", ()=>{
        if(confirm("Are yous sure?")) {
            line.parentElement!.removeChild(line);
        }
    });

    return line;
}

export default class ListInput extends HTMLElement {
    private _list:HTMLUListElement|HTMLOListElement;
    private _button:HTMLLIElement;
    private _value:HTMLInputElement;

    constructor(){
        super();
        this._list = document.createElement("ul");
        const btnNew = _("button", {type: "button"}, "New Line") as HTMLButtonElement;
        this._button = _("li", {class: "button"},
            btnNew
        ) as HTMLLIElement;

        btnNew.addEventListener("click", ()=>{
            this._list.insertBefore(InputLine("", ()=>this.update()), this._button)
        });

        this._list.appendChild(this._button);

        this._value = _("input", {type: "hidden"}) as HTMLInputElement;
    }

    static get observedAttributes(){
        return ["value", "type", "name"]
    }

    private update(){
        const list:Array<string> = [];
        this._list.querySelectorAll("input").forEach(input=>{
            if(input.value)
                list.push(input.value);
        });
        this._value.value = JSON.stringify(list);
        this.dispatchEvent(new CustomEvent("update"));
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        switch (name){
            case "type":
                newValue = newValue.toLocaleLowerCase();
                if(newValue !== "ul" && newValue !== "ol") {
                    throw new Error("Type must be ul or ol!");
                }
                this.type = newValue;
                break;

            case "name":
                this._value.name = newValue;
                break;

            case "value":
                this.value = JSON.parse(newValue);
                break;
        }
    }

    set type(value:"ul"|"ol") {
        if( (value === "ul" && this._list instanceof HTMLUListElement)
            || (value === "ol" && this._list instanceof HTMLOListElement) )
                return;

        const list = document.createElement(value);
        this._list.childNodes.forEach(list.appendChild);

        if(this.isConnected){
            this.removeChild(this._list);
            this.appendChild(list);
        }

        this._list = list;
    }

    set value(value:Array<unknown>){
        if(!Array.isArray(value)) 
            throw new TypeError("List was not formed from parse!");

        this._list.innerHTML = "";
        for(let item of value){
            this._list.appendChild(InputLine(String(item), ()=>this.update()));
        }
        this._list.appendChild(this._button);
        this.update();
    }

    get value():Array<string> {
        return JSON.parse(this._value.value);
    }

    connectedCallback(){
        this.appendChild(this._value);
        this.appendChild(this._list);
    }
}

customElements.define("list-input", ListInput);