export function createElement(name:string, attributes?:any, ...children:Array<HTMLElement|string|null>): HTMLElement{
    if(typeof attributes === "string" || attributes instanceof HTMLElement) {
        children.unshift(attributes);
        attributes = {};
    }
    
    const element = document.createElement(name);

    for(let name in attributes){
        element.setAttribute(name, String(attributes[name]));
    }

    for(let child of children){
        if(typeof child === "string") {
            element.textContent += child;
        } else {
            if(child !== null)
                element.appendChild(child);
        }
    }

    return element;
}

export const content = (args:any) => {
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
