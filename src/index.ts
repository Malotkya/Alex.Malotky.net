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
import { Blog } from "./routes/blog";

const pkg:any = require("../package.json");
const app:App = new App();

app.add("/", Home);
app.add("/Resume", Resume);
app.add("/Portfolio", Portfolio);
app.add("/About", AboutMe);
app.add("/Blog", Blog);

app.use("/Decks", MtgDecks);
app.use("/Pokemon", Pokemon);
app.use(Login);


app.use("*", async(ctx: Context)=>{
    throw new HtmlError(404, "Page not Found!");
});

app.onReady(()=>{
    console.info(`App v${pkg.version} loaded successfully!`);
});

//Global Custom Element Registry
import MarkDownElement from "./util/CustomElements/MarkDownElement";
import ToolTip from "./util/CustomElements/ToolTipElement";
import AutoComplete from "./util/CustomElements/AutoComlete";
customElements.define("mark-down", MarkDownElement);
customElements.define("tool-tip", ToolTip);
customElements.define("auto-complete", AutoComplete);