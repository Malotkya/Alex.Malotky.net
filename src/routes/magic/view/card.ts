import { createElement as _ } from "zim-engine";
import { Card } from "../types";

export default function CardView(card:Card){
    const {
        name = "Missing Name",
        count = 1,
        image = [],
        typeLine = "Type Line",
        oracle = "Oracle Text",
        foil = false
    } = card;

    const altText = altTextGenerator(name);

    //Needed for apple devices
    return _("li", {class: "card", onclick:(event)=>(event.target as HTMLElement).focus()},
        _("span", {class: "name"}, `${count} ${name.replace("//", "<br>&nbsp;&nbsp;")}`),
        _("span", 
            _("figure", {class: image.length>1?"doubleface":undefined},
                _("div", {class: "figure"},
                    image.length === 0
                        ? _("div", {class: "oracle"}, _("p", typeLine), _("p", oracle))
                        : image.map((v, i)=>_("img", {src: v, alt: altText(i)})),
                    foil? _("div", {class: "foil"}): null
                )
            )
        )
    );
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