import { Router, HttpError } from "zim-engine";
import { RequireLoginHandler } from "../login";
import { DeckItemObject } from "./data/deck";
import { DeckEdit, DeckListView } from "./view";
import styles from "./style.scss";

const MagicEditor = new Router("/Edit");

MagicEditor.all("*", RequireLoginHandler);

MagicEditor.delete("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id")!);
    await ctx.query(DeckItemObject).delete({id});
    ctx.redirect("/Decks/Edit");
});

MagicEditor.post("/New", async(ctx)=>{
    const id = Date.now();
    
    const deck = await ctx.formData(DeckItemObject);
    deck.id = id;

    await ctx.query(DeckItemObject).insert(deck);

    ctx.redirect(`/Decks/Edit/${id}`);
});

MagicEditor.get("/New", async(ctx)=>{
    ctx.render({
        head: {
            styles,
            title: `Edit Deck (New)`,
            meta: {
                description: "Magic the Gathering Deck Editor."
            }
        },
        body: {
            main: DeckEdit(),
        }
    });
});

MagicEditor.post("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id")!);
    const deck = await ctx.formData(DeckItemObject);
    
    await ctx.query(DeckItemObject).update(deck, {id});

    ctx.render({
        head: {
            styles,
            title: `Edit Deck (${id})`,
            meta: {
                description: "Magic the Gathering Deck Editor."
            }
        },
        body: {
            main: DeckEdit({...deck, id})
        }
    });
});

MagicEditor.get("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id")!);

    const deck = await ctx.query(DeckItemObject).get({id});

    if(deck === null)
        throw new HttpError(404, `Unable to find deck with id '${id}'!`);

    ctx.render({
        head: {
            styles,
            title: `Edit Deck (${id})`,
            meta: {
                description: "Magic the Gathering Deck Editor."
            }
        },
        body: {
            main: DeckEdit(deck),
        }
    });
});

MagicEditor.all(async(ctx)=>{
    let page = Number(ctx.search.get("page"));
    if(isNaN(page) || page < 0)
        page = 0;
    else
        --page;

    //SELECT * FROM Decks ORDER BY id DESC LIMIT ? OFFSET ?
    const results = await ctx.query(DeckItemObject).getAll(); /*undefined,
        {
            orderBy: {id: "DESC"},
            limit: PAGE_SIZE,
            offset: PAGE_SIZE * page
        }
    ); */

    ctx.render({
        head: {
            styles,
            title: "List of Decks",
            meta: {
                description: "List of Magic the Gathering decks."
            }
        },
        body: {
            main: DeckListView(results, true)
        }
    });
});

export default MagicEditor;