import {createElement as _} from "zim-engine";

export default function LoginForm(username?:string, password?:string, error?:string){
    return _("form", {method: "post"},
        _("h2", "Login"),
        error? _("p", {class: "error"}, error): null,
        _("label", {for: "username"}, "Username:"),
        _("input", {name: "username", id: "username", value: username}),
        _("label", {for: "password"}, "Password:"),
        _("input", {type: "password", name: "password", id: "password", value: password}),
        _("div", {class: "btn-container"},
            _("button", "submit")
        )
    )
}

export function LogoutRedirect(){
    const fun = ""+(()=>{
        window.setTimeout(()=>{
            window.location.replace("/");
        }, 3000)
    });
    return [
        _("script", fun.substring(fun.indexOf("{")+1, fun.lastIndexOf("}")-1)),
        _("style", "h2, p { text-align: center }"),
        _("h2", "You have been successfully logged out!"),
        _("p",
            "Click ",
            _("a", {href: "/"}, "here"),
            " to be redirected."
        )
    ]
}