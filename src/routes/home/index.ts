/** /Router/Home.ts
 * 
 * @author Alex Malotky
 */
import {Context, Router} from "Engine";
import homeView from "./view";
import style from "./style.scss";

/** Home Module
 *
 */
const Home = new Router("/");

Home.all(async(ctx:Context)=>{
    ctx.render({
        head: {
            styles: style
        },
        body: {
            main: homeView()
        }
    })
});

export default Home;