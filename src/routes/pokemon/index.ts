/** /Router/Pokemon.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "Engine";
import pokemonView from "./view";

/** Pokemon Router
 * 
 */
export const Pokemon = new Router();
const Path = "/Pokemon";

Pokemon.all(async(ctx:Context)=>{


    ctx.render({
        head: {
            title: "Pokemon Games",
            meta: {
                description: "Pokemon teams accross the different pokemon games Alex has played."
            }
            
        },
        body: pokemonView(ctx.search.get("game"))
    });
});

export default {Path, Router:Pokemon};