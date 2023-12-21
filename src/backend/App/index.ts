/** /App.ts
 * 
 * @author Alex Malotky
 */
import Core from "./Core";
import templateEngine from "./TemplateEngine";
import NavBar from "./NavBar";
import Router from "./Core/Router";

//Export Classes and Functions
import Context, { Executable } from "./Core/Context";
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

/** Render Template File
 * 
 * @param {string} filename 
 * @param {any} args 
 * @returns {Promise<string>}
 */
export function render(filename: string, args?: any): Promise<string>{
    return templateEngine(filename, args);
}

/** Execute Javascript File
 * 
 * @param {string} filename
 */
export async function execute(filename: string): Promise<Executable>{
    let module: any;
    try{
        module = (await import(/*webpackIgnore: true*/ "/scripts/"+filename));
    } catch(err){
        console.error(err);
        throw new Error(`There was a problem importing module at ${filename}!`);
    }
     
    if(typeof module.default !== "function")
        throw new Error(`Unknown type '${typeof module.default}' for default export in module at ${filename}!`);
    
    
    return module.default;
}