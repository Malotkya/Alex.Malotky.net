import { getAllGameData, GameData } from "@/util/Serebii";
import { createElement as _, appendChildren } from "@/util/Element";
import Game from "../data/game";
import PokemonInput from "./PokemonInput";
import { sleep } from "@/util";

const MAX_TEAM_SIZE = 6;

export default class GameInputForm extends HTMLFormElement {
    _data:GameData[]|undefined;
    _save:Record<keyof Game, HTMLInputElement|HTMLSelectElement>;
    _main:HTMLUListElement;
    _other:HTMLUListElement;

    constructor(){
        super();

        getAllGameData().then(data=>{
            this._data = data;
        }).catch(console.error);

        this._save = {
            name: _("select", {id: "txtName", name: "name"}),
            generation: _("input", {id: "numGeneration", name:"generation", disabled: true}),
            region: _("input", {id: "txtRegion", name: "region", disabled: true}),
            team: _("input", {type: "hidden", name: "team"}),
            others: _("input", {type: "hidden", name: "other"})
        }

        this._main  = _("ul", {class: "pokemon-view"});
        this._other = _("ul", {class: "pokemon-view"});
    }

    static get observedAttributes(){
        return ["data"]
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string){
        if(name === "data"){
            this.data(atob(newValue));
        }
    }

    lock() {
        this._save["name"].disabled = true;
        this._save["name"].ariaDisabled = "true";
    }

    unlock() {
        this._save["name"].disabled = false;
        this._save["name"].ariaDisabled = "";
    }

    async data(string:string){
        this.lock();

        while(this._data === undefined)
            await sleep();

        const value:Game = JSON.parse(string);

        if(typeof value.name !== "string") 
            throw new TypeError("Game Name must be a string!");
        this._save["name"].value = value.name;

        const index = findData(value, this._data);
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

        const mainPromise:Promise<PokemonInput>[] = value.team.map(pokemon => {
            return new Promise(async(res)=>{
                const input = new PokemonInput(index, pokemon.name);
                input.value = pokemon;

                this._main.appendChild(input);

                while(!input.ready)
                    await sleep();
                res(input);
            });
        });

        if(!Array.isArray(value.others))
            throw new TypeError("Game Other Team must be an Array!");

        const otherPromise:Promise<PokemonInput>[] = value.team.map(pokemon => {
            return new Promise(async(res)=>{
                const input = new PokemonInput(index, pokemon.name);
                input.value = pokemon;

                this._other.appendChild(input);

                while(!input.ready)
                    await sleep();
                res(input);
            });
        });

        this._save["team"].value   = JSON.stringify( (await Promise.all(mainPromise)).map(input => input.value) );
        this._save["others"].value = JSON.stringify( (await Promise.all(otherPromise)).map(input => input.value) );

        this.unlock();
    }

    disconnectedCallback(){
        this.innerHTML = "";
    }

    async connectedCallback(){
        let ready = false;

        this.addEventListener("submit", (event)=>{
            //TODO: Add other internal tests
            if(!ready) {
                event.preventDefault();
                event.stopPropagation();
            }
        });

        appendChildren(this, [
            this._save["name"],
            _("div", {class: "game-info"},
                this._save["generation"],
                this._save["region"],
                this._save["team"],
                this._save["others"]
            ),
            _("label", {class: "detail-summary", for: "main-pokmeon"}, "Main Pokemon"),
            _("label", {class: "detail-summary", for: "other-pokmeon"}, "Other Pokemon"),
            _("input", {id: "main-pokemon", class: "detail-toggle", type: "radio", name: "team-view", checked: true}),
            this._main,
            _("input", {id: "other-pokemon", class: "detail-toggle", type: "radio", name: "team-view"}),
            this._other
        ]);

        //Wait for ready.
        while(this._data === undefined)
            await sleep();

        //Game Inputs
        appendChildren(this._save["name"], buildGameSelect(this._data));
        
        //Main Team Inputs
        const btnNewTeam = _("button", {type: "button"}, "New");
        const teamButtonView = _("li", {class: "new-pokemon"}, btnNewTeam);
        this._main.appendChild(teamButtonView);

        //Other Team Inputs
        const btnNewOther = _("button", {type: "button"}, "New");
        const otherButtonView = _("li", {class: "new-pokemon"}, btnNewOther);
        this._other.appendChild(otherButtonView);

        /** Update Form
         * 
         */
        const update = () => {
            teamButtonView.style.display = this._main.childElementCount > MAX_TEAM_SIZE
                ? "none": "";
            teamButtonView.style.display = this._other.childElementCount > MAX_TEAM_SIZE
                ? "none": "";
        }

        btnNewTeam.addEventListener("click", (event)=>{
            const input = new PokemonInput(this._data![Number(this._save["name"].value)]);
            this._main.insertBefore(input, teamButtonView);
            update();
        });

        btnNewOther.addEventListener("click", (event)=>{
            const input = new PokemonInput(this._data![Number(this._save["name"].value)]);
            this._other.insertBefore(input, otherButtonView);
            update();
        });

        this.addEventListener("change", ()=>update());

        
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

        groups[game.generation].push(_("option", {value: i}, game.name));
    }

    for(const gen in groups){
        output.push(_("optgroup", {label: `Generation ${gen}:`}, groups[gen]))
    }

    return output;
}

function findData(game:Game, list:GameData[]):GameData|null {
    for(const data of list){
        if(data.name == game.name)
            return data;
    }

    return null;
}