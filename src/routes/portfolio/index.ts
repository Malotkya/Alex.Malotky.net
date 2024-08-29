/** /Router/Portfolio.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context} from "Engine";


/** Portfolio Router
 * 
 */
const Portfolio = new Router();
const Title = "Portfolio";
const Path = "/Portfolio"

Portfolio.all(async(ctx:Context)=>{
    ctx.render({
        head:{
            title: Title,
            meta: {
                description: "A list of projects that Alex has worked on."
            }
        },
        body: require("./index.html")
    });
});

export default {Path, Title, Router:Portfolio}