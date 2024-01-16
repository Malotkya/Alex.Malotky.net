/** /Router/Pokemon.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, importModule} from "../../backend/App";

/** Pokemon Router
 * 
 */
export const Pokemon = new Router("Pokemon Games", 
"Pokemon teams accross the different pokemon games Alex has played.");

Pokemon.use(async(ctx:Context)=>{
    ctx.module = await importModule("pokemon", ctx.params.get("game"));
});