/** /Router/Portfolio.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context} from "Engine";
import PortfolioView from "./view";

/** Portfolio Router
 * 
 */
const Portfolio = new Router("/Portfolio");

Portfolio.all(async(ctx:Context)=>{
    ctx.render({
        head:{
            title: "Portfolio",
            meta: {
                description: "A list of projects that Alex has worked on."
            }
        },
        body: PortfolioView()
    });
});

export default Portfolio;