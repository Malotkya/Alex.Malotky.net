import App from "./App";
import {Home} from "./Routes/Home";
import {Resume} from "./Routes/Resume";
import {Portfolio} from "./Routes/Portfolio";
import {AboutMe} from "./Routes/AboutMe";

const app = new App();
const appVersion = "1.0.0";

app.add(Home);
app.add(Resume, true);
app.add(Portfolio, true);
app.add(AboutMe, true);

app.onReady(()=>{
    console.info(`App v${appVersion} loaded successfully!`);
})