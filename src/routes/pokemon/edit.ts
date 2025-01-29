import {HttpError, Router} from "zim-engine";
import { RequireLoginHandler } from "../login";
import { GameObject } from "./data/game";
import EditPokemonList, { EditPokemonGame } from "./view/PokemonEdit";

const PokemonEdit = new Router("/Edit");

PokemonEdit.all("*", RequireLoginHandler);

PokemonEdit.delete("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id"));
    await ctx.query(GameObject).delete({id});
    ctx.redirect("/Pokemon/Edit");
});

PokemonEdit.post("/New", async(ctx)=>{
    const id = Date.now();
    const game = await ctx.formData(GameObject);
    game.id = id;

    await ctx.query(GameObject).insert(game);

    ctx.redirect(`/Pokemon/Edit/${id}`);
});

PokemonEdit.get("/New", async(ctx)=>{
    ctx.render(EditPokemonGame(null));
});

PokemonEdit.post("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id"));
    const game = await ctx.formData(GameObject);

    await ctx.query(GameObject).update(game, {id});

    ctx.render(EditPokemonGame(game, id));
});

PokemonEdit.get("/:id", async(ctx)=>{
    const id = Number(ctx.params.get("id"));
    const game = await ctx.query(GameObject).get({id});

    if(game === null)
        throw new HttpError(404, `Unable to find deck with id '${id}'!`);

    ctx.render(EditPokemonGame(game, id));
});


PokemonEdit.all(async(ctx)=>{
    const results = await ctx.query(GameObject).getAll();
    ctx.render(EditPokemonList(results));
});


export default PokemonEdit;