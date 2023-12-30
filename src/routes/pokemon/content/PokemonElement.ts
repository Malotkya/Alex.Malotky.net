import { createElement as _ } from "../../../util/Elements";
const MASTER_POKEMON_LIST: Array<string> = require("../../../../pokemon.json");

export interface PokemonType {
    name: string,
    number: number,
    level: number,
    moves: Array<string>,
    types: Array<string>,
    item?: string,
    nature?: string,
    ability?: string,
    gender?: boolean, //true: ♂, false: ♀
    shiney?:boolean,
    stats: {
        attack: number,
        defense: number,
        speed:number,
        health: number,
        special?:number,
        specialAttack?: number,
        specialDefence?: number
    }
}

const SEREBII_URI = "https://www.serebii.net/";

function createGenerIcon(gender?:boolean): HTMLElement|null {
    if(gender === null || gender === undefined)
        return null;

    return _("span", {class: "pokemon-gender"}, gender? ' ♂': ' ♀');
}

function statsListItem(name:string, value:number): HTMLElement{
    return _("li", {class: "pokemon-stat-item"}, 
        _("span", {class: "pokemon-stat-name"}, name),
        _("span", {class: "pokemon-stat-value"}, value.toString())
    );
}

function optionalListItem(name:string, value:string): HTMLElement{
    return _("li", {class: "pokemon-optional-item"}, 
        _("span", {class: "pokemon-optional-name"}, name),
        _("span", {class: "pokemon-optional-value"}, value)
    );
}

function getNumber(name:string):number{
    return MASTER_POKEMON_LIST.indexOf(name) + 1;
}

function formatURI(version:StringIndex|undefined, shiney:boolean, number:number): string{
    let baseUri:string = "pokemon/art/";
    if(version){
        if(shiney){
            baseUri = version["shiney"] + "/";
        } else {
            baseUri = version["normal"] + "/";
        }
    }

    let value:string = number.toString();
    if(number < 1000){
        value = `00${number}`.slice(-3);
    }

    return SEREBII_URI + baseUri + value + '.png';
}

export default class PokemonElement extends HTMLElement {
    private _title: HTMLElement;
    private _level: HTMLElement;
    private _types: HTMLElement;
    private _image: HTMLElement;
    private _stats: HTMLElement;
    private _moves: HTMLElement;
    private _optionals: HTMLElement;

    constructor(data:PokemonType, version?:StringIndex, gameName:String = ""){
        super();
        
        this._title = _("h4", {class: "pokemon-title"}, 
            _("span", {class: "pokemon-name"}, data.name),
            createGenerIcon(data.gender)
        );

        this._level = _("p", {class: "pokemon-level"}, `Level: ${data.level}`);

        this._types = _("ul", {class: "pokemon-types-list"},
            data.types.map(type=>_("li", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type))
        );

        this._image = _("figure", {class: "pokemon-image"},
            _("img", {src: formatURI(version, data.shiney, getNumber(data.name)), alt: `${data.name} ${gameName} Sprite`}),
            _("figcaption", data.name)
        );

        this._stats = _("ol", {class: "pokemon-stats-list"});
        this._stats.appendChild(statsListItem("Health:", data.stats.health));
        this._stats.appendChild(statsListItem("Attack:", data.stats.attack));
        this._stats.appendChild(statsListItem("Defense:", data.stats.defense));
        if(data.stats.special) {
            this._stats.appendChild(statsListItem("Special:", data.stats.special));
        } else {
            this._stats.appendChild(statsListItem("Sp. Attack:", data.stats.specialAttack));
            this._stats.appendChild(statsListItem("Sp. Deffence:", data.stats.specialDefence));
        }
        this._stats.appendChild(statsListItem("Speed:", data.stats.speed));

        this._moves = _("ol", {class: "pokmeon-moves-list"}, 
            data.moves.map(move=>_("li", {class:"pokmeon-move-item"}, move))
        );

        this._optionals = _("ul", {class: "pokmeon-optional-list"});
        if(data.ability)
            this._optionals.appendChild(optionalListItem("Ability:", data.ability));

        if(data.nature)
            this._optionals.appendChild(optionalListItem("Nature:", data.nature));

        if(data.item)
            this._optionals.appendChild(optionalListItem("Item:", data.item));
        else if(data.item === "")
            this._optionals.appendChild(optionalListItem("Item:", "<i>none</i>"));
    }

    connectedCallback(){
        this.appendChild(this._title);
        this.appendChild(this._types);
        this.appendChild(this._level);
        this.appendChild(this._image);
        this.appendChild(this._stats);
        this.appendChild(this._moves);
        if(this._optionals.childNodes.length > 0)
            this.appendChild(this._optionals);
    }
}

customElements.define("pokemon-element", PokemonElement);