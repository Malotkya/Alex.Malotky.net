/** /App.ts
 * 
 * @author Alex Malotky
 */
import Core from "./Core";
import templateEngine from "./TemplateEngine";
import Context from "./Core/Context";
import Router from "./Core/Router"
import NavBar from "./NavBar";

//Export Classes and Functions
export {Context, Router};
export {makeErrorMessage} from "./Core";

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
        this._nav = new NavBar();
        this._nav.routeEvent(event=>this.route(event));
    }

    /** Add to Navbar and Use Router
     * 
     * Calls this.use(path, Router)
     * 
     * TODO: create drop down if router has sub-routes.
     * 
     * @param {string} path 
     * @param {Router} router 
     */
    public add(path: string, router:Router){
        this.use(path, router);
        if(path !== "/")
            this._nav.add(router);
    }
}

/** Render Template File
 * 
 * Fetches template file and then renders html string.
 * 
 * @param {string} filename 
 * @param {any} args 
 * @returns {Promise<string>}
 */
export function render(filename: string, args?: any): Promise<string>{
    return new Promise((resolve, reject)=>{
        try{
            resolve(templateEngine(filename, args));
        } catch (e){
            reject(e);
        }
    })
}

/** Sleep/Wait Utility
 * 
 * Currently only used by the home page, I felt like this utility funciton should
 * be included in the app file.
 * 
 * @param {number} t - time in milliseconds.
 * @returns {Promise<void>}
 */
export function sleep(t: number): Promise<void>{
    return new Promise((res,rej)=>{
        window.setTimeout(res, t);
    });
}