import {Router, Context, render} from "../App"

/** About Me Router
 * 
 * @author Alex Malotky
 */
export const AboutMe = new Router("About Me",
    "A list of projects that Alex has worked on."
    );

AboutMe.use(async(ctx:Context, next:Function)=>{
    ctx.body = await render("about.html");
});