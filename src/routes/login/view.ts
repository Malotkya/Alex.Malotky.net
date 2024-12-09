/** /routes/login/view
 * 
 * @author Alex Malotky
 */
import {createElement as _, Content} from "zim-engine";

/** Login Form
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {string} error 
 * @returns {Content}
 */
export default function LoginForm(username?:string, password?:string, error?:string):Content{
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

/** Redirect Home
 * 
 */
function redirectHome(){
    window.setTimeout(()=>{
        window.location.replace("/");
    }, 3000)
}

/** Logout View
 * 
 * @returns {Content}
 */
export function LogoutView():Content{
    return [
        _("script", redirectHome),
        _("style", "h2, p { text-align: center }"),
        _("h2", "You have been successfully logged out!"),
        _("p",
            "Click ",
            _("a", {href: "/"}, "here"),
            " to be redirected."
        )
    ]
}