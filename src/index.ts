import App from "./App";
import {Home} from "./Home";
import {Resume} from "./Resume";

const app = new App();

app.add(Home);
app.add(Resume, true);

app.onReady(()=>{
    console.log("Hello World!");
})