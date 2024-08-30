import RenderEnvironment from "./View/RenderEnvironment";
import { getRouteInfo } from "./View/RenderEnvironment/Util";

const env = new RenderEnvironment();

window.addEventListener("popstate", function stateChange(event){
    env.handler().then(anchor=>{
        env.scroll(anchor);
    }).catch(console.error);
});

document.body.addEventListener("click", function clcik(event){
    const target:HTMLElement = event.target as HTMLElement;
    const link:HTMLAnchorElement|null = target.closest("a");

    if(link){
        event.preventDefault();
        target.blur();

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

document.body.addEventListener("submit", function submit(event){
    event.preventDefault();

    alert("Submit!");
});