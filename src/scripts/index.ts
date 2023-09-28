/** /index.ts
 * 
 * @author Alex Malotky
 */
import App, { Context, makeErrorMessage } from "./App";

import {Home} from "./Routes/Home";
import {Resume} from "./Routes/Resume";
import {Portfolio} from "./Routes/Portfolio";
import {AboutMe} from "./Routes/AboutMe";

const pkg:any = require("../../package.json");
const app:App = new App();

app.add("/", Home);
app.add("/Resume", Resume);
app.add("/Portfolio", Portfolio);
app.add("/About", AboutMe);

app.use(async(ctx: Context, next:Function)=>{
    ctx.body = makeErrorMessage("Page not Found!", 404);
});

app.onReady(()=>{
    console.info(`App v${pkg.version} loaded successfully!`);
})