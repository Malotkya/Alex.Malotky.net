/** /routes/magic
 * 
 * @author Alex Malotky
 */
import { Router, HttpError } from "zim-engine";
import MagicEditor from "./edit";
import { DeckItemObject } from "./data/deck";
import { DeckView, DeckListView, EditPreview } from "./view";
import styles from "./style.scss";

const PAGE_SIZE = 30;

const Magic = new Router("/Decks");
Magic.use(MagicEditor);

Magic.get("/New", async(ctx)=>{
    ctx.render({
        head: {
            styles,
            title: `Edit Deck (New)`,
            meta: {
                description: "Magic the Gathering Deck Editor."
            }
        },
        body: {
            main: EditPreview(),
        }
    });
});

Magic.get("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id")!);

    const deck = await ctx.query(DeckItemObject).get({id});

    if(deck === null)
        throw new HttpError(404, `Unable to find deck with id '${id}'!`);

    ctx.render({
        head: {
            styles,
            title: `Magic Deck (${id})`,
            scripts: {
                masonry: {src: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"}
            },
            meta: {
                description: "Magic the Gathering deck."
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