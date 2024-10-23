/** /Routes/AboutMe.ts
 * 
 * @author Alex Malotky
 */
import {Router, Context} from "Engine";

/** About Me Router
 * 
 */
const AboutMe = new Router("/About");

AboutMe.all(async(ctx:Context)=>{
    ctx.render({
        head:{
            title: "About Me",
            meta: {description: "More about Alex."}
        }, 
        body: require("./index.html")
    });
});

export default AboutMe;