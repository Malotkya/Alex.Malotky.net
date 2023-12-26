/** /App.ts
 * 
 * @author Alex Malotky
 */
import Core from "./Core";
import NavBar from "./NavBar";
import Router from "./Core/Router";

//Export Classes and Functions
import { Content } from "../../util/Elements";
import Context, { Executable, Module } from "./Core/Context";
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

            if(link.href.indexOf(this.hostname) !== -1){
                let match = link.href.match(/(?<=#).*?(?=\?|$)/gm);
                if(match){
                    this.scroll(match[0]);
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

export async function importModule(name:string, args?:any): Promise<Module>{
    const filename:string = `./module/${name}.js`;
    let module: any;

    try{
        module = (await import(/*webpackIgnore: true*/ filename));
    } catch(err){
        console.error(err);
        throw new Error(`There was a problem importing module at ${name}!`);
    }
    let main:Executable|undefined;
    let content: Content;
    let defaultType = typeof module.default;

    switch(typeof module.content){
        case "undefined":
            if(defaultType === "object" || defaultType === "string") {
                content = module.default;
            } else if(defaultType === "function"){
                content = module.default(args);
                defaultType = "undefined";
            } else {
                throw new Error(`No content found within module ${name}!`);
            }
            break;

        case "function":
            content = module.content(args);
            break;

        default:
            content = module.content;
    }

    switch (typeof module.main){
        case "undefined":
            if(defaultType === "function"){
                main = module.default;
            }
        break;

        case "function":
            main = module.main;
        break;

        default:
            throw new TypeError(`Unknown type ${typeof module.main} for exported Function in module ${name}!`);
    }

    return {
        content: content,
        main: main
    };
}