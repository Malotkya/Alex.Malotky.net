/** /index.ts
 * 
 * @author Alex Malotky
 */
import App, { Context, HtmlError } from "./backend/App";

import {Home} from "./routes/home";
import {Resume} from "./routes/resume";
import {Portfolio} from "./routes/portfolio";
import {AboutMe} from "./routes/about";
import { MtgDecks } from "./routes/mtg";
import { Pokemon } from "./routes/pokemon";
import { Login } from "./routes/login";

const pkg:any = require("../package.json");
const app:App = new App();

app.add("/", Home);
app.add("/Resume", Resume);
app.add("/Portfolio", Portfolio);
app.add("/About", AboutMe);
app.add("/Decks", MtgDecks);

app.use("/Pokemon", Pokemon);
app.use(Login);


app.use("*", async(ctx: Context)=>{
    throw new HtmlError(404, "Page not Found!");
});

app.onReady(()=>{
    console.info(`App v${pkg.version} loaded successfully!`);
});

import MarkDownElement from "./util/MarkDownElement";
customElements.define("mark-down", MarkDownElement);