/** /routes/pokemon/element/ModsInput
 * 
 * @author Alex Malotky
 */
import { createElement as _ } from "@/util/Element";
import { isType } from "@/util/Serebii";
import { Number_Or } from "@/util";
import { Modifer } from "../data/pokemon";

type ModData = Record<string, "string"|"number"|"boolean"|"Type">

/** Modifier Input Element
 * 
 */
export default class ModsInput extends HTMLElement {
    private _data:Record<string, HTMLInputElement|HTMLSelectElement>;

    /** Default Constructor
     * 
     * @param {ModData} data 
     */
    constructor(data?:ModData){
        super();
        this._data = {};
        if(data)
            this.init(data);
        this.className = "pokmeon-optional-list";
        this.role = "list";
    }

    /** Init Form Data
     * 
     * @param {ModData} values 
     */
    init(values:ModData): void{
        this._data = {};

        for(const name in values){
            switch (values[name]) {
                case "boolean":
                    this._data[name] = _("input", {type: "checkbox", id:name});
                    break;

                case "Type":
                    this._data[name] = createTypeSelect(name);
                    break;

                default:
                    this._data[name] = _("input", {type: values[name], id:name});
            }          
        }
    }

    /** Set Input Value
     * 
     * @param {string} name 
     * @param {string|number|boolean} value 
     */
    set(name:string, value:string|number|boolean): void{
        const input = this._data[name];

        if(input === undefined) {
            console.error(`Unable to find modifier ${name}!`);
            return;
        }
        
        const type = typeof value;
        if(input instanceof HTMLSelectElement){
            if(type !== "string"){
                console.warn(`Mismatched type ${type} for Type ${name}!`);
                input.value = "???";
            } else if(!isType(<string>value) || value === "Stellar") {
                console.warn(`Invalid Pokemon Type ${value} for Type ${name}!`)
                input.value = "???";
            } else {
                input.value = <string>value;
            }
            return;
        }
        
        switch(input.type){
            case "checkbox":
                if(type !== "boolean") {
                    console.warn(`Mismatched type ${type} for checkbox ${name}!`);
                    input.checked = false;
                } else {
                    input.checked = <boolean>value;
                }
                break;

            case "number":
                if(type !== "number"){
                    console.warn(`Mismatched type ${type} for number ${name}!`);
                    input.value = "0";
                } else {
                    input.value = String(value);
                }
                break;

            default:
                if(type !== "string"){
                    console.warn(`Mismatched type ${type} for text ${name}!`);
                    input.value = String(value);
                } else {
                    input.value = <string>value;
                }
        }
    }

    /** Modifier Value
     * 
     * @returns {Modifer}
     */
    value():Modifer {
        const item        = this._data["item"]? this._data["item"].value: undefined;
        const nature      = this._data["nature"]? this._data["nature"].value: undefined;
        const ability     = this._data["ability"]? this._data["ability"].value: undefined;
        const dynamax     = this._data["dynamax"]? Number_Or(this._data["dynamax"].value, 0): undefined;
        const gigantamax  = this._data["gigantamax"]? (<HTMLInputElement>this._data["gigantamax"]).checked: undefined;
        const terraType   = this._data["terraType"]? this._data["terraType"].value: undefined;

        return {item, nature, ability, dynamax, gigantamax, terraType}
    }

    /** Connected Callback
     * 
     */
    connectedCallback(): void{
        for(let name in this._data){

            if(this._data[name].type === "checkbox") {
                this.appendChild(_("li", {class: "pokemon-optional-item"},
                    _("span", {class: "pokemon-optional-name"},
                        this._data[name]
                    ),
                    _("span", {class: "pokemon-option-value"},
                        _("label", {for: name}, formatName(name))
                    )
                ));
            } else {
                this.appendChild(_("li", {class: "pokemon-optional-item"},
                    _("span", {class: "pokemon-optional-name"},
                        _("label", {for: name}, formatName(name)+": ")
                    ),
                    _("span", {class: "pokemon-option-value"},
                        this._data[name]
                    )
                ));
            }
        }
    }
}

customElements.define("modifier-input", ModsInput);

function formatName(value:string):string {
    return value.charAt(0).toLocaleLowerCase() + value.substring(1).replaceAll(/([A-Z])/g, " $1");
}

function createTypeSelect(id:string):HTMLSelectElement {
    return _("select", {id},
        _("option", {value: "???"}, "???"),
        _("option", {value: "Bug"},      "Bug"),
        _("option", {value: "Dark"},     "Dark"),
        _("option", {value: "Dragon"},   "Dragon"),
        _("option", {value: "Electric"}, "Electric"),
        _("option", {value: "Fairy"},    "Fairy"),
        _("option", {value: "Fighting"}, "Fighting"),
        _("option", {value: "Fire"},     "Fire"),
        _("option", {value: "Ghost"},    "Ghost"),
        _("option", {value: "Grass"},    "Grass"),
        _("option", {value: "Ground"},   "Ground"),
        _("option", {value: "Ice"},      "Ice"),
        _("option", {value: "Normal"},   "Normal"),
        _("option", {value: "Water"},    "Water"),
        _("option", {value: "Poison"},   "Poison"),
        _("option", {value: "Psychic"},  "Psychic"),
        _("option", {value: "Steel"},    "Steel"),
        _("option", {value: "Rock"},     "Rock")
    )
}