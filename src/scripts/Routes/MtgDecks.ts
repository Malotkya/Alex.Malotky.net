/** /Router/MtgDecks.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, render, execute, HtmlError} from "../App";
import Database from "../Util/Database";
import {cache} from "../Util/Memory";
import Authentication from "../Util/Authentication";

/** Mtg Module
 * 
 */
export const MtgDecks = new Router("MTG Decks", "The Magic the Gathering Decks that Alex has.");

const Editor = new Router("Mtg Deck Editor");
Editor.use("*", async(ctx: Context)=>{
    const auth = await Authentication();

    if(!(await auth.getCurrentUser())){
        ctx.connected = await execute("login.js");
        ctx.body = await render("login.html");
    }
});

Editor.use("/Delete/:id", async(ctx:Context)=>{
    const database = await Database();
    
    const id = ctx.params.get("id");
    database.deleteDocument("MtgDecks", id);

    ctx.reRoute("/Decks/Editor");
});

Editor.use("/Update/:id", (ctx:Context)=>{
    throw new HtmlError(410, "Update is outdate!");
});

Editor.use("/New", async(ctx:Context)=>{
    const database = await Database();

    const id = await database.createDocument("MtgDecks", {publish: await database.now()});

    ctx.reRoute(`/Decks/Editor/${id}`);
});

Editor.use("/:id", async(ctx:Context)=>{
    const database = await Database();

    const id = ctx.params.get("id");
    const results = await database.getDocument("MtgDecks", id);

    if(typeof results === "undefined")
        throw new Error("Unable to find id: " + id);

    ctx.connected = await execute("mtg/edit.js");
    ctx.body = await render("mtg/edit.html", results);
});

Editor.use(async(ctx: Context)=>{
    const database = await Database();

    const results = await database.queryCollection("MtgDecks");

    ctx.connected = await execute("mtg/delete.js");
    ctx.body = await render("mtg.html", {
        list: results,
        edit: true
    });
});

MtgDecks.use("/Editor", Editor);

MtgDecks.use("/:id", async(ctx:Context)=>{
    const database = await Database();

    const id = ctx.params.get("id");
    const results = await cache(`MtgDeck(${id})`, ()=>database.getDocument("MtgDecks", id));
    
    if(typeof results === "undefined"){
        throw new Error("Unable to find id: " + id);
    }

    ctx.connected = await execute("mtg/deck.js");
    ctx.body = await render("mtg/deck.html", results);
})

MtgDecks.use(async(ctx:Context)=>{
    const database = await Database();

    const results = await cache("MtgDecks", ()=>database.queryCollection("MtgDecks"));

    ctx.body = await render("mtg.html", { list: results });
});