/** /routes/pokemon
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "zim-engine";
import Game, { GameObject } from "./data/game";
import PokemonView, { buildBaseData } from "./view";
import { EditPokemonPreview } from "./view/PokemonEdit";
import { recordHas } from "@/util";
import Editor from "./edit";

/*et data:Record<string, Game>|undefined, init:string|undefined;
async function getData(ctx:Context):Promise<[Record<string, Game>, string]>{
    if(data === undefined || init === undefined){
        const [a, b] = buildBaseData(await ctx.query(GameObject).getAll());
        data = a;
        init = b;
    }

    return [data, init];
}*/

/** Pokemon Router
 * 
 */
export const Pokemon = new Router("/Pokemon");
Pokemon.use(Editor);

/** Public Preview of Pokemon Editor
 * 
 */
Pokemon.all("/New", async(ctx:Context)=>{
    ctx.render(EditPokemonPreview());
});

/** Clear Cached Data
 * 
 */
/*Pokemon.all("/Clear", async(ctx:Context)=>{
    if(await ctx.getAuth()) {
        data = undefined;
        init = undefined;
        ctx.redirect("/Pokemon");
    }
});*/

/** View All Games
 * 
 */
Pokemon.all(async(ctx:Context)=>{
    const [data, defaultInit] = buildBaseData(await ctx.query(GameObject).getAll()); //await getData(ctx);
    const selectedInit = ctx.search.get("game") || "";

    const init = recordHas(data, selectedInit)
        ? selectedInit
        : defaultInit;

    ctx.render(PokemonView(data, init));
});

export default Pokemon;