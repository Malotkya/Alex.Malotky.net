import Content from "./Core/Content"

/** Router Class
 * 
 * @author Alex Malotky
 */
export default class Router extends Content{
    private _route: string;
    private _render: ()=>Promise<string>;
    private _execute: ()=>Promise<any>;

    constructor(route: string, title: string, description:string){
        super(title, description);

        if(typeof route === "string"){
            this._route = route;
        } else {
            throw new Error("Title must be a string!");
        }

        //easier to make execute return nothing!
        this._execute = () => new Promise((res, rej)=> res(undefined));
    }

    /** On Load Event Callback
     * 
     * This event is called when the page loads to render the html.
     * 
     * @param {Function} callback 
     */
    onLoad(callback:()=>Promise<string>){
        this._render = callback;
    }

    /** On Connected Event Callback
     * 
     * This event is called once the html is rendered to execute any javascript.
     * 
     * @param {Function} callback 
     */
    onConnected(callback:()=>Promise<any>){
        this._execute = callback;
    }

    /** Get HTML
     * 
     */
    get html(): Promise<string>{
        return new Promise( (resolve, reject)=>{
            if(this._render)
                this._render().then(resolve).catch(reject);
            else
                resolve(this._string);
        });
    }

    /** Get Javascript
     * 
     */
    get js(): Promise<HTMLElement>{
        return this._execute();
    }

    /** Checks if the route matches the url
     * 
     * May be changing to allow variables within the url
     * 
     * @param {string} url 
     * @returns 
     */
    matches(url: string){
        if(typeof url !== "string"){
            throw new Error("Title must be a string!");
        }

        return url === this._route;
    }

    /** Get Hypertext Reference
     * 
     */
    get href(){
        return this._route;
    }
}