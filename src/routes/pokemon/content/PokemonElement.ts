import { createElement as _, Content } from "../../../util/Elements";
import { Pokemon } from "./PokemonTypes";
import { formatURI } from "./Serebii";
import MoveElement from "./MoveElement";


/** Creates (or Doesn't) icon based on gender identifier.
 * 
 * @param {boolean} gender 
 * @returns {Content}
 */
function createGenerIcon(gender?:boolean): Content {
    if(gender === null || gender === undefined)
        return null;

    return _("span", {class: "pokemon-gender", "aria-label": gender? "male": "female"}, gender? ' ♂': ' ♀');
}

/** Create Stats List Item
 * 
 * @param {string} name 
 * @param {number} value 
 * @returns {HTMLElement}
 */
function statsListItem(name:string, value:number): HTMLElement{
    return _("li", {class: "pokemon-stat-item"}, 
        _("span", {class: "pokemon-stat-name"}, name),
        _("span", {class: "pokemon-stat-value"}, value.toString())
    );
}

/** Create Optional List Item
 * 
 * @param {string} name 
 * @param {string} value 
 * @returns {HTMLElement}
 */
function optionalListItem(name:string, value:string): HTMLElement{
    return _("li", {class: "pokemon-optional-item"}, 
        _("span", {class: "pokemon-optional-name"}, name),
        _("span", {class: "pokemon-optional-value"}, value)
    );
}

/** Pokemon-Element
 * 
 */
export default class PokemonElement extends HTMLElement {
    private _title: HTMLElement;
    private _level: HTMLElement;
    private _types: HTMLElement;
    private _image: HTMLElement;
    private _stats: HTMLElement;
    private _moves: HTMLElement;
    private _optionals: HTMLElement;

    constructor(data:Pokemon, version?:StringIndex, gameName:String = ""){
        super();
        
        this._title = _("h4", {class: "pokemon-title"}, 
            _("span", {class: "pokemon-name"}, data.name)
        );

        this._level = _("p", {class: "pokemon-level"}, `Level: ${data.level}`);

        this._types = _("ul", {class: "pokemon-types-list"},
            data.types.map(type=>_("li", {class: `pokemon-type-item ${type.toLocaleLowerCase()}`}, type))
        );

        this._image = _("figure", {class: "pokemon-image"},
            _("img", {src: formatURI(data, version), alt: `${data.name} ${gameName} Sprite`}),
            _("figcaption", data.name, createGenerIcon(data.gender))
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

        while(data.moves.length < 4){
            data.moves.push("");
        }

        while(data.moves.length > 4){
            data.moves.pop();
        }

        this._moves = _("ol", {class: "pokmeon-moves-list"}, 
            data.moves.map(move=>new MoveElement(move))
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