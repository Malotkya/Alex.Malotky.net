/** /Router/Portfolio.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context, createContent} from "Engine";

const style = createContent("style", require("./style.scss"));
const content = require("./index.html");

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
        body: [style, content]
    });
});

export default Portfolio;