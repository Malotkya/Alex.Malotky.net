/** /Router/Magic
 * 
 * @author Alex Malotky
 */
import {Router, HttpError} from "zim-engine";
import { DeckItemObject } from "./data/deck";
import { DeckEdit, DeckView, DeckListView } from "./view";
import styles from "./style.scss";

const PAGE_SIZE = 30;

const Magic = new Router("/Decks");
const Editor = new Router("/Edit");

Editor.all("*", async(ctx)=>{
    const user = await ctx.getAuth();

    if(user === null){
        ctx.redirect("/Login");
    }
});

Editor.delete("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id")!);
    await ctx.query(DeckItemObject).delete({id});
    ctx.redirect("/Decks/Edit");
});

Editor.post("/New", async(ctx)=>{
    const id = Date.now();
    
    const deck = await ctx.formData(DeckItemObject);
    deck.id = id;

    await ctx.query(DeckItemObject).insert(deck);

    ctx.redirect(`/Decks/Edit/${id}`);
});

Editor.get("/New", async(ctx)=>{
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

Editor.post("/:id", async(ctx)=>{
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
            main: DeckEdit(deck)
        }
    });
});

Editor.get("/:id", async(ctx)=>{
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

Editor.all(async(ctx)=>{
    let page = Number(ctx.search.get("page"));
    if(isNaN(page) || page < 0)
        page = 0;
    else
        --page;

    //SELECT * FROM Decks ORDER BY id DESC LIMIT ? OFFSET ?
    const results = await ctx.query(DeckItemObject).getAll(undefined,
        {
            orderBy: {id: "DESC"},
            limit: PAGE_SIZE,
            offset: PAGE_SIZE * page
        }
    );

    ctx.render({
        head: {
            styles,
            title: "List of Decks",
            meta: {
                description: "List of magic decks to edit."
            }
        },
        body: {
            main: DeckListView(results, true)
        }
    });
});

Magic.use(Editor);

Magic.get("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id")!);

    const deck = await ctx.query(DeckItemObject).get({id});

    if(deck === null)
        throw new HttpError(404, `Unable to find deck with id '${id}'!`);

    ctx.render({
        head: {
            styles,
            title: `Magic Deck (${id})`,
            meta: {
                description: "Magic the Gathering Deck Editor."
            }
        },
        body: {
            main: DeckView(deck)
        }
    });
})

Magic.all(async(ctx)=>{
    let page = Number(ctx.search.get("page"));
    if(isNaN(page) || page < 0)
        page = 0;
    else
        --page;

    //SELECT * FROM Decks ORDER BY id DESC LIMIT ? OFFSET ?
    const results = await ctx.query(DeckItemObject).getAll(undefined,
        {
            orderBy: {id: "DESC"},
            limit: PAGE_SIZE,
            offset: PAGE_SIZE * page
        }
    );

    ctx.render({
        head: {
            styles,
            title: "Magic Decks",
            meta: {
                description: "List of magic decks."
            }
        },
        body: {
            main: DeckListView(results)
        }
    });
});

export default Magic;