/** /App.ts
 * 
 * @author Alex Malotky
 */
import Core from "./Core";
import NavBar from "./NavBar";
import Router from "./Core/Router";

//Export Classes and Functions
import { Content } from "../../util/Elements";
import Context  from "./Core/Context";
export {Router, Context};
export {makeErrorMessage, HtmlError} from "./Core";


/** App Class
 * 
 * Combines the Navbar and Core App Classes
 */
export default class App extends Core {
    private _nav: NavBar;

    /** Constructor
     * 
     */
    constructor(){
        super();
        try{
            this._nav = new NavBar();
            this._nav.routeEvent(event=>this.checkRoute(event));
        } catch(err: any){
            this.failed(err);
        }
    }

    /** Route Override
     * 
     * Detects if the clicked link is an internal route, or if it is a jump to
     * an anchor id.
     * 
     * @param {Event} event 
     */
    private checkRoute(event: Event){
        const target:HTMLElement = event.target as HTMLElement;
        const link:HTMLAnchorElement|null = target.closest("a");
        
        if(link){
            event.preventDefault();
            target.blur();

            //Clear Cache Override
            if(link.getAttribute("clear") === "true")
                localStorage.clear();

            //Determine if internal or external link
            if(link.getAttribute("target") !== "_blank" && link.href.indexOf(this.hostname) !== -1){
                const {anchor, path} = this.getRouteInfo(link.href);

                if(this.current === path){
                    if(anchor)
                        this.scroll(anchor);
                } else {
                    this.route(link.href);
                }
            } else {
                this.link(link.href);
            }
        }
    }

    /** Add to Navbar and Use Router
     * 
     * Calls this.use(path, Router)
     * 
     * @param {string} path 
     * @param {Router} router 
     * @returns {App}
     */
    public add(path: string, router:Router): App{
        try{
            this.use(path, router);
            if(path !== "/")
                this._nav.add(router);
        } catch(err: any){
            this.failed(err);
        }
        
        return this;
    }
}

export async function importModule(name:string, args?:any): Promise<Content>{
    const filename:string = `./module/${name}.js`;
    let module: any;

    try{
        module = (await import(/*webpackIgnore: true*/ filename));
    } catch(err){
        console.error(err);
        throw new Error(`There was a problem importing module at ${name}!`);
    }
    let defaultType = typeof module.default;

    if(defaultType === "function"){
        return module.default(args);
    } else if (defaultType === "object" || defaultType === "string") {
        return module.default;
    } else if (defaultType === "undefined"){
        console.warn(`No content was returned from module '${name}'.`);
        return null;
    }

    throw new TypeError(`Unknown content type '${defaultType}' for module '${name}'!`);
}