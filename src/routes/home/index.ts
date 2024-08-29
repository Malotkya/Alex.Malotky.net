/** /Router/Home.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "Engine";
import homeView from "./view";

/** Home Module
 *
 */
const Home = new Router();
const Title = "Home"
const Path = "/"

Home.all(async(ctx:Context)=>{
    ctx.render({
        head: {
            title: Title
        },
        body: homeView()
    })
});

export default {Title, Path, Router:Home}