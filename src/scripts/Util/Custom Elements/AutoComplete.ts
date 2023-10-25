/** /Util/Custom Elements/AutoComlete.ts
 * 
 * Made following this tutorial:
 * https://www.w3schools.com/howto/howto_js_autocomplete.asp
 * 
 * @author Alex Malotky
 */
import {getShard} from "../../scryfall";

/** Auto Complete Element
 * 
 * Wraps around an already created input element.
 */
export default class AutoComplete extends HTMLElement {
    //Elements passed in
    private _input: HTMLInputElement;
    private _submit: EventListener;

    //Auto Complete elements loaded from scryfall.
    private _list: Array<string>;
    private _currentShard: string;

    //Auto Complete elements shown to user.
    private _autocompleteItems: HTMLDivElement;
    private _currentIndex: number;

    /** Constructor
     * 
     * Takes in input element and listener for when element is submited.
     * 
     * @param {HtmlInputElement} input 
     * @param {EventListener} submit 
     */
    constructor(input: HTMLInputElement, submit?: EventListener){
        super();

        this._autocompleteItems = document.createElement("div");
        this._autocompleteItems.className = "autocomplete-list";
        this._currentIndex = -1;

        
        this._list = [];
        this._currentShard = "";

        this._input = input;
        this._submit = submit;
    }

    /** Removes all elements from the list and hides the element
     *  list itself.
     * 
     */
    private closeList(){
        try {
            this._autocompleteItems.childNodes.forEach(child=>{
                this._autocompleteItems.removeChild(child);
            });
            this.removeChild(this._autocompleteItems);
        } catch (e){
            //Do nothing
            //Thorwn if item is already removed.
        }
        
    }

    /** Updates list of strings for the autocomplete list based on shard filename.
     * 
     * @param shard 
     */
    private async updateList(shard:string){
        shard = shard.toUpperCase();

        try {
            if(shard !== this._currentShard){
                this._currentShard = shard;
    
                const update: string = await getShard(shard);
                this._list = update.match(/(?<="name":").*?(?=")/gm);
            }
        } catch (e){
            console.warn(e);
        }
        
    }

    /** Current Setter
     * 
     * Changes which element is highlighted.
     */
    set current(value:number){
        const list = this.items;
        const length: number = list.length;

        if(list.length > 0){
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
        return this._currentIndex;
    }

    /** AutoComplete Items Getter
     * 
     */
    get items(): Array<ChildNode>{
        return  Array.from(this._autocompleteItems.childNodes);
    }

    /** Connected Callback
     * 
     */
    public connectedCallback(){
        this.appendChild(this._input);

        this._input.addEventListener("input", (event)=>{
            const value = this._input.value;
            
            this.closeList();
            this.updateList(value.match(/[a-zA-Z0-9_]/)[0]).then(()=>{
                if(value === "")
                return false;

                this.appendChild(this._autocompleteItems);
                for(let name of this._list){

                    if(name.match(new RegExp(value, "i"))) {

                        const item = document.createElement("div");
                        item.innerHTML = `<strong>${name.substring(0, value.length)}</strong>${name.substring(value.length)}`;

                        item.addEventListener("click", ()=>{
                            this._input.value = name;
                            this.closeList();
                            if(this._submit) {
                                this._submit(event);
                            }
                        });

                        this._autocompleteItems.appendChild(item);
                    }
                }
            });
        });

        this._input.addEventListener("keypressed", (event:KeyboardEvent)=>{
            const keyCode = event.which || event.keyCode;

            //Arrow Down
            if(keyCode === 40) {
                this.current++;
                
            //Arrow Up
            } else if(keyCode === 38) {
                this.current--;

            //Enter
            } else if(keyCode === 13) {
                if(this.current > -1) {
                    (this.items[this.current] as HTMLElement).click();
                } else if(this._submit){
                    this._submit(event);
                }
            }
        });

        this._input.addEventListener("blur", ()=>{
            this.closeList();
        })
    }
}

customElements.define("auto-complete", AutoComplete);