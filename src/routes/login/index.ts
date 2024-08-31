import { Router } from "Engine";
import LoginForm from "./view";

const Login = new Router("/Login");

Login.get(async(ctx)=>{
    const user = await ctx.getAuth();

    if(user){
        return ctx.redirect("back");
    }

    ctx.render({
        head: {
            title: "Login",
        },
        body: LoginForm()
    });
});


Login.post(async(ctx)=>{
    const username = ctx.formData.get("username");
    const password = ctx.formData.get("password");
    let error:string;

    if(username ===  undefined){
        error = "Please enter a username!";
    } else if(password === undefined){
        error = "Please enter a password!";
    } else if(username !== "test" || password !== "12345"){
        error = "Wrong Username or Password!";
    } else {
        await ctx.setAuth({username, password});
        return ctx.redirect("back");
    }

    ctx.render({
        head: {
            title: "Login",
        },
        body: LoginForm(username, password, error)
    });
});

export const Logout = new Router("/Logout");

Logout.all(async(ctx)=>{
    await ctx.setAuth(null);
    ctx.redirect("/");
});

export default Login;