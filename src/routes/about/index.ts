/** /Routes/AboutMe.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context} from "zim-engine";

/** About Me Router
 * 
 */
const AboutMe = new Router();
const Title = "About Me";
const Path = "/About";

AboutMe.all(async(ctx:Context)=>{
    const header = {
        title: Title,
        description: "More about Alex."
    }

    const content = require("./index.html");
    
    ctx.render({header, content});
});

export default {Path, Title, Router:AboutMe}