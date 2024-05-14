import { createElement as _ } from "../util/Element";

class SelectView extends HTMLElement {
    private _list:Array<HTMLElement>|undefined;
    private _current:HTMLElement|null;
    private _register:string;
    private _init:string;

    constructor(){
        super()
        this._current = null;
        this._register = "";
        this._init = "0";
    }

    static get observedAttributes(){
        return ["register", "init"];
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "register") {
            this._register = newValue;
        } else if(name === "init"){
            this._init = newValue;
        }
    }

    init(){
        this.display(this._init);
    }

    display(target:string){
        if(this._list === undefined)
            return -1;

        //Get Index;
        let index = Number(target);
        if(isNaN(index)){
            for(let number in this._list){
                if(this._list[number].getAttribute("name") === this._init) {
                    index = Number(number);
                    break;
                }
            }
        }
        
        if(this._current) {
            this.removeChild(this._current);
        }

        this._current = this._list[index];
        if(this._current === undefined){
            this._current = _("view-option", 
                _("p", {class:"error"}, `Unable to find '${target}'!`)
            )
        } 

        this.appendChild(this._current);
    }

    register(target:string){
        if(this._register){
            const url = new URL(window.location.toString());
            url.searchParams.set(this._register, target);
            window.history.pushState({}, "", url);
        }
       this.display(target);
    }

    connectedCallback(){
        if(this._list === undefined) {
            //Get all Options
            this._list = Array.from(this.querySelectorAll("view-option"));

            //Setup Navigation
            const nav = _("nav");
            nav.addEventListener("click", (event:Event)=>{
                const index = (event.target as HTMLElement).getAttribute("target");
                if(index)
                    this.register(index);
                else
                    console.error("No target found!");
            });

            //Add Routing to Navigation
            for(let index in this._list){
                const node = this._list[index];
                const name = node.getAttribute("name") || index;
                const title = node.getAttribute("title") || index;

                nav.appendChild(_("button", {target:name}, title));
                this.removeChild(node);
            }

            this.appendChild(nav);
        }

        this.init();    
    }
}

class SelectViewOption extends HTMLElement {
    
}

customElements.define("select-view", SelectView);
customElements.define("view-option", SelectViewOption);