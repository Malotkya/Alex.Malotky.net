import { Router, Context } from "Engine";
import LoginForm from "./view";

const Login = new Router("/Login");

Login.all(async(ctx: Context)=>{
    const {username, password} = await ctx.authorization() || {username:undefined, password: undefined};
    let error:string|undefined;

    if(username !== undefined && password !== undefined){

        if(username !== "test" || password !== "12345") {
            error = "Wrong Username or Password!";
        } else {
            return ctx.redirect("back");
        }

    }

    ctx.render({
        head: {
            title: "Login",
        },
        body: LoginForm(username, password, error)
    });
});

export default Login;