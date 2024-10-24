/** /Router/Pokemon.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "Engine";
import pokemonView from "./view";

/** Pokemon Router
 * 
 */
export const Pokemon = new Router("/Pokemon");

Pokemon.all(async(ctx:Context)=>{
    ctx.render({
        head: {
            title: "Pokemon Games",
            meta: {
                description: "Pokemon teams accross the different pokemon games Alex has played."
            }
            
        },
        body: {
            main: pokemonView(ctx.search.get("game"))
        }
    });
});

export default Pokemon;