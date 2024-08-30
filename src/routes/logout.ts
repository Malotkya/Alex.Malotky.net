import { Router } from "Engine";

const Logout = new Router("/Logout");

Logout.all(async(ctx)=>{
    await ctx.setAuth(null);
    ctx.redirect("/");
});