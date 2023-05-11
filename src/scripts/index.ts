import App from "./App";
import {Home} from "./Routes/Home";
import {Resume} from "./Routes/Resume";
import {Portfolio} from "./Routes/Portfolio";

const app = new App();

app.add(Home);
app.add(Resume, true);
app.add(Portfolio, true);

app.onReady(()=>{
    console.info("App loaded successfully!");
})