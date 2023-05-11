import App_Base from "./Core/App_Base";
import NavBar from "./NavBar";
import Router from "./Router";
import templateEngine from "./Core/TemplateEngine";

/** Application Class
 * 
 * @author Alex Malotky
 */
export default class App extends App_Base {
    private _navbar:NavBar;

    constructor(){
        //Dirty trick for typscript
        super(window);

        this._navbar = new NavBar("#top-nav-menu");
        this._navbar.routeEvent(event=>this._route(event));
    }

    /** Add Router to App
     * 
     * @param {Router} router 
     * @param {boolean} addToNav 
     */
    public add(router: Router,addToNav?:boolean){
        this._routes.push(router);

        if(addToNav)
            this._navbar.add(router);

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

/** Execute Javascript File
 * 
 * Links javascript file to dom and executes within a promise.
 * Return script element to allow app remove it when a new page gets loaded.
 * 
 * @param {string} filename 
 * @returns {Promise<HTMLElement>}
 */
export function execute(filename: string): Promise<HTMLElement>{
    return new Promise((resolve, reject)=>{
        const script = document.createElement("script");
        document.body.appendChild(script);
        script.onload = () => {
            resolve(script)
        };
        script.onerror = reject;
        script.async = true;
        script.src = "scripts/" + filename;
    })
}