/** /Router/Magic
 * 
 * @author Alex Malotky
 */
import {Router, HttpError} from "Engine";
import { DeckItem, ProtoDeck, validateInput, convertProtoDeck } from "./types";
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
    await ctx.env.DB.prepare("DELETE FROM Decks WHERE id = ?")
        .bind(ctx.params.get("id")).run();

    ctx.redirect("/Decks/Edit");
});

Editor.get("/New", async(ctx)=>{
    const id = Date.now();

    await ctx.env.DB.prepare("INSERT INTO Decks(id) VALUES(?)")
        .bind(id).run();

    ctx.redirect(`/Decks/Edit/${id}`);
});

Editor.post("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id")!);

    const name = ctx.formData.get("name");
    if(name === undefined)
        throw new HttpError(400, "Must set name value!");

    const description = ctx.formData.get("description");
    if(description === undefined)
        throw new HttpError(400, "Must set description value!");

    const commanders = ctx.formData.get("commanders");
    if(commanders === undefined)
        throw new HttpError(400, "Must set commander value!");

    const main_deck = ctx.formData.get("main_deck");
    if(main_deck === undefined)
        throw new HttpError(400, "Must set main_deck value!");

    const color_identity = ctx.formData.get("color_identity");
    if(color_identity === undefined)
        throw new HttpError(400, "Must set color_identity value!");

    const art = ctx.formData.get("art");
    if(art === undefined)
        throw new HttpError(400, "Must set art value!");

    let deck:DeckItem;
    try {
        deck = validateInput({id, name, description, commanders, main_deck, color_identity, art});
    } catch (e:any){
        throw new HttpError(400, `Invalid deck!\n${e.message || String(e)}`)
    }

    try {
        await ctx.env.DB.prepare("UPDATE Decks Set name = ?, description = ?, commanders = ?, main_deck = ?, color_identity = ?, art = ? WHERE id = ?")
                                   .bind(name, description, commanders, main_deck, color_identity, art, id).run();
    } catch (e){
        console.error(e);
        throw new HttpError(500, "There was a problem saving the deck!");
    }

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
    const id = ctx.params.get("id")!;

    const deck:ProtoDeck|null = await ctx.env.DB.prepare("SELECT * FROM Decks where id = ?")
                                    .bind(id).first();

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
            main: DeckEdit(convertProtoDeck(deck)),
        }
    });
});

Editor.all(async(ctx)=>{
    let page = Number(ctx.search.get("page"));
    if(isNaN(page) || page < 0)
        page = 0;
    else
        --page;

    const {results, error} = await ctx.env.DB.prepare("SELECT * FROM Decks ORDER BY id DESC LIMIT ? OFFSET ?")
            .bind(PAGE_SIZE, PAGE_SIZE * page).all();

    if(error)
        throw error;

    ctx.render({
        head: {
            styles,
            title: "List of Decks",
            meta: {
                description: "List of magic decks to edit."
            }
        },
        body: {
            //@ts-ignore
            main: DeckListView(results.map(convertProtoDeck), true)
        }
    });
});

Magic.use(Editor);

Magic.get("/:id", async(ctx)=>{
    const id = ctx.params.get("id")!;

    const deck:ProtoDeck|null = await ctx.env.DB.prepare("SELECT * FROM Decks where id = ?")
                                    .bind(id).first();

    if(deck === null)
        throw new HttpError(404, `Unable to find deck with id '${id}'!`);

    ctx.render({
        head: {
            styles,
            title: `Deck (${id})`,
            meta: {
                description: "Magic the Gathering Deck Editor."
            },
            scripts: {
                "masonry": {src: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"}
            }
        },
        body: {
            main: DeckView(convertProtoDeck(deck))
        }
    });
})

Magic.all(async(ctx)=>{
    let page = Number(ctx.search.get("page"));
    if(isNaN(page) || page < 0)
        page = 0;
    else
        --page;

    const {results, error} = await ctx.env.DB.prepare("SELECT * FROM Decks ORDER BY id DESC LIMIT ? OFFSET ?")
            .bind(PAGE_SIZE, PAGE_SIZE * page).all();

    if(error)
        throw error;

    ctx.render({
        head: {
            styles,
            title: "List of Decks",
            meta: {
                description: "List of magic decks."
            }
        },
        body: {
            //@ts-ignore
            main: DeckListView(results.map(convertProtoDeck))
        }
    })
});

export default Magic;