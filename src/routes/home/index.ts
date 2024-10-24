/** /Router/Home.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "Engine";
import homeView from "./view";

/** Home Module
 *
 */
const Home = new Router("/");

Home.all(async(ctx:Context)=>{
    ctx.render({
        body: {
            main: homeView()
        }
    })
});

export default Home;