/** /Router/Portfolio.ts
 * 
 * @author Alex Malotky
 */
import {Module, Context, render} from "../App"

/** Portfolio Router
 * 
 */
export const Portfolio = new Module("Portfolio",
    "A list of projects that Alex has worked on."
    );

Portfolio.onRender(async(ctx:Context)=>{
    ctx.body = await render("portfolio.html");
});