import { Router, Context, execute, render } from "../App"
import Authentication from "../Util/Authentication";

export const Login = new Router("Login");

Login.use("/Login", async(ctx: Context)=>{
    const auth = await Authentication();

    //Go Back Home
    if(await auth.getCurrentUser())
        return ctx.reRoute("/");

    ctx.connected = await execute("login.js");
    ctx.body = await render("login.html");
});

Login.use("/Logout", async(ctx:Context)=>{
    const auth = await Authentication();
    await auth.signOutUser();
    ctx.reRoute("/");
})