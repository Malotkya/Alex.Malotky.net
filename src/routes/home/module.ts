import { createElement as _ } from "../../util/Elements";
import AnimatedText from "./content/AnimatedText";

const TEXT = "Hello,\r\nMy name is Alex Malotky.";

export default function Home() {

    return [ 
        _("h1", "Welcome!"),
            _("div", {id: "home-container"}),
                new AnimatedText(TEXT),
                _("article", 
                _("h2", "Project Spotlight:"),
                _("div", {id: "spotlight"},
                    Spotlight()
                )
            ),
            _("article", 
            _("p", "My website is still under construction, and I will be continually working on it over the summer.")
        )
    ];
}

export function main() {
    if(typeof (window as any).visited === "undefined"){
        (window as any).visited = true;
        console.log("Welcome to Alex.Malotky.net!");
        console.log("This is being printed from a file that is being loaded and executed dynamically!")
    }
}

function Spotlight(){
    return [
        _("h3", "Phasmophobia Helper"),
        _("figure", 
            _("img", {src: "/media/Phasmo-Screenshot.png", alt: "Screenshot"})
        ),
        _("section",
            _("p", 
                "It is currently hosted on firebase at ",
                _("a", {href: "https://phasmophobiahelper.web.app/"},
                    "Phasmophobiahelper.web.app"
                ),
                "."
            ),
            _("p", 
                "This project came about while playing the game",
                _("a", {href: "https://store.steampowered.com/app/739630/Phasmophobia/"},
                    "Phasmophobia"
                ),
                `with my brother.  Phasmophobia is a game where you have to figure out the type of ghost haunting a house by
                gathering evidence left by the ghost. We were playing in a special mode where some of the evidence that a ghost has 
                will not present, so ruling out ghosts becomes more complicated.  We wanted to be able to cross of evidence that we didn't find 
                but not necisarly cross off ghosts that have those evidence.`
            ),
            _("p", 
                "This project focused on manipulting a web page using javascript to make the lists of evidence and ghosts easy to understand.",
            )
        )
    ]
}