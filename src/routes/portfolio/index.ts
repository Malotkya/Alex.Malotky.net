/** /Router/Portfolio.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context} from "zim-engine";


/** Portfolio Router
 * 
 */
const Portfolio = new Router();
const Title = "Portfolio";
const Path = "/Portfolio"

Portfolio.all(async(ctx:Context)=>{
    const header = {
        title: Title,
        description: "A list of projects that Alex has worked on."
    };

    const content = require("./index.html");

    ctx.render({header, content});
});

export default {Path, Title, Router:Portfolio}