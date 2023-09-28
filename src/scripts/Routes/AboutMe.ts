/** /Routes/AboutMe.ts
 * 
 * @author Alex Malotky
 */
import {Module, Context, render} from "../App"

/** About Me Router
 * 
 */
export const AboutMe = new Module("About Me",
    "A list of projects that Alex has worked on."
    );

AboutMe.onRender(async(ctx:Context)=>{
    ctx.body = await render("about.html");
});