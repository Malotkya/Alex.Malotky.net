import RenderEnvironment from "./View/RenderEnvironment";
import { getRouteInfo, getValueFrom } from "./View/RenderEnvironment/Util";


const env = new RenderEnvironment();

window.addEventListener("popstate", function state_change(event){
    env.handler().then(anchor=>{
        env.scroll(anchor);
    }).catch(console.error);
});

document.body.addEventListener("click", function click_event(event){
    const target:HTMLElement = event.target as HTMLElement;
    const link:HTMLAnchorElement|null = target.closest("a");

    if(link){
        event.preventDefault();
        target.blur();
        link.blur();

        if(link.getAttribute("target") !== "_blank" && link.href.indexOf(location.hostname) !== -1){
            const {anchor, path} = getRouteInfo(link.href);

            //Determine if scrolling or routing.
            if(location.pathname === path){
                env.scroll(anchor);
            } else {
                env.route(link.href);
            }
        } else {
            env.link(link.href);
        }
    }
});

document.body.addEventListener("submit", async function submit_event(event){
    const form = event.target as HTMLFormElement;

    const url = form.action || window.location.pathname;
    let method:string|undefined;
    let body:FormData|undefined; 
    const headers:Dictionary<string> = {};
    
    switch (form.method){
        case "dialog":
            //Do nothing and let the browser handdle it.
            break;

        default:
            event.preventDefault();
            method = form.method;
            body = new FormData(form);
    }

    if(method){
        const data = await RenderEnvironment.fetch(url, {method, body, headers});
        if(data.redirect){
            env.route(data.redirect);
        } else if(data.update){
            for(const id in data.update){
                const element = form.querySelector("#"+id) as HTMLElement|null;
                if(element){
                    RenderEnvironment.render(element, data.update[id]);
                }
            }
        } else {
            env.update(data);
        }
    }
});