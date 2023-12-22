/** /Routes/AboutMe.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context, render} from "../../backend/App";

/** About Me Router
 * 
 */
export const AboutMe = new Router("About Me", "More about Alex.");

AboutMe.use(async(ctx:Context)=>{
    ctx.body = require("./index.html");
});