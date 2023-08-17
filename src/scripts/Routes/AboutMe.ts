import Router from "../App/Router";
import {render} from "../App";

/** About Me Router
 * 
 */
export const AboutMe = new Router("/About", "About Me",
    "A little bit about me so that you can get to know me better.");

AboutMe.onRender(()=>{
    return render("about.html");
});

/*AboutMe.onConnected(()=>{
    return execute("about.js");
})*/