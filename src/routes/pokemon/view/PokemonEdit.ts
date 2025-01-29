/** /routes/pokemon/PokemonGame
 * 
 * @author Alex Malotky
 */
import { Buffer } from "node:buffer";
import { createElement as _, RenderUpdate } from "zim-engine";
import Game from "../data/game";
import GameInputForm from "../element/GameInput";
import styles from "./style.scss";

export default function EditPokemonList(data:Game[]):RenderUpdate {
    return {
        head: {
            styles,
            title: `Edit Pokemon List`,
            meta: {
                description: "List of Pokemon Games to Edit."
            }
        },
        body: {
            main: [
                _("h1", "Pokemon Games"),
                _("a", {class: "btn", href: "/Pokemon/Edit/New"}, "New"),
                _("ul", {class: "pokmeon-game-list"},
                    data.map(game=>_("li", {class: "pokmeon-game-item"},
                        _("a", {href: `/Pokemon/Edit/${game.id}`}, game.name),
                        _("form", {method: "delete", onsubmit: (event)=>{
                            if(window.confirm("Are you sure?")!){
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }}, _("button", "Delete"))
                    ))
                )
            ]
        }
    }
}

/** Edit Pokemon Game
 * 
 * @param {Game} data 
 * @returns {RenderUpdate}
 */
export function EditPokemonGame(data:Game|null, id?:number):RenderUpdate {
    const buffer = Buffer.from(
        unescape(encodeURIComponent(JSON.stringify(data)))
    ).toString("base64");

    return {
        head: {
            styles,
            title: `Edit Pokemon Game (${id || "New"})`,
            meta: {
                description: "Pokemon Game Editor."
            }
        },
        body: {
            main: [
                _("h1", "Pokemon Game Test"),
                _("form", {is: "game-input", method: "POST", data: buffer})
            ]
        }
    }
}

/** Edit Pokemon Game Preivew
 * 
 * @returns {RenderUpdate}
 */
export function EditPokemonPreview():RenderUpdate {
    return {
        head: {
            styles,
            title: "Edit Pokemon Game (Preview)",
            meta: {
                description: "Try editing your own pokemon save information!"
            }
        },
        body: {
            main: [
                _("h1", "Pokemon Game Test"),
                _("aside", "This form might not load in safari!"),
                _("section",
                    _("h2", "Load From File"),
                    _("input", {type: "file", onchange: loadFile})
                ),
                _("form", {is: "game-input", onsubmit:saveFile} )
            ]
        }
    };
}

/** Save File Frontend Function
 * 
 * @param {Event} event 
 */
function saveFile(event:Event) {
    event.preventDefault();
    event.stopPropagation();

    const form = <GameInputForm>event.target;

    const getValue = (query:string):string => {
        const input = <HTMLInputElement|null>form.querySelector(query);
        if(input === null) {
            console.debug(form);
            throw new Error(`${query} is null!`);
        }
            

        return input.value;
    }

    const getData = ():Promise<Game> => {
        return new Promise((res, rej)=>{
            if(!form.ready) {
                window.setTimeout(()=>{
                    getData().then(res)
                        .catch(rej);
                }, 10);
            } else {
                try {
                    res({
                        id:         undefined,
                        name:       getValue("#txtName"),
                        region:     getValue("#txtRegion"), 
                        generation: Number(getValue("#numGeneration")),
                        team:       JSON.parse(getValue("#inpTeam")),
                        others:     JSON.parse(getValue("#inpOther"))
                    });
                } catch (e){
                    rej(e);
                }
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

/** Load File FrontEnd Function
 * 
 * @param {Event} event 
 */
function loadFile(event:Event) {
    (async()=>{
        const files = (<HTMLInputElement>event.target).files
        if(files){
            const form = document.querySelector("form[is='game-input']");
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