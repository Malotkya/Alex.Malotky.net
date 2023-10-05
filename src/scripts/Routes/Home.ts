/** /Router/Home.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, render, execute} from "../App"

/** Home Module
 *
 */
export const Home = new Router("Home");


Home.use(async(ctx:Context)=>{
    ctx.body = await render("home.html");
});