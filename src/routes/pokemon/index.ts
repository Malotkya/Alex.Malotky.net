/** /Router/Pokemon.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "zim-engine";
import pokemonView from "./view";

/** Pokemon Router
 * 
 */
export const Pokemon = new Router();
const Path = "/Pokemon";

Pokemon.all(async(ctx:Context)=>{
    const header = {
        title: "Pokemon Games",
        description: "Pokemon teams accross the different pokemon games Alex has played."
    }

    const content = pokemonView(ctx.search["game"]);

    ctx.render({header, content});
});

export default {Path, Router:Pokemon};