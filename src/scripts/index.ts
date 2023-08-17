import App from "./App";
import {Home} from "./Routes/Home";
import {Resume} from "./Routes/Resume";
import {Portfolio} from "./Routes/Portfolio";
import {AboutMe} from "./Routes/AboutMe";

const pkg:any = require("../../package.json");
const app:App = new App();

app.add(Home);
app.add(Resume, true);
app.add(Portfolio, true);
app.add(AboutMe, true);

app.onReady(()=>{
    console.info(`App v${pkg.version} loaded successfully!`);
})