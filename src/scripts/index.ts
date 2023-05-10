import App from "./App";
import {Home} from "./Home";
import {Resume} from "./Resume";
import {Portfolio} from "./Portfolio";

const app = new App();

app.add(Home);
app.add(Resume, true);
app.add(Portfolio, true);

app.onReady(()=>{
    console.info("App loaded successfully!");
})