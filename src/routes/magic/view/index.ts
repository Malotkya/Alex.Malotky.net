/** /routes/magic/view
 * 
 * @author Alex Malotky
 */
import {Buffer} from "node:buffer";
import {createElement as _, Content} from "zim-engine";
import { DeckItem } from "../data/deck";
import DeckView from "./deck";
import DeckInput from "../element/DeckInput";
export {DeckView};

/** Deck Edit Module
 * 
 * @param {DeckItem} deck 
 * @returns {Content}
 */
export function DeckEdit(deck?:DeckItem): Content{
    const data = Buffer.from(
        JSON.stringify(deck || {})
    ).toString("base64");

    return  _("form",
        {
            data,
            is: "deck-input",
            id: "deck-input",
            method: "POST"
        }
    );
}

export function EditPreview():Content {
    return [
        _("h1", "Magic Deck Editor"),
        _("aside", {class: "info"},
            _("h2", "About"), 
            _("p",
                "This is the editor that I created so that I could easily store and display Magic the Gathering Decks on my website. ",
                "While the form on this page doesn't have the ability to upload decks, it does have the ability to store them into a .json file to be downloaded. ",
                "Because this is a custom form instead of a custom element wrapped around a form, this will not laod in safari.  This is a known error that I have no intention to fix because I am the only who really uses this, and refactoring it isn't high on my priority list."
            ),
            _("cache-downloader"),
            _("p", {class: "error"}, "This form does not work in safari!"),
        ),
        _("section",
            _("h2", "Load Data from File"),
            _("input", {type: "file", onchange: loadFile})
        ),
        _("form", {id: "deck-input", is: "deck-input", onsubmit:saveFile})
    ]
}



/** List View
 * 
 * @param {Array<DeckItem>} list 
 * @param {Boolean} edit 
 * @returns {Content}
 */
export function DeckListView(list:Array<DeckItem>, edit:boolean = false):Content {
    //TODO: Add pagenation numbers.
    
    return [
        edit? _("cache-downloader"): undefined,
        _("h1", "Magic the Gathering Decks"),
        edit? _("a", {class: "btn", href: "/Decks/Edit/New"}, "Create New Deck"): null,
        _("ol", {id: "deck-list"},
            list.map(deck=>_("li", {class: edit? "deck-edit-item": "deck-list-item"},
                _("a", {href: edit? `/Decks/Edit/${deck.id}`: `/Decks/${deck.id}`},
                    _("figure", {class: "deck-art"},
                        _("img", {src: deck.art || "/missing.jpg", alt: `${deck.name} Deck Art`})
                    ),
                    _("h2", deck.name),
                    _("p", {class: "color_identity"},
                        deck.color_identity.length === 0
                            ? _("span", {
                                class: "mana-symbol colorless",
                                role: "img",
                                ariaLabel: "colorless mana symbol"
                            })
                            :deck.color_identity.map(color=>[_("span",
                                {
                                    class: "mana-symbol "+color,
                                    role: "img",
                                    ariaLabel: color+" mana symbol"
                                }
                            ), " "])
                    )
                ),
                edit? _(  "form", {method: "delete", onsubmit: confirmDelete, action: `/Decks/Edit/${deck.id}`},
                    _("button", "Delete")
                ): null,
            ))
        )
    ]
}

/** Front End Confirm Delete
 * 
 * @param {Event} event 
 */
function confirmDelete(event:Event){
    if(!confirm("Are you sure?")) {
        event.preventDefault();
        event.stopPropagation();
    }
}


/** Load File FrontEnd Function
 * 
 * @param {Event} event 
 */
function loadFile(event:Event) {
    (async()=>{
        const files = (<HTMLInputElement>event.target).files
        if(files){
            const form = document.querySelector("form[is='deck-input']");
            if(form === null) {
                //@ts-ignore
                env.error("Unable to find form!");
                return;
            }

            const data = await files[0].text();
            console.log(data);
            form.setAttribute("data", btoa(unescape(encodeURIComponent(data))))
        }
    })();
}

/** Save File Frontend Function
 * 
 * @param {Event} event 
 */
function saveFile(event:Event) {
    event.preventDefault();
    event.stopPropagation();

    const form = <DeckInput>event.target;

    const getValue = (query:string):string => {
        const input = <HTMLInputElement|null>form.querySelector(query);
        if(input === null) {
            console.debug(form);
            throw new Error(`${query} is null!`);
        }
            

        return input.value;
    }

    const getData = ():Promise<DeckItem> => {
        return new Promise((res, rej)=>{
            try {
                res({
                    id:          undefined,
                    name:        getValue("#name"),
                    description: getValue("#description"),
                    art:         getValue('[name="art"]'),
                    color_identity: JSON.parse(getValue('[name="color_identity"]')),
                    commanders:     JSON.parse(getValue('[name="commanders"]')),
                    main_deck:      JSON.parse(getValue('[name="main_deck"]')), 
                });
            } catch (e){
                rej(e);
            }
        })
    }

    getData().then(data=>{
        const link = document.createElement("a");
        link.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        link.download =`${data.name.replaceAll(/\s+/g, "_")}.json`;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();

        window.setTimeout(()=>{
            document.body.removeChild(link);
        }, 1);

    }).catch(console.error);
}