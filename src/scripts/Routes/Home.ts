import Router from "../App/Router";
import {render, execute} from "../App";

/** Home Router
 * 
 * @author Alex Malotky
 */
export const Home = new Router("/", "Home", "");

Home.onLoad(()=>render("home.html"));

Home.onConnected(()=>execute("home.js"));