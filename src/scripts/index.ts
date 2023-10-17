/** /index.ts
 * 
 * @author Alex Malotky
 */
import App, { Context, HtmlError } from "./App";

import {Home} from "./Routes/Home";
import {Resume} from "./Routes/Resume";
import {Portfolio} from "./Routes/Portfolio";
import {AboutMe} from "./Routes/AboutMe";
import { MtgDecks } from "./Routes/MtgDecks";
import { Login } from "./Routes/Login";

const pkg:any = require("../../package.json");
const app:App = new App();

app.add("/", Home);
app.add("/Resume", Resume);
app.add("/Portfolio", Portfolio);
app.add("/About", AboutMe);
app.add("/Decks", MtgDecks);

app.use(Login);

app.use(async(ctx: Context)=>{
    throw new HtmlError(404, "Page not Found!");
});

app.onReady(()=>{
    console.info(`App v${pkg.version} loaded successfully!`);
})