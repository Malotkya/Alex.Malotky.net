/** /routes/pokemon
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "zim-engine";
import Game, { GameObject } from "./data/game";
import PokemonView from "./view";
import { EditPokemonPreview } from "./view/PokemonGame";
import { recordHas, simplify } from "@/util";
import styles from "./style.scss";
import test from "./test.json";

function buildData(list:Game[]):[Record<string, Game>, string] {
    if(list.length === 0)
        throw new Error("No Results!");

    const output:Record<string, Game> = {};

    /** Get Navigation Id
     * 
     * @param {Game} value 
     * @returns {string}
     */
    const getId = (value:Game):string => {
        const base = simplify(value.name);
        let id = base;
        let count = 0;
        while(recordHas(output, id))
            id = `${base}${++count}`;

        return id;
    }

    let init:string = getId(list[0]);
    let max:number  = list[0].id || 0;
    
    output[init] = list[0];

    for(let i=1; i<list.length; i++) {
        const id = getId(list[i]);

        if( max < (list[i].id || 0) ) {
            init = id;
            max = list[i].id!;
        }

        output[id] = list[i];
    }

    return [output, init];
}

/** Pokemon Router
 * 
 */
export const Pokemon = new Router("/Pokemon");

Pokemon.all("/New", async(ctx:Context)=>{
    ctx.render({
        head: {
            styles,
            title: "Edit Pokemon Game (Preview)",
            meta: {
                description: "Try editing your own pokemon save information!"
            }
        },
        body: {
            main: EditPokemonPreview()
        }
    });
})

Pokemon.all(async(ctx:Context)=>{
    const [data, init] = buildData([ GameObject.run(test) ])

    ctx.render({
        head: {
            styles,
            title: "Pokemon Games",
            meta: {
                description: "Pokemon teams accross the different pokemon games Alex has played."
            }
        },
        body: {
            main: PokemonView(data, ctx.search.get("game") || init)
        }
    });
});

export default Pokemon;