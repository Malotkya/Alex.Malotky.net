/** /Router/Portfolio.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context} from "zim-engine";
import PortfolioView from "./view";
import styles from "./style.scss";

/** Portfolio Router
 * 
 */
const Portfolio = new Router("/Portfolio");

Portfolio.all(async(ctx:Context)=>{
    ctx.render({
        head:{
            styles,
            title: "Portfolio",
            meta: {
                description: "A list of projects that Alex has worked on."
            }
        },
        body: {
            main: PortfolioView()
        }
    });
});

export default Portfolio;