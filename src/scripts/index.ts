import App from "./App";
import NavBar from "./NavBar";

import {Home} from "./Routes/Home";
//import {Resume} from "./Routes/Resume";
import {Portfolio} from "./Routes/Portfolio";
import {AboutMe} from "./Routes/AboutMe";

const pkg:any = require("../../package.json");

const app:App = new App();
const nav:NavBar = new NavBar();

app.use("/", Home);
//app.use("/Resume", Resume);
app.use("/Portfolio", Portfolio);
app.use("/About", AboutMe);

nav.add(Portfolio);
nav.add(AboutMe);

app.onReady(()=>{
    console.info(`App v${pkg.version} loaded successfully!`);
})