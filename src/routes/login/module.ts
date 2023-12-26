import { createElement as _, Content} from "../../util/Elements";

export default function Login(args:any):Content {
    let error:HTMLElement|null = null;
    if(args.error){
        error = _("div", {class: "error"}, String(args.error));
    }

    const form = _("form", {id: "login"},
        _("label", {for:"username"}),
        _("input", {id: "username", name:"username", value:args.username}),
        _("label", {for:"password"}),
        _("input", {id: "password", name:"password",type:"password", value:args.password}),
        _("button", "Log In")
    );
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        (window as any).route(location.pathname, new FormData(event.target as HTMLFormElement));
        return false;
    });

    return[ 
        _("h1", "Login"),
        error,
        form
    ];
}
