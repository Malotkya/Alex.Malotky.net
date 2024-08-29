/** /Routes/AboutMe.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context} from "Engine";

/** About Me Router
 * 
 */
const AboutMe = new Router();
const Title = "About Me";
const Path = "/About";

AboutMe.all(async(ctx:Context)=>{
    ctx.render({
        head:{
            title: Title,
            meta: {description: "More about Alex."}
        }, 
        body: require("./index.html")
    });
});

export default {Path, Title, Router:AboutMe}