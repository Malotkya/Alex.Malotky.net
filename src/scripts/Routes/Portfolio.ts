import {Router, Context, render} from "../App"

/** Portfolio Router
 * 
 * @author Alex Malotky
 */
export const Portfolio = new Router("Portfolio",
    "A list of projects that Alex has worked on."
    );

    Portfolio.use(async(ctx:Context, next:Function)=>{
    ctx.body = await render("portfolio.html");
});