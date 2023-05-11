import Router from "../App/Router";
import {render} from "../App";

/** Portfolio Router
 * 
 * @author Alex Malotky
 */
export const Portfolio = new Router("/Portfolio", "Portfolio",
    "A list of projects that Alex has worked on.");

Portfolio.onLoad(()=>{
    return render("bad.html");
})