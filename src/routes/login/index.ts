import { Router, Context } from "Engine";

export const Login = new Router("Login");
/*
Login.all("/Login", async(ctx: Context)=>{
    const {username, password} = ctx.authorization() || {};
    let error:string|undefined;

    if(username && password){
        if(username !== "test" || password !== "12345") {
            error = "Wrong Username or Password!";
        } else {
            return ctx.response.redirect("back");
        }

        
    }
    //Go Back Home
    if(await auth.getCurrentUser())
        return ctx.response.redirect("back");

    if(username !== "" && password !== ""){
        try {
            if(await auth.signInUser(username, password)) {
                return ctx.response.redirect("back");
            } else {
                error = "Unable to login!";
            }
        } catch (e){
            error = "Wrong Username or Password!";
        }
    }

    ctx.body = await importModule("login", {
        username: username || "",
        password: password || "",
        error: error
    });
});

Login.all("/Logout", async(ctx:Context)=>{
    const auth = await Authentication();
    
    await auth.signOutUser();
    ctx.reRoute("/");
})
    */