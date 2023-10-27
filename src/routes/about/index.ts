/** /Routes/AboutMe.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context, render} from "../../backend/App";

/** About Me Router
 * 
 */
export const AboutMe = new Router("About Me",
    "A list of projects that Alex has worked on."
    );

AboutMe.use(async(ctx:Context)=>{
    ctx.body = await render("about.html");
});