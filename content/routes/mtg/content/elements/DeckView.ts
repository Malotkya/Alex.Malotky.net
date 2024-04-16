/** /routes/mtg/content/element/DeckView.ts
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "../../../../util/Elements";
import {Card} from "../../../../util/Scryfall";
import Masonry from "masonry-layout";

/** Deck-View-Element
 * 
 */
export default class DeckView extends HTMLElement{
    private _list: Map<string, Array<Card>>;

    /** Constructor
     * 
     * @param categories 
     */
    constructor(categories?:Dictionary<Array<Card>>){
        super();
        this._list = new Map();
        this.style.display = "block";

        if(typeof categories !== "undefined") {
            this.categories = categories;
        } else {
            //Attempt to create categories from JSON text inside of object.
            this.categories = JSON.parse(this.innerText);
        }
    }

    /** Catagories setter
     * 
     * Converts index object holding arrays to Map of Arrays
     * ! ONLY CHECKS FOR AN ARRAY, DOSENT VERIFY CARD OBJECTS IN ARRAY !
     */
    private set categories(value: Dictionary<Array<Card>>){
        for(let name in value){
            const list:Array<Card> = value[name];
            if(!Array.isArray(list))
                throw new TypeError(`'${name}' category is not formated as a list!`);

            this._list.set(name, list);
        }   
    }

    /** Check Image Heights
     * 
     * @param {Array<HTMLElement>} list 
     */
    public checkImageHeights(list: Array<HTMLElement>){
        const limit = this.getBoundingClientRect().bottom;

        for(let figure of list){
            figure.style.top = "";
            const {bottom} = figure.getBoundingClientRect();

            if(bottom > limit){
                figure.style.top = `${limit-bottom}px`;
            }
        }
    }

    /** Connected Callback
     * 
     */
    public connectedCallback(){
        this.innerHTML = "";
        const promiseList: Array<Promise<HTMLElement>> = [];
        
        //Create Array sorted by alphabetically by catagory name.
        for( let [name, list] of  Array.from(this._list.entries()).sort((a,b)=>a[0].localeCompare(b[0])) ) 
            this.appendChild(CategoryElement(name, list, promiseList));

        //Masonry Black Magic
        new Masonry(this, {
            itemSelector: '.category',
            columnWidth: '.category',
            percentPosition: true
        }).layout();

        Promise.all(promiseList).then((list: Array<HTMLElement>)=>{
            this.checkImageHeights(list);
        });
    }

    public readyCallback(): void {
        this.checkImageHeights(Array.from(this.querySelectorAll(".figure")));
    }
}

customElements.define("deck-view", DeckView);

/** Category Element Module
 * 
 * @param {string} name 
 * @param {Array<Card>} list 
 * @returns {Content}
 */
function CategoryElement(name:string, list:Array<Card>, loadList:Array<Promise<HTMLElement>>):HTMLElement{
    return _("section", {class: "category"},
        _("h2", name),
        _("ul", list.map( card=>CardElement(card, loadList)))
    );
}

/** Card Element Module
 * 
 * @param {Card} card 
 * @returns {Content}
 */
export function CardElement(card:Card, loadList?:Array<Promise<HTMLElement>>): Content{
    const {
        name = "Missing Name",
        count = 1,
        image = [],
        typeLine = "Type Line",
        oracle = "Oracle Text",
        foil = false
    } = card;

    const altText = altTextGenerator(name);
    const images:Array<HTMLElement> = image.map((v, i)=>{
        const image = _("img", {src: v, alt: altText(i)});
        if(loadList){
             loadList.push(new Promise((res,rej)=>{
                image.addEventListener("load", ()=>res(image.parentElement), {once: true});
            }));
        }
        return image;
    });

    //Push backup if no image.
    if(images.length === 0){
        images.push(_("div", {class: "oracle"}, _("p", typeLine), _("p", oracle)))
    }

    const output = _("li", {class: "card"},
        _("span", {class: "name"}, `${count} ${name.replace("//", "<br>&nbsp;&nbsp;")}`),
        _("span", 
            _("figure", {class: images.length>1?"doubleface":""},
                _("div", {class: "figure"},
                    images,
                    foil? _("div", {class: "foil"}): null
                )
            )
        )
    );

    //Needed for apple devices
    output.addEventListener("click", ()=>this.focus());

    return output;
}

/** Alt Text Generator
 * 
 * Creates function that generates alt text based on sides of the card.
 * 
 * @param {string} name 
 * @returns {Function}
 */
function altTextGenerator(name:string):(i:number)=>string{
    const array: Array<string> = name.split("//");

    return (s:number):string =>{
        if(s >= array.length)
            s = array.length - 1;

        let text:string;
        if(s === 0) {
            text = "Front";
        } else if(s === 1) {
            text = "Back";
        } else {
            text = "Side " + s;
        }

        return `${array[s]} ${text}`;
    }
}