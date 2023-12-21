/** /Router/Pokemon.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, render, execute} from "../../backend/App";

interface module {
    main?: Function,
    content: string|HTMLElement
}

async function importModule(filename:string): Promise<module>{
    let module: any;
    try{
        module = (await import(/*webpackIgnore: true*/ filename));
    } catch(err){
        console.error(err);
        throw new Error(`There was a problem importing module at ${filename}!`);
    }

    const defaultType = typeof module.default;
    switch(typeof module.content){
        case "undefined":
            if( defaultType === "string" || defaultType === "object")
                module.content = module.default;
            else
                throw new TypeError(`No Content imported from Module ${filename}!`);
            break;

        case "function":
            module.content = module.content();
            break;
    }

    switch (typeof module.main){
        case "undefined":
            if(typeof module.default === "function"){
                module.main = module.default;
            }
        break;

        default:
            throw new TypeError(`Unknown type ${typeof module.main} for exported Function!`);
    }

    return module;
}

/** Pokemon Router
 * 
 */
export const Pokemon = new Router("Pokemon Games", 
"Pokemon teams accross the different pokemon games Alex has played.");

Pokemon.use(async(ctx:Context)=>{
    const module = await importModule("./pokemon.js");

    ctx.body = module.content;
});