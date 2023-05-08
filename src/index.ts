import Router from "./App/Router";
import App, {render, execute} from "./App";

let app = new App();

let index = new Router("/", "Home", "");
index.onLoad(()=>{
    return render("home.html");
});

index.onConnected(()=>{
    return execute("test.js");
})

app.add(index);

app.onReady(()=>{
    console.log("Hello World!");
})