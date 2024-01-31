/** /util/CustomElements/AutoComlete
 * 
 * Made following this tutorial:
 * https://www.w3schools.com/howto/howto_js_autocomplete.asp
 * 
 * @author Alex Malotky
 */

const MAX_LIST_LENGTH: number = 10;

type updateFunction = (s?:string) => Array<string>|Promise<Array<string>>

/** Auto Complete Element
 * 
 */
export default class AutoComplete extends HTMLElement {
    private _input: HTMLInputElement;
    private _updateList:updateFunction;
    private _autoCompleteList: AutoCompleteList; 

    /** Constructor
     * 
     * Takes possible list.
     * 
     * @param {Array<string>|updateFunction} list 
     */
    constructor(list:Array<string>|updateFunction = []){
        super();
        this._autoCompleteList = new AutoCompleteList();
        this.list = list;
        this._autoCompleteList.addEventListener("update", (event:UpdateEvent)=>{
            this._input.value = event.value;
            this.dispatchEvent(new Event("submit"));
        });
    }

    /** Observed Attributes
     * 
     */
    static get observedAttributes(){
        return ["list"]
    }

    /** Attribute Changed Callback
     * 
     * @param {string} name 
     * @param {string} oldValue 
     * @param {string} newValue 
     */
    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "list") {
            this.list = JSON.parse(newValue);
        }
    }

    /** List Setter
     * 
     * Sets the list or function to be called to update list every time the value is changed.
     * 
     * @param {Array<string>|updateFunction} value
     */
    set list(value:Array<string>|updateFunction){
        if(typeof value === "function"){
            this._updateList = value;
        } else if(Array.isArray(value)){
            this._autoCompleteList.list = value;
        } else {
            throw new TypeError(`Unknown type '${typeof value}' for list!`);
        }
    }

    /** Connected Callback
     * 
     */
    connectedCallback(){
        this.appendChild(this._autoCompleteList);
        this._input = this.querySelector("input");

        if(this._input) {
            this._input.addEventListener("input", async(event)=>{
                const value = this._input.value.toUpperCase();
                this._autoCompleteList.close();
    
                if(value.trim() === "")
                    return;
                
                if(this._updateList){
                    this._autoCompleteList.list = await this._updateList(value);
                }
                this._autoCompleteList.update(value);
            });

            this._input.addEventListener("keydown", (event:KeyboardEvent)=>{
                const keyCode = event.which || event.keyCode;
    
                //Arrow Down
                if(keyCode === 40) {
                    this._autoCompleteList.current++;
                    
                //Arrow Up
                } else if(keyCode === 38) {
                    this._autoCompleteList.current--;
    
                //Enter
                } else if(keyCode === 13) {
                    this._autoCompleteList.submit();
                }
            });
    
            this._input.addEventListener("blur", ()=>{
                this._autoCompleteList.close();
            });
        } else {
            console.warn("No input was found in autocomplete object:\n%o", this);
        }
    }
}

/** Auto Complete List
 * 
 */
class AutoCompleteList extends HTMLElement {
    private _list: Array<string>;
    private _currentIndex:number;

    /** Constructor
     * 
     * @param list 
     */
    constructor(list?:Array<string>){
        super();
        if(list)
            this.list = list;

        this._currentIndex = -1;
    }

    set list(value:Array<string>){
        this._list = value;
    }

    /** Current Setter
     * 
     * Changes which element is highlighted.
     */
    set current(value:number){
        const list = this.childNodes;
        const length: number = list.length;

        if(length > 0){
            (list[this._currentIndex] as HTMLElement).classList.remove("active");
            (list[value] as HTMLElement).classList.add("active");

            if(value < 0)
                value = 0;

            if(value >= length)
                value = length-1;
        } else {
            value = -1;
        }
        
        this._currentIndex = value;
    }

    /** Current Getter
     * 
     */
    get current():number{
        if(this.childNodes.length > 0){
            if(this._currentIndex < 0)
                this._currentIndex = 0;
        } else {
            this._currentIndex = -1;
        }

        return this._currentIndex;
    }

    /** Update List based on value
     * 
     * @param {string} value 
     */
    update(value:string){
        let count:number = 0;
        for(let index:number = 0; index < this._list.length; index++){
            const name = this._list[index];
    
            if(name.substring(0, value.length).toUpperCase() === value) {
    
                if(++count >= MAX_LIST_LENGTH)
                    index = this._list.length;
    
                const item = document.createElement("div");
                item.innerHTML = `<strong>${name.substring(0, value.length)}</strong>${name.substring(value.length)}`;
                const clickEvent = () => {
                    this.close();
                    this.dispatchEvent(new UpdateEvent(name));
                };
    
                item.addEventListener("mousedown", clickEvent);
                item.addEventListener("click", clickEvent);
    
                this.appendChild(item);
            }
        }
    }

    /** Close List
     * 
     */
    close(){
        this.innerHTML = "";
    }

    /** Submit List
     * 
     */
    submit(){
        if(this.current > -1) {
            (this.childNodes[this.current] as HTMLElement).click();
        }
    }
}

export class UpdateEvent extends Event {
    private _value:string;

    constructor(value:string){
        super("update");
        this._value = value;
    }

    get value(){
        return this._value;
    }
}

customElements.define("auto-complete-list", AutoCompleteList);