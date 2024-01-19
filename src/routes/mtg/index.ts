/** /Router/MtgDecks.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, importModule} from "../../backend/App";
import Database from "../../util/Database";
import {cache} from "../../util/Memory";
import Authentication from "../../util/Authentication";

/** Mtg Module
 * 
 */
export const MtgDecks = new Router("MTG Decks", "The Magic the Gathering Decks that Alex has.");

const Editor = new Router("Mtg Deck Editor");
Editor.use("*", async(ctx: Context)=>{
    const auth = await Authentication();

    if(!(await auth.getCurrentUser())){
        ctx.reRoute("/Login");
    }
});

Editor.use("/Delete/:id", async(ctx:Context)=>{
    const database = await Database();
    
    const id = ctx.get("id");
    database.deleteDocument("MtgDecks", id);

    ctx.reRoute("/Decks/Editor");
});

Editor.use("/Update/:id", async(ctx:Context)=>{
    const database = await Database();

    try {
        const deck = ctx.params.get("deck");
        const id = ctx.get("id");

        if(deck === undefined)
            throw new Error("Update information not in body!");

        await database.updateDocument("MtgDecks", id, JSON.parse(deck));
        ctx.reRoute(`/Decks/Editor/${id}`, {deck: deck});
    } catch (e){
        throw new Error("There was a problem updating the deck!");
    }
});

Editor.use("/New", async(ctx:Context)=>{
    const database = await Database();

    const id = await database.createDocument("MtgDecks", {publish: await database.now()});

    ctx.reRoute(`/Decks/Editor/${id}`);
});

Editor.use("/:id", async(ctx:Context)=>{
    const database = await Database();

    const id = ctx.get("id");
    let results:any = ctx.params.get("deck");

    if(results){
        results = JSON.parse(results);
        results.id = id;
    } else {
        results = await database.getDocument("MtgDecks", id);
    }

    if(typeof results === "undefined")
        throw new Error("Unable to find id: " + id);

    ctx.body = await importModule("mtg", {
        arr: results,
        edit: true
    })
});

Editor.use(async(ctx: Context)=>{
    const database = await Database();

    const results = await database.queryCollection("MtgDecks");

    ctx.body = await importModule("mtg", {
        arr: results,
        edit: true
    });
});

MtgDecks.use("/Editor", Editor);

MtgDecks.use("/:id", async(ctx:Context)=>{
    const id = ctx.get("id");

    const results = await cache(`MtgDeck(${id})`, async()=>{
        const database = await Database();
        return await database.getDocument("MtgDecks", id)
    });
    
    if(typeof results === "undefined"){
        throw new Error("Unable to find id: " + id);
    }

    ctx.body = await importModule("mtg", {arr: results});
})

MtgDecks.use(async(ctx:Context)=>{
    
    const results = await cache("MtgDecks", async()=>{
        const database = await Database();
        return await database.queryCollection("MtgDecks")
    });

    ctx.body = await importModule("mtg", {arr: results});
});