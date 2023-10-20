/** /Router/MtgDecks.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, render, execute} from "../App";
import Database from "../Util/Database";
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

Editor.use("/Delete/:id", (ctx:Context)=>{
    //Perfore Delete.
    ctx.body = "<h1>Delete coming soon!</h1>";
});

Editor.use("/Update/:id", (ctx:Context)=>{
    //Doesn't run because the param string is too long,
    //and can't use POST.
    ctx.body = "<h1>You shouldn't be here!</h1>";
});

Editor.use("/New", (ctx:Context)=>{
    //Perfore Create
    ctx.body = "<h1>Create coming soon!</h1>";
});

Editor.use("/:id", async(ctx:Context)=>{
    const database = await Database();

    const id = ctx.params.get("id");
    const results = await database.getDocument("MtgDecks", id);

    if(typeof results === "undefined")
        throw new Error("Unable to find id: " + id);

    ctx.connected = await execute("edit.js");
    ctx.body = await render("mtg/edit.html", results);
});

Editor.use(async(ctx: Context)=>{
    const database = await Database();

    const results = await database.queryCollection("MtgDecks");

    ctx.body = await render("mtg.html", {
        list: results,
        edit: true
    });
});

MtgDecks.use("/Editor", Editor);

MtgDecks.use("/:id", async(ctx:Context)=>{
    const database = await Database();

    const id = ctx.params.get("id");
    const results = await database.getDocument("MtgDecks", id);
    
    if(typeof results === "undefined"){
        throw new Error("Unable to find id: " + id);
    }

    //ctx.connected = await execute("mtg.js");
    ctx.body = await render("mtg/deck.html");
})

MtgDecks.use(async(ctx:Context)=>{
    const database = await Database();

    const results = await database.queryCollection("MtgDecks");

    ctx.body = await render("mtg.html", { list: results });
});