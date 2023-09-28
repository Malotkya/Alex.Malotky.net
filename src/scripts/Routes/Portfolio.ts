/** /Router/Portfolio.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context, render} from "../App"

/** Portfolio Router
 * 
 */
export const Portfolio = new Router("Portfolio",
    "A list of projects that Alex has worked on."
    );

    Portfolio.use(async(ctx:Context)=>{
    ctx.body = await render("portfolio.html");
});