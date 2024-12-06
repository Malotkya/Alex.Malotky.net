import { Router } from "zim-engine";
import LoginForm, {LogoutRedirect} from "./view";
import {USERNAME, PASSWORD} from "@/secrets.json";

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
        body: {
            main: LoginForm()
        }
    });
});


Login.post(async(ctx)=>{
    const {username, password} = await ctx.formData();
    let error:string|undefined;

    if(username ===  undefined){
        error = "Please enter a username!";
    } else if(password === undefined){
        error = "Please enter a password!";
    } else if(username !== USERNAME || password !== PASSWORD){
        error = "Wrong Username or Password!";
    } else {
        await ctx.setAuth({username, password});
        return ctx.redirect("back");
    }

    ctx.render({
        head: {
            title: "Login",
        },
        body: {
            main: LoginForm(username as string, password as string, error)
        }
    });
});

export const Logout = new Router("/Logout");

Logout.all(async(ctx)=>{
    await ctx.setAuth(null);
    ctx.render({
        body: {
            main: LogoutRedirect()
        }
    })
});

export default Login;