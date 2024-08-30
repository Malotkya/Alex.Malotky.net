import {createContent as _} from "Engine";

export default function LoginForm(username?:string, password?:string, error?:string){
    return _("form", {method: "post"},
        _("h2", "Login"),
        error? _("p", {class: "error"}, error): null,
        _("lable", {for: "username"}, "Username:"),
        _("input", {name: "username", id: "username", value: username}),
        _("label", {for: "password"}, "Password:"),
        _("input", {type: "password", name: "password", id: "password", value: password}),
        _("div", {class: "btn-container"},
            _("button", "submit")
        )
    )
}