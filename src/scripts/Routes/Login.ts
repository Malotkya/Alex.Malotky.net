import { Router, Context, execute, render } from "../App"
import Authentication from "../Util/Authentication";

export const Login = new Router("Login");

Login.use("/Login", async(ctx: Context)=>{
    const auth = await Authentication();
    let error: string = "";

    //Go Back Home
    if(await auth.getCurrentUser())
        return ctx.reRoute("back");

    const username:string = ctx.params.get("username") || "";
    const password:string = ctx.params.get("password") || "";

    if(username !== "" || password !== ""){
        try {
            if(await auth.signInUser(username, password)) {
                return ctx.reRoute("back");
            } else {
                error = "Unable to login!";
            }
        } catch (e){
            error = "Wrong Username or Password!";
        }
    }

    ctx.connected = await execute("login.js");
    ctx.body = await render("login.html", {
        username: username,
        password: password,
        error: error
    }); 
});

Login.use("/Logout", async(ctx:Context)=>{
    const auth = await Authentication();
    
    await auth.signOutUser();
    ctx.reRoute("/");
})