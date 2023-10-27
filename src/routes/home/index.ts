/** /Router/Home.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, render, execute} from "../../backend/App";

/** Home Module
 *
 */
export const Home = new Router("Home");


Home.use(async(ctx:Context)=>{
    ctx.body = await render("home.html");
    ctx.connected = await execute("home.js");
});