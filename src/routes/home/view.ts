/** /routes/home/view
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "zim-engine";

/** Home View
 * 
 * @returns {Content}
 */
export default function Home():Content {
    return [
        _("h1", "Welcome!"),
        _("div", {id: "home-container"},
            _("animated-text", "Hello,\r\nMy name is Alex Malotky."),
            _("article",
                _("p", "I have just graduated from UW-Platteville, and I am excited to get into the programming field!")
            ),
            _("article", 
                _("h2", "Project Spotlight:"),
                _("div", {id: "spotlight"},
                    Spotlight()
                )
            )
        ),
        _("script", {env: true},
            ()=>{
                if(typeof (<any>window).visited === "undefined"){
                    (<any>window).visited = true;
                    console.log("Welcome to Alex.Malotky.net!");
                    console.log("This is being printed from a script that is being loaded and executed dynamically!");
                    console.log("Code seen here: https://github.com/Malotkya/Alex.Malotky.net/blob/main/src/routes/home/view.ts");
                }
            }
        )
    ]
}

/** Spotlight Content
 * 
 * @returns {Content}
 */
function Spotlight(): Content{
    return [
        _("h3", "Phasmophobia Helper"),
        _("figure", 
            _("img", {src: "/Phasmo-Screenshot.png", alt: "Screenshot"})
        ),
        _("section",
            _("p", 
                "It is currently hosted on cloudflare ",
                _("a", {href: "https://Phasmo.Malotky.net/"},
                    "here"
                ),
                "."
            ),
            _("p", 
                "This project came about while playing the game ",
                _("a", {href: "https://store.steampowered.com/app/739630/Phasmophobia/"},
                    "Phasmophobia"
                ),
                ` with my brother.  Phasmophobia is a game where you have to figure out the type of ghost haunting a house by
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