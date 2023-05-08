import Router from "./App/Router";
import {render, execute} from "./App";

/** Home Router
 * 
 * @author Alex Malotky
 */
export const Home = new Router("/", "", "");

Home.onLoad(()=>{
    return render("home.html");
});

Home.onConnected(()=>{
    return execute("home.js");
});