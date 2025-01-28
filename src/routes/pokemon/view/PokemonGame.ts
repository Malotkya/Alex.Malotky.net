/** /routes/pokemon/PokemonGame
 * 
 * @author Alex Malotky
 */
import { Buffer } from "node:buffer";
import { createElement as _, Content } from "zim-engine";
import Game from "../data/game";
import PokemonItem from "./PokemonItem";
import GameInputForm from "../element/GameInput";

/** Pokemon Game View
 * 
 * @param {Game} data 
 * @returns {Content}
 */
export default function PokemonGame(id:string, data:Game, current:boolean):Content {
    const {name, generation, region, team, others} = data;

    return [
        _("input", {type: "hidden", id: id, name: "game" }),
        _("section", {class: "pokemon-game-view"},
            _("h3", {class: "game-name"}, `Pokemon ${name}`),
            _("p", {class: "game-info"},
                `Generation: ${generation}`,
                _("br"),
                `Region: ${region}`
            ),
            _("label", {for: "main-pokemon", class: "detail-summary"}, "Main Pokemon"),
            others.length > 0? _("label", {for: "other-pokemon", class: "detail-summary"}, "Other Pokemon"):null,
            _("input", {type: "radio", id: "main-pokemon", class: "detail-toggle", name: id, checked: true}),
            _("ul", {class: "pokemon-view"},
                team.map(p=>PokemonItem(p, current))
            ),
            others.length > 0 ? [
                _("input", {type: "radio", id: "other-pokemon", class: "detail-toggle", name: id}),
                _("ul", {class: "pokemon-view"},
                    others.map(p=>PokemonItem(p, current))
                )
            ]: null
        )
    ]
}

export function EditPokemonGame(data:Game|null):Content {
    const buffer = Buffer.from(
        JSON.stringify(data)
    ).toString("base64");

    return [
        _("h1", "Pokemon Game Test"),
        _("form", {is: "game-input", data: buffer})
    ]
}

export function EditPokemonPreview():Content {
    return [
        _("h1", "Pokemon Game Test"),
        _("aside", "This form might not load in safari!"),
        _("section",
            _("h2", "Load From File"),
            _("input", {type: "file", onchange: loadFile})
        ),
        _("form", {is: "game-input", onsubmit:saveFile} )
    ]
}

/** Save File Frontend Function
 * 
 * @param {Event} event 
 */
function saveFile(event:Event) {
    event.preventDefault();
    event.stopPropagation();

    const form = <GameInputForm>event.target;

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
                        id: undefined,
                        name:   (<HTMLInputElement>form.querySelector("#txtName")).value,
                        region: (<HTMLInputElement>form.querySelector("#txtRegion")).value, 
                        generation: Number((<HTMLInputElement>form.querySelector("#txtName")).value),
                        team: JSON.parse(
                            (<HTMLInputElement>form.querySelector("#inpTeam")).value
                        ),
                        others: JSON.parse(
                            (<HTMLInputElement>form.querySelector("#impOther")).value
                        )
                    });
                } catch (e){
                    rej(e);
                }
            }
        })
    }

    getData().then(data=>{
        const link = document.createElement("a");

        link.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`);
        link.setAttribute("download", `${data.name}.txt`);

        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }).catch(console.error);
}

/** Load File
 * 
 * @param {Event} event 
 */
function loadFile(event:Event) {
    (async()=>{
        const files = (<HTMLInputElement>event.target).files
        if(files){
            const form = document.querySelector("form");
            if(form === null) {
                //@ts-ignore
                env.error("Unable to find form!");
                return;
            }

            const data = await files[0].text();

            form.setAttribute("data", btoa(data))
        }
    })();
}