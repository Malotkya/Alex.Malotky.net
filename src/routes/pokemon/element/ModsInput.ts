/** /routes/pokemon/element/ModsInput
 * 
 * @author Alex Malotky
 */
import { createElement as _ } from "@/util/Element";
import { Number_Or } from "@/util";
import { AllTypes, getAbilityData, getItemData } from "@/util/Serebii";
import { Modifer } from "../data/pokemon";

type ModData = Record<string, "string"|"number"|"boolean"|"Type">
type ModType = string|boolean|number
type DefaultData = Record<string, ModType|ModType[]>

/** Modifier Input Element
 * 
 */
export default class ModsInput extends HTMLElement {
    private _data:Record<string, HTMLInputElement|HTMLSelectElement>;
    private _id:number;

    /** Default Constructor
     * 
     * @param {ModData} data 
     * @param {DefaultData} def
     */
    constructor(id:number, data:ModData, def:DefaultData = {}){
        super();
        this._data = {};
        this._id = id;
        this.init(data, def);
        this.className = "pokmeon-optional-list";
        this.role = "list";
    }

    /** Init Form Data
     * 
     * @param {ModData} values 
     */
    init(values:ModData, def:DefaultData): void{
        this._data = {};

        for(const name in values){
            const value = def[name];

            switch (values[name]) {
                case "boolean":
                    this._data[name] = _("input", {type: "checkbox", id:name+this._id, checked: value == true});
                    break;

                case "Type":
                    this._data[name] = createTypeSelect(name+this._id, <string>value);
                    break;

                default:
                    if(Array.isArray(value)){
                        this._data[name] = buildSelect({id: name+this._id}, <string[]>value)
                    } else {
                        this._data[name] = _("input", {type: values[name], id:name+this._id, value:value||""});
                    }
            }          
        }

        if(this.isConnected)
            this.connectedCallback();
    }

    /** Set Input Value
     * 
     * @param {string} name 
     * @param {string|number|boolean} value 
     */
    set(name:string, value:ModType): void {
        if(value === undefined) {
            console.error(`Missing value on ${name}!`);
            return;
        }

        const input = this._data[name];
        if(input === undefined) {
            console.error(`Unable to find modifier ${name}!`);
            return;
        }

        const type = typeof value;
        switch(input.type){
            case "checkbox":
                if(type !== "boolean") {
                    console.warn(`Mismatched type ${type} for checkbox ${name}!`);
                    (<HTMLInputElement>input).checked = false;
                } else {
                    (<HTMLInputElement>input).checked = <boolean>value;
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
                    if(input instanceof HTMLSelectElement) {
                        setSelectValue(input, String(value))
                    } else {
                        input.value = String(value);
                    }
                } else {
                    if(input instanceof HTMLSelectElement) {
                        setSelectValue(input, <string>value)
                    } else {
                        input.value = <string>value;
                    }
                    
                }
        }
    }

    /** Modifier Value
     * 
     * @returns {Modifer}
     */
    async value():Promise<Modifer> {
        const itemName    = this._data["item"]? this._data["item"].value: undefined;
        const nature      = this._data["nature"]? this._data["nature"].value: undefined;
        const abilityName = this._data["ability"]? this._data["ability"].value: undefined;
        const dynamax     = this._data["dynamax"]? Number_Or(this._data["dynamax"].value, 0): undefined;
        const gigantamax  = this._data["gigantamax"]? (<HTMLInputElement>this._data["gigantamax"]).checked: undefined;
        const terraType   = this._data["terraType"]? this._data["terraType"].value: undefined;

        const item    = itemName
            ?  itemName === "none"
                ? {name: "none", value: ""}
                : await getItemData(itemName)
            : undefined;
        const ability = abilityName? await getAbilityData(abilityName): undefined;

        return {item, nature, ability, dynamax, gigantamax, terraType}
    }

    /** Connected Callback
     * 
     */
    connectedCallback(): void{
        this.innerHTML = "";

        for(let name in this._data){

            if(this._data[name].type === "checkbox") {
                this.appendChild(_("li", {class: "pokemon-optional-item"},
                    _("span", {class: "pokemon-optional-name"},
                        this._data[name]
                    ),
                    _("span", {class: "pokemon-option-value"},
                        _("label", {for: name+this._id}, formatName(name))
                    )
                ));
            } else {
                this.appendChild(_("li", {class: "pokemon-optional-item"},
                    _("span", {class: "pokemon-optional-name"},
                        _("label", {for: name+this._id}, formatName(name)+": ")
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

/** Format Attribute Name
 * 
 * @param {string} value 
 * @returns {string}
 */
function formatName(value:string):string {
    return value.charAt(0).toLocaleUpperCase() + value.substring(1).replaceAll(/([A-Z])/g, " $1");
}

/** Build Select Input
 * 
 * @param {Object} props 
 * @param {string[]} list 
 * @param {string} value 
 * @returns {HTMLSelectElement}
 */
function buildSelect(props:any, list:string[], value?:string):HTMLSelectElement {
    const select = _("select", props,
        list.map(s=>_("option", {value:s}, s))
    );

    if(value)
        select.value = value;

    return select;
}

/** Build Type Select
 * 
 * @param {string} id 
 * @param {string} value 
 * @returns {HTMLSelectElement}
 */
function createTypeSelect(id:string, value?:string):HTMLSelectElement {
    return buildSelect({id}, ["Steller"].concat(AllTypes), value);
}

function setSelectValue(input:HTMLSelectElement, value:string): void {
    const list = input.querySelectorAll("option");

    //Validate value is an option
    let index = -1;
    for(let i=0; i<list.length; i++){
        if(list[i].value === value) {
            index = i;
            break;
        }
    }   

    if(index == -1){
        input.value = list[0].value;
    } else {
        input.value = value;
    }
}