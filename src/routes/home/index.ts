/** /Router/Home.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "zim-engine";
import homeView from "./view";

/** Home Module
 *
 */
const Home = new Router();
const Title = "Home"
const Path = "/"

Home.all(async(ctx:Context)=>{
    const header = {
        title: Title
    }

    const content = homeView();

    ctx.render({header, content})
});

export default {Title, Path, Router:Home}