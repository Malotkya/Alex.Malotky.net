import { getAllGameData, GameData, getAllItems, getAllAbilities } from "@/util/Serebii";
import { createElement as _, appendChildren } from "@/util/Element";
import Game from "../data/game";
import Pokemon from "../data/pokemon";
import PokemonInput from "./PokemonInput";
import { sleep } from "@/util";

const MAX_TEAM_SIZE = 6;

export default class GameInputForm extends HTMLFormElement {
    _data:GameData[]|undefined;
    _save:Record<keyof Game, HTMLInputElement|HTMLSelectElement>;

    //View Elements
    _main:HTMLUListElement;
    _other:HTMLUListElement;
    _btnNewTeamWrapper:HTMLLIElement;
    _btnNewOtherWrapper:HTMLLIElement;

    //Button Elements
    _btnSubmit:HTMLButtonElement;
    _btnNewTeam:HTMLButtonElement;
    _btnNewOther:HTMLButtonElement;

    constructor(){
        super();
        this.className = "game-input";

        getAllGameData().then(data=>{
            this._data = data;
            appendChildren(this._save["name"], buildGameSelect(this._data));
            this._save["generation"].value = this._data[0].generation.toString();
            this._save["region"].value = this._data[0].region;
        }).catch(console.error);

        getAllItems().then(list=>{
            PokemonInput.items = list;
        }).catch(console.log);

        this._save = {
            name: _("select", {id: "txtName", name: "name"}),
            generation: _("input", {id: "numGeneration", name:"generation", readonly: true}),
            region: _("input", {id: "txtRegion", name: "region", readonly: true}),
            team: _("input", {id: "inpTeam", type: "hidden", name: "team", value: "[]"}),
            others: _("input", {id: "inpOther", type: "hidden", name: "others", value: "[]"})
        } as any;

        this._main  = _("ul", {class: "pokemon-view"});
        this._other = _("ul", {class: "pokemon-view"});
        this._btnSubmit = _("button", {type: "submit"}, "Save")



        //Main Team Inputs
        this._btnNewTeam = _("button", {type: "button"}, "New");
        this._btnNewTeamWrapper = _("li", {class: "new-pokemon"}, 
            _("div", {class: "new-button-wrapper"}, this._btnNewTeam)
        );

        //Other Team Inputs
        this._btnNewOther = _("button", {type: "button"}, "New");
        this._btnNewOtherWrapper = _("li", {class: "new-pokemon"}, 
            _("div", {class: "new-button-wrapper"}, this._btnNewOther)
        );

        ////////////////////////  EVENT LISTENERS //////////////////////////////////////////////////

        /** New Team Pokemon Event Listener
         * 
         */
        this._btnNewTeam.addEventListener("click", (event)=>{
            const game = findByName(this._save["name"].value, this._data!);
            if(game === null)
                throw new Error("Invalid Game Name!");
            const input = new PokemonInput(game);
            this._main.insertBefore(input, this._btnNewTeamWrapper);
            this.update();
        });

        /** New Other Pokemon Event Listener
         * 
         */
        this._btnNewOther.addEventListener("click", (event)=>{
            const game = findByName(this._save["name"].value, this._data!);
            if(game === null)
                throw new Error("Invalid Game Name!");
            const input = new PokemonInput(game);
            this._other.insertBefore(input, this._btnNewOtherWrapper);
            this.update();
        });

        /** Game Change Event Listener
         * 
         */
        this._save["name"].addEventListener("change", (event)=>{
            this.lock();
            event.stopPropagation();
            const game = findByName(this._save["name"].value, this._data!);
            if(game === null)
                return;

            this._save["generation"].value = game.generation.toString();
            this._save["region"].value = game.region;

            Promise.all(
                (<PokemonInput[]>Array.from(this._main.querySelectorAll("pokemon-input")))
                .concat(<PokemonInput[]>Array.from(this._other.querySelectorAll("pokemon-input")))
                .map(async(input)=>{
                    await input.setGame(game);
                })
            ).then(()=>{
                this.unlock();
            });

        });

        this.addEventListener("change", async(event)=>{
            this.lock();
            this.update();

            this._save["team"].value = JSON.stringify(
                await Promise.all(
                    (<PokemonInput[]>Array.from(this._main.querySelectorAll("pokemon-input")))
                        .map(async(input)=>{
                            while(!input.ready)
                                await sleep();

                            return input.getValue();
                        }
                    )
                )
            );

            this._save["others"].value = JSON.stringify(
                await Promise.all(
                    (<PokemonInput[]>Array.from(this._other.querySelectorAll("pokemon-input")))
                        .map(async(input)=>{
                            while(!input.ready)
                                await sleep();

                            return input.getValue();
                        }
                    )
                )
            );

            this.unlock();
        });

        this.addEventListener("submit", (event)=>{
            if(!this.ready){
                event.preventDefault();
                event.stopPropagation();
            }
        });
    }

    /** Ovserved Attributes
     * 
     */
    static get observedAttributes(){
        return ["data"]
    }

    /** Ready For Submit
     * 
     */
    get ready():boolean{
        if(this._save["name"].disabled)
            return false;

        for(let input of <PokemonInput[]>Array.from(this.querySelectorAll("pokemon-input"))) {
            if(!input.ready)
                return false;
        }

        return true;
    }

    /** Attribute Changed Callback
     * 
     * @param {string} name 
     * @param {string} oldValue 
     * @param {string} newValue 
     */
    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "data"){
            this.data(decodeURIComponent(escape(atob(newValue))));
        }
    }

    /** Lock Form
     * 
     */
    lock() {
        this._save["name"].disabled = true;
        this._save["name"].ariaDisabled = "true";
        this._save["region"].disabled = true;
        this._save["region"].ariaDisabled = "true";
        this._save["generation"].disabled = true;
        this._save["generation"].ariaDisabled = "true";
        this._btnSubmit.disabled = true;
        this._btnSubmit.ariaDisabled = "true";
        this._btnNewTeam.disabled = true;
        this._btnNewTeam.ariaDisabled = "true";
        this._btnNewOther.disabled = true;
        this._btnNewOther.ariaDisabled = "true";
    }

    /** Unlock Form
     * 
     */
    unlock() {
        this._save["name"].disabled = false;
        this._save["name"].removeAttribute("aria-disabled");
        this._save["region"].disabled = false;
        this._save["region"].removeAttribute("aria-disabled");
        this._save["generation"].disabled = false;
        this._save["generation"].removeAttribute("aria-disabled");
        this._btnSubmit.disabled = false;
        this._btnSubmit.removeAttribute("aria-disabled");
        this._btnNewTeam.disabled = false;
        this._btnNewTeam.removeAttribute("aria-disabled");
        this._btnNewOther.disabled = false;
        this._btnNewOther.removeAttribute("aria-disabled");
    }

    update() {
        if( this._main.childElementCount > MAX_TEAM_SIZE ) {
            if(this._main.contains(this._btnNewTeamWrapper))
                this._main.removeChild(this._btnNewTeamWrapper);
        } else {
            this._main.appendChild(this._btnNewTeamWrapper);
        }

        if( this._other.childElementCount > MAX_TEAM_SIZE ) {
            if(this._other.contains(this._btnNewOtherWrapper))
                this._other.removeChild(this._btnNewOtherWrapper);
        } else {
            this._other.appendChild(this._btnNewOtherWrapper);
        }
    }

    async data(string:string){
        this.lock();

        while(this._data === undefined || this._save["name"].children.length === 0)
            await sleep();

        const value:Game|null = JSON.parse(string);
        if(value === null)
            return;

        if(typeof value.name !== "string") 
            throw new TypeError("Game Name must be a string!");
        this._save["name"].value = value.name;

        const index = findByName(value.name, this._data);
        if(index === null)
            throw new Error("Cannot find game in data!");

        if(typeof value.generation !== "number")
            throw new TypeError("Game Generation must be a number!");
        this._save["generation"].value = value.generation.toString();

        if(typeof value.region !== "string")
            throw new TypeError("Game Region must be a string!");
        this._save["region"].value = value.region;

        if(!Array.isArray(value.team))
            throw new TypeError("Game Team must be an Array!");
        
        const team:Pokemon[] = [];
        for(const pokemon of value.team){
            const input = new PokemonInput(index, pokemon.name);
            await input.setValue(pokemon);
            this._main.appendChild(input);
            team.push(input.getValue());
        }
        this._save["team"].value = JSON.stringify(team);

        /*if(!Array.isArray(value.team))
            throw new TypeError("Other Team must be an Array!");
        
        if(value.others.length > 0){
            this._save["others"].value = JSON.stringify(
                (await Promise.all(value.others.map(async(pokemon) => {
                    const input = new PokemonInput(index, pokemon.name);
                    await input.setValue(pokemon);
        
                    this._main.appendChild(input);

                    return input.getValue();
                })
            )));
        }*/
        
        this.update();
        this.unlock();
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }

    async connectedCallback(){
        appendChildren(this, [
            _("label", {for: "txtName"}, "Name:"),
            this._save["name"],
            _("div", {class: "game-info"},
                _("label", {for: "txtGeneration"}, "Generation:"),
                this._save["generation"],
                _("label", {for: "txtGeneration"}, "Region:"),
                this._save["region"],
                this._save["team"],
                this._save["others"]
            ),
            _("label", {class: "detail-summary", for: "main-pokemon"}, "Main Pokemon"),
            _("label", {class: "detail-summary", for: "other-pokemon"}, "Other Pokemon"),
            this._btnSubmit,
            _("input", {id: "main-pokemon", class: "detail-toggle", type: "radio", name: "team-view", checked: true}),
            this._main,
            _("input", {id: "other-pokemon", class: "detail-toggle", type: "radio", name: "team-view"}),
            this._other
        ]);

        this._main.appendChild(this._btnNewTeamWrapper);
        this._other.appendChild(this._btnNewOtherWrapper);
    }
}
customElements.define("game-input", GameInputForm, {extends: "form"});

function buildGameSelect(list:GameData[]):HTMLElement[] {
    const output:Array<HTMLElement> = []

    const groups:Record<string, HTMLElement[]> = {};
    for(let i=0; i<list.length; ++i){
        const game = list[i];

        if(groups[game.generation] === undefined)
            groups[game.generation] = [];

        groups[game.generation].push(_("option", {value: game.name}, game.name));
    }

    for(const gen in groups){
        output.push(_("optgroup", {label: `Generation ${gen}:`}, groups[gen]))
    }

    return output;
}

/** Find GameData By Name
 * 
 * @param {string} name 
 * @param {GameData[]} list 
 * @returns {GameData|null}
 */
function findByName(name:string, list:GameData[]):GameData|null {
    for(const data of list){
        if(data.name === name)
            return data;
    }

    return null;
}