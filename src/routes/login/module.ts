import { createElement } from "../../backend/App";

export default function Login(args:any) {
    let error:HTMLElement|null = null;
    if(args.error){
        error = createElement("div", {class: "error"});
        error.textContent = String(args.error);
    }

    const form = createElement("form", {id: "login"},
        createElement("label", {for:"username"}),
        createElement("input", {id: "username", name:"username", value:args.username}),
        createElement("label", {for:"password"}),
        createElement("input", {id: "password", name:"password",type:"password", value:args.password}),
        createElement("button", "Log In")
    );

    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        (window as any).route(location.pathname, new FormData(event.target as HTMLFormElement));
        return false;
    });

    return createElement("body-element", 
        createElement("h1", "Login"),
        error,
        form
    );
}
