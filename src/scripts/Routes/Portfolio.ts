import Router from "../App/Router";
import {render} from "../App";

/** Portfolio Router
 * 
 * @author Alex Malotky
 */
export const Portfolio = new Router("/Portfolio", "Portfolio",
    "A list of projects that Alex has worked on.");

Portfolio.onRender(()=>{
    return render("portfolio.html");
})