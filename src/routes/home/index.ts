/** /Router/Home.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "zim-engine";
import homeView from "./view";

/** Home Module
 *
 */
export const Home = new Router();
export const HOME_TITLE = "Home"

Home.all(async(ctx:Context)=>{
    const header = {
        title: HOME_TITLE
    }

    const content = homeView();

    ctx.render({header, content})
});