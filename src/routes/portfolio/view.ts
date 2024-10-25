import { createElement as _ } from "zim-engine";
import { MarkDown } from "@/util";

const mdPortfolio = MarkDown(require("./data/portfolio.md"));
const mdCapstone  = MarkDown(require("./data/capstone.md"));
const mdDuck      = MarkDown(require("./data/duck.md"));

export default function Portfolio(){
    return [
        _("h1", "Portfolio"),

        //Portfolio
        _("article", {class: "portfolio-card"},
            _("h2", "This Website"),
            _("p", {class: "links"},
                _("a", {href: "https://github.com/Malotkya/AlexMalotky.com"}, "Github Repo")
            ),
            _("div", {class: "markdown"}, mdPortfolio)
        ),

        //Capstone Project
        _("article", {class: "portfolio-card"},
            _("h2", "Capstone Project"),
            _("p", {class: "links"},
                _("a", {href: "/Decks", target: "_blank"}, "Find it Here"),
                " | ",
                _("a", {href: "https://github.com/Malotkya/CapstoneProject"}, "Github Repo")
            ),
            _("div", {class: "markdown"}, mdCapstone),
            _("p", `Unfortunatly the project never went live and I have added a modified/lite version of the code here on my portfolio website.  The deck view page is the same with some styling changes to match my website.
                    The view all does not currently have any search functionality because wix's database and firebase are different enough that I had to put it off.  But it is in the works.`
            )
        ),

        //Duck App
        _("article", {class: "portfolio-card"},
            _("h2", "Duckin Around"),
            _("p", {class: "links"},
                _("a", {href: "https://DuckinAround.club"}, "Find it Here")
            ),
            _("div", {class: "markdown"}, mdDuck)
        ),

        //Phasmophobia Helper
        _("article", {class: "portfolio-card"},
            _("h2", "Phasmophobia Helper"),
            _("p", {class: "links"},
                _("a", {href: "https://Phasmo.Malotky.net/"}, "Find it Here"),
                " | ",
                _("a", {href: "https://github.com/Malotkya/PhasmophobiaHelper"}, "Github Repo")
            ),
            _("p", `Phasmophobia is a horror puzzle game where you enter a haunted house and attept to discover the type of ghost haunting the house.
                    There are varying levels of difficulty where not all the evidence needed to identify the ghost are presented instead rellying on "secondary evidence".
                    This app will remove ghosts from the list based on the amount of evidence that get provided and help narrow down the ghost you are trying to discover.`
            ),
            _("p", `I created this website using Typescript to create classes that interact with the dom, abstracting the logic of the website from the dom manipulation.
                    Webpack is used to bundle it all together, and is hosted, like most of my projects on cloudflare.`
            )
        ),

        //Static Games
        _("article", {class: "portfolio-card"},
            _("h2", "Games in React"),
            _("p", {class: "links"},
                _("a", {href: "https://Games.Malotky.net/"}, "Find it Here"),
                " | ",
                _("a", {href: "https://github.com/Malotkya/StaticGames"}, "Github Repo")
            ),
            _("p", `I am in the process of converting some games that I had written in vanilla javascript, notablly Yatzee and TicTacToe, in React.
                    This is both a fun and difficult project as I learn to work with something that I am unfamiliar with.`
            )
        ),

        //Planechase React Native App
        _("article", {class: "portfolio-card"},
            _("h2", "Magic the Gathering React Native App"),
            _("p", {class: "links"},
                _("a", {href: "https://Mtg.Malotky.net/"}, "Find it Here"),
                " | ",
                _("a", {href: "https://github.com/Malotkya/Planechase"}, "Github Repo")
            ),
            _("p", `Plainchase is a variant of Magic the Gathering where one can role a dice that will cause random effects on the game.
                    After working with React for the other project, I thought it might be fun to attempt to work with react native.`
            ),
            _("p", `Instead of going around and finding all the cards that are involved for planechase, instead a random one can be selected.  The text for the cards will be hardcoded for if the
                    app is unable to load the cards from an external service.`
            )
        ),
    ]
}