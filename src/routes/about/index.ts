/** /routes/about
 * 
 * @author Alex Malotky
 */
import {Router, Context} from "zim-engine";
import AboutView from "./view";

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
        body: {
            main: AboutView()
        }
    });
});

export default AboutMe;