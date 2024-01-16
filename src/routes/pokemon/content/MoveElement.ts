import { createElement as _ } from "../../../util/Elements";

export interface MoveData {
    name: string,
    type: string,
    category: "status"|"special"|"physical",
    power: number,
    accuracy: number
}



export default class MoveElement extends HTMLLIElement{
    private _name: string;
    private _info: HTMLElement|null;

    constructor(data: MoveData|string){
        super();
        this.className = "pokmeon-move-item";

        if(typeof data === "string") {
            this._name = data;
            this._info = null;
        } else if(typeof data !== "object"){
            throw new TypeError("Unknown datatype for move!");
        } else {
            this._name = data.name;
            this._info = _("div", {class: "pokemon-move-info"},
                _("span",
                    _("span", {class: `pokemon-type-item ${data.type.toLocaleLowerCase()}`}, data.type)
                ),
                _("figure", {class: "pokmeon-move-category"},
                    _("img", {src: `/${data.category}.png`, alt: data.category})
                ),
                _("div", 
                    _("span", "Accuracy:"),
                    _("span", data.accuracy.toString())
                ),

                data.power?
                _("div", 
                    _("span", "Power:"),
                    _("span", data.power.toString())
                ): null
            );
        }
    }

    connectedCallback(){
        this.textContent = this._name;
        
        this.addEventListener("mouseover", (event:MouseEvent)=>{
            if(this._info) {
                this.appendChild(this._info);
            }
        });

        this.addEventListener("mousemove", (event:MouseEvent)=>{
            if(this._info){
                this._info.style.top = `${event.clientY}px`;
                this._info.style.left = `${event.clientX}px`;
            }
        })

        this.addEventListener("mouseleave", ()=>{
            if(this._info){
                this.removeChild(this._info);
            }
        })
    }
}

customElements.define("move-element", MoveElement, {extends: "li"});