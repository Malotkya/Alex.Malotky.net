import { GameData, PokemonData, getPokemonData, getMoveData, generateSprite, VersionMap } from "@/util/Serebii";
import { createElement as _, appendChildren } from "@/util/Element";
import { sleep, Number_Or } from "@/util";
import Pokemon, {Move} from "../data/pokemon";
import ModsInput from "./ModsInput";

const EMPTY_POKEMON:Pokemon = {
    stats: {},
    types: [],
    modifiers: {},
    moves: []
} as any;
const EMPTY_POKEMON_DATA:PokemonData = {
    number: -1,
    name: "Mising No.",
    types: ["???"],
    versions: [],
    abilities: [],
    moves: ["Struggle"]
}

export default class PokemonInput extends HTMLElement {
    private _game:GameData;
    private _pokemon:PokemonData;
    private _data:Pokemon;
    private _id:number

    //View
    private _types:HTMLUListElement;
    private _statsList:HTMLOListElement;
    private _moveList:HTMLOListElement;
    private _sprite:HTMLImageElement;

    //Inputs
    private _selName:HTMLSelectElement;
    private _numLevel:HTMLInputElement;
    private _selVersion:HTMLSelectElement;
    private _selGender:HTMLSelectElement;
    private _chbShiney:HTMLInputElement;
    private _stats:Record<string, HTMLInputElement>;
    private _moves:Array<HTMLSelectElement>;
    private _mods:ModsInput;

    //Static
    private static count:number = 0;

    /** Constuctor
     * 
     * @param {GameData} data 
     */
    constructor(data:GameData, name?:string){
        super();
        this.role = "list-item";
        this._game = data;
        this._pokemon = EMPTY_POKEMON_DATA;
        this._data = JSON.parse(JSON.stringify(EMPTY_POKEMON));
        this._id = ++PokemonInput.count;

        // GAME DATA *******************************************************
        //Name Select
        this._selName = _("select", {id: `name${this._id}`},
            data.pokedex.map(name=>_("option", {value: name}, name))
        );
        
        //Stats Inputs
        const [wrapper, inputs] = buildStatsInputs(data.generation, this._id);
        this._stats = inputs;
        this._statsList = _("ol", {class: "pokemon-stats-list"}, wrapper);

        //Modfier Input
        this._mods = new ModsInput(this._id, data.modifiers);      

        // INIT DATA *******************************************************
        this._moves = [];
        this._moveList = _("ol");

        this._selVersion = _("select", {id: `version${this._id}`}, _("option", {value: ""}, "Normal"));
        this._types = _("ul", {class: "pokemon-types-list"});

        this._numLevel = _("input", {id: `level${this._id}`, type: "number"});
        
        this._chbShiney = _("input", {type: "checkbox", id: `shiney${this._id}`});
        this._selGender = _("select", _("option", {value: "M"}, "Male"), _("option", {value: "F"}, "Female"));

        this._sprite = new Image();

        /** Name Change Event Listener
         * 
         */
        this._selName.addEventListener("change", (event)=>{
            event.stopPropagation();
            this._data.name = this._selName.value;
            this.pokmeon = this._selName.value;
        });

        /** Any Change Event Listern
         * 
         */
        this.addEventListener("change", (event)=>{
            event.stopPropagation();

            //Update data when ready.
            (async()=>{
                while(!this.ready)
                    await sleep();

                await this.changeSprite();

                this._data.name = this._selName.value;
                this._data.level = Number_Or(this._numLevel.value, 0);
                this._data.types = Array.from(this._sprite.children).map(c=>c.textContent!);
                this._data.moves = <Move[]>(await Promise.all(this._moves
                    .map(async(e)=>{
                        if(e.value === "")
                            return null;
                        try {
                            return await getMoveData(e.value, this._game.generation);
                        } catch (e){
                            console.error(e);
                            return null
                        }
                    }
                ))).filter(v=>v!==null);
                
                if(this._game.generation > 1)
                    this._data.gender = this._selGender.value === "M";

                this._data.shiney = this._chbShiney.checked;
                this._data.version = this._selVersion.value? this._selVersion.value: null;
                this._data.modifiers = this._mods.value();

                
                this._data.sprite = this._sprite.src;
                this._data.sprite_text = this._sprite.alt;

                this.parentElement?.dispatchEvent(new CustomEvent("change", {bubbles: true}));
            })();
        });

        //Start Init
        if(name){
            this.pokmeon = name;
        } else {
            this.pokmeon = this._selName.value;
        }
    }

    /** Ready for Changes
     * 
     */
    get ready():boolean {
        return !this._selName.disabled
    }

    /** Lock Inputs
     * 
     */
    lock(){
        this.querySelectorAll("input, select").forEach(input=>{
            (<HTMLInputElement>input).disabled = true;
            input.ariaDisabled = "true"
        });
    }

    /** Unlock Inputs
     * 
     */
    unlock(){
        this.querySelectorAll("input, select").forEach(input=>{
            (<HTMLInputElement>input).disabled = false;
            input.ariaDisabled = ""
        });
    }

    /** Game Data
     * 
     */
    set game(value:GameData){
        this.lock();
        this._game = value;

        this._selName.innerHTML = "";
        appendChildren(
            this._selName,
            this._game.pokedex.map(name=>_("option", {value: name}, name))
        );

        const [wrapper, inputs] = buildStatsInputs(value.generation, this._id);
        this._statsList.innerHTML = "";
        appendChildren(this._statsList, wrapper);
        this._stats = inputs;

        if(this.isConnected)
            this.connectedCallback()

        //Update Pokemon For Generation Change.
        this.pokmeon = this._pokemon.name;
    }

    /** Set Pokemon Name
     * 
     */
    set pokmeon(value:string){
        this.lock();
        getPokemonData(value, this._game.generation).then((data)=>{
            this._pokemon = data;
            this._data.name = data.name;
            this._data.types = data.types;

            this.init();
            this.update().then(()=>{
                this.unlock();
                this.dispatchEvent(new CustomEvent("change"));
            }).catch(console.error);
        }).catch(console.error);

    }

    /** Init Pokemon Generic Info
     * 
     */
    init(){
        this._selName.value = this._pokemon.name;

        this._mods.init(this._game.modifiers, {"ability": this._pokemon.abilities});
        
        const [moveItems, moveInputs] = buildMoveInputs(this._pokemon.moves);
        this._moves = moveInputs;
        this._moveList.innerHTML = "";
        appendChildren(this._moveList, moveItems);

        this._types.innerHTML = "";
        appendChildren(this._types, this._pokemon.types.map(value=>{
            return _("li", {class: `pokemon-type-item ${value.toLocaleLowerCase()}`}, value)
        }));

        this._stats["data"]

        this._selVersion.innerHTML = "",
        this._selVersion.appendChild(_("option", {value: ""}, "Normal"));
        appendChildren(this._selVersion, this._pokemon.versions.map(value=>
            _("option", {value}, VersionMap[value] || "Error")
        ));
    }

    /** Set Pokemon Value
     * 
     */
    set value(value:Pokemon) {
        this._data = value;

        //Change Pokemon if Different
        if(this._data.name !== this._pokemon.name){
            this.pokmeon = value.name;
        } else {
            this.lock();

            this.update().then(()=>{
                this.unlock();
            });
        }
    }

    /** Get Pokemon Value
     * 
     */
    get value():Pokemon|null{
        return this._data || null;
    }

    /** Update Specific Pokemon Data
     * 
     * @returns 
     */
    async update(){
        this._selName.value = this._data.name;

        this._numLevel.value = String(this._data.level || 0);

        if(typeof this._data.gender === "boolean") {
            this._selGender.value = this._data.gender? "M": "F";
        }

        this._chbShiney.checked = typeof this._data.shiney === "boolean"
            ? this._data.shiney
            : false;

        this._selVersion.value = this._data.version || "";
                
        this._stats["health"].value  = String(this._data.stats["health"]);
        this._stats["attack"].value  = String(this._data.stats["attack"]);
        this._stats["defense"].value = String(this._data.stats["defense"]);
        this._stats["speed"].value   = String(this._data.stats["speed"]);;

        if(this._game.generation < 3){
            this._stats["special"].value = String(this._data.stats["special"]);
        } else {
            this._stats["specialAttack"].value = String(this._data.stats["specialAttack"]);
            this._stats["specialDefense"].value = String(this._data.stats["specialDefense"]);
        }

        for(let i=0; i<this._moves.length; i++){
            this._moves[i].value = this._data.moves[i]? this._data.moves[i].name: "";
        }

        for(const name in this._game.modifiers){
            //@ts-ignore
            this._mods.set(name, this._data.modifiers[name]);
        }
            
        await this.changeSprite();
    }

    changeSprite():Promise<void> {
        return new Promise((res)=>{
            const name    = this._selName.value;
            const number  = this._pokemon.number;
            const version = this._selVersion.value;
            const shiney  = this._game.generation > 1? this._chbShiney.checked      : undefined;
            const gender  = this._game.generation > 1? this._selGender.value === "M": undefined;

            const [spriteSrc, spriteText] = generateSprite(this._game, name, number, version, shiney, gender);
            this._sprite.addEventListener("load", ()=>res(), {once: true});
            this._sprite.src = spriteSrc;
            this._sprite.alt = spriteText;
        });
    }

    /** Connected Callback
     * 
     */
    connectedCallback(){
        this.innerHTML = "";

        appendChildren(this,[
            _("p", {class: "pokemon-title"},
                _("label", {for: `name${this._id}`}, "Name: "),
                this._selName
            ),
            _("figure", {class: "pokemon-image"},
                this._sprite
            ),
            _("ul", {class: "pokemon-sprite-input"},
                this._selVersion.children.length > 1
                    ? _("li", {class: "sprite-input-item"},
                        _("label", {for: `version${this._id}`}, "Version: "),
                        this._selVersion
                    )
                    : null,
                this._game.generation > 1
                    ? _("li", {class: "sprite-input-item radio"},
                        this._chbShiney,
                        _("label", {for: `shiney${this._id}`}, "Shiney")
                    )
                    : null,
                this._game.generation > 1
                    ? _("li", {class: "sprite-input-item"},
                        _("label", {for: `gender${this._id}`}, "Gender: "),
                        this._selGender
                    )
                    : null,
            ),
            this._types,
            _("p", {class: "pokemon-level"},
                _("label", {for: `level${this._id}`}, "Level: "),
                this._numLevel
            ),
            this._statsList,
            _("div",  {class: "pokemon-moves-list"},
                _("p", {class: "move-header"}, "Moves:"),
                this._moveList
            ),
            this._mods
        ]);
    }
}

customElements.define("pokemon-input", PokemonInput)

/** Build Stats Inputs
 * 
 * @param {number} gen 
 * @returns {[Array, Array]}
 */
function buildStatsInputs(gen:number, id:number):[HTMLLIElement[], Record<string, HTMLInputElement>]{
    const record:Record<string, HTMLInputElement> = {};
    const list:HTMLLIElement[] = [];

    record["health"] = _("input", {id: `health${id}`, type: "number"});
    list.push(_("li", {class: "pokemon-stat-name"},
        _("span", {class: "pokemon-stat-name"}, 
            _("label", {for: `health${id}`}, "Health: ")
        ),
        _("span", {class: "pokemon-stat-value"},
            record["health"]
        )
    ));

    record["attack"] = _("input", {id: `attack${id}`, type: "number"});
    list.push(_("li", {class: "pokemon-stat-name"},
        _("span", {class: "pokemon-stat-name"}, 
            _("label", {for: `attack${id}`}, "Attack: ")
        ),
        _("span", {class: "pokemon-stat-value"},
            record["attack"]
        )
    ));

    record["defense"] = _("input", {id: `defense${id}`, type: "number"});
    list.push(_("li", {class: "pokemon-stat-name"},
        _("span", {class: "pokemon-stat-name"}, 
            _("label", {for: `defense${id}`}, "Defense: ")
        ),
        _("span", {class: "pokemon-stat-value"},
            record["defense"]
        )
    ));

    if(gen < 3){
        record["special"] = _("input", {id: `special${id}`, type: "number"});
        list.push(_("li", {class: "pokemon-stat-name"},
            _("span", {class: "pokemon-stat-name"}, 
                _("label", {for: `special${id}`}, "Special: ")
            ),
            _("span", {class: "pokemon-stat-value"},
                record["special"]
            )
        ));
    } else {
        record["specialAttack"] = _("input", {id: `specialAttack${id}`, type: "number"});
        list.push(_("li", {class: "pokemon-stat-name"},
            _("span", {class: "pokemon-stat-name"}, 
                _("label", {for: `specialAttack${id}`}, "Sp. Attack: ")
            ),
            _("span", {class: "pokemon-stat-value"},
                record["specialAttack"]
            )
        ));

        record["specialDefense"] = _("input", {id: `specialDefense${id}`, type: "number"});
        list.push(_("li", {class: "pokemon-stat-name"},
            _("span", {class: "pokemon-stat-name"}, 
                _("label", {for: `specialDefense${id}`}, "Sp. Defense: ")
            ),
            _("span", {class: "pokemon-stat-value"},
                record["specialDefense"]
            )
        ));
    }

    record["speed"] = _("input", {id: `speed${id}`, type: "number"});
    list.push(_("li", {class: "pokemon-stat-name"},
        _("span", {class: "pokemon-stat-name"}, 
            _("label", {for: `speed${id}`}, "Speed: ")
        ),
        _("span", {class: "pokemon-stat-value"},
            record["speed"]
        )
    ));

    return [list, record];
}

/** Build Move Input List
 * 
 * @param {string[]} list 
 * @returns {[Array, Array]}
 */
function buildMoveInputs(list:string[]):[HTMLLIElement[], HTMLSelectElement[]]{
    const option = (s:string) => _("option", {value:s}, s);
    const select = (att:Record<string, any> = {}) => _("select", att,
        _("option", ""),
        list.map(option)
    );

    const inputs = [
        select(),
        select(),
        select(),
        select(),
    ];
    
    //Add Event Listeners To Prevent Duplicate Moves.
    inputs.forEach(input=>{
        input.addEventListener("change", ()=>{
            for(const other of inputs){
                if(other !== input){
                    const value = other.value;
                    other.innerHTML = "";
                    other.appendChild(_("option", ""));
                    appendChildren(other, list
                        .filter(s=>s!==input.value)
                        .map(option)
                    )
                    other.value = value;
                }
            }
        });
    });

    return [
        inputs.map(e=>_("li", e)),
        inputs
    ]
}