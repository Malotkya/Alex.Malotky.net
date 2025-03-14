/** /routes/login
 * 
 * @author Alex Malotky
 */
import { Context, Router } from "zim-engine";
import LoginForm, {LogoutView} from "./view";
const {USERNAME, PASSWORD} = require("@/secrets.json");

export async function RequireLoginHandler(ctx:Context){
    const user = await ctx.getAuth();
    if(user === null) {
        ctx.redirect(`/Login?return=${encodeURIComponent(ctx.url.pathname)}`);
    }
}

const Login = new Router("/Login");

Login.get(async(ctx)=>{
    const user = await ctx.getAuth();
    const back = ctx.search.get("return");

    if(user){
        return ctx.redirect(back || "/");
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
    const back = ctx.search.get("return");
    let error:string|undefined;

    if(typeof username !==  "string"){
        error = "Please enter a username!";
    } else if(typeof password !==  "string"){
        error = "Please enter a password!";
    } else if(username !== USERNAME || password !== PASSWORD){
        error = "Wrong Username or Password!";
    } else {
        await ctx.setAuth({username, password});
        return ctx.redirect(back || "/");
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
            main: LogoutView()
        }
    })
});

export default Login;