/** /routes/pokemon
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "zim-engine";
import pokemonView from "./view";
import styles from "./style.scss";

/** Pokemon Router
 * 
 */
export const Pokemon = new Router("/Pokemon");

Pokemon.all(async(ctx:Context)=>{
    ctx.render({
        
        head: {
            styles,
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