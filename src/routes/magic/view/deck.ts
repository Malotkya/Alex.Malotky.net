/** /routes/magic/view/deck
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content, RenderEnvironment } from "zim-engine";
import { DeckItem } from "../data/deck";
import CardView from "./card";

/** Fix Images
 * 
 * @param {RenderEnvironment} env 
 */
function fixImages(env:RenderEnvironment){
    const main = document.querySelector("main")!;

    async function handleFix(){
        console.debug("Start Fix!");
        const limit = main.getBoundingClientRect().bottom;

        (document.querySelectorAll(".figure") as NodeListOf<HTMLElement>).forEach((figure)=>{
            figure.style.top = "";
            const {bottom} = figure.getBoundingClientRect();
            if(bottom > limit){
                figure.style.top = `${limit-bottom}px`;
            }
        });
    }

    //Fix Images after all images are loaded
    const allImagesLoaded:Promise<void>[] = [];

    main.querySelectorAll("img").forEach(image=>{
        allImagesLoaded.push(new Promise(res=>{
            image.addEventListener("load", ()=>res(), {once: true});
        }))
    });

    Promise.all(allImagesLoaded).then(()=>{
        handleFix();
    }).catch(console.error);

    //Fix Images after the page has resized.
    env.event("resize", handleFix);
}

/** Deck View
 * 
 * @param {DeckItem} deck 
 * @returns {Content}
 */
export default function DeckView(deck:DeckItem):Content {
    const main_deck = [];
    for(const name in deck.main_deck){
        const cat = deck.main_deck[name];
        main_deck.push(_("section", {class: "category"},
            _("h2", name),
            _("ul", cat.map(c=>CardView(c)))
        ))
    }

    return [
        _("aside", {id:"deckHeader"},
            _("h1", deck.name),
            _("p", deck.description)
        ),
        _("a", {class: "btn", href: "/Decks"}, "Back"),
        _("section", {id:"commanders", class: "category"},
            _("h2", deck.commanders.length > 2? "Commanders:": "Commander:"),
            _("ul", deck.commanders.map(c=> CardView(c)))
        ),
        _("div", {class: "catagory-list grid", dataMasonry:'{ "itemSelector": ".category", "columnWidth": ".category" }'},
            main_deck
        ),
        _("script", {env: true}, fixImages)
    ]
}