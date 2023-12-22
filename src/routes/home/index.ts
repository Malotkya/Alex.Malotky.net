/** /Router/Home.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router, importModule} from "../../backend/App";

/** Home Module
 *
 */
export const Home = new Router("Home");


Home.use(async(ctx:Context)=>{
    ctx.module = await importModule("./home.js");
});