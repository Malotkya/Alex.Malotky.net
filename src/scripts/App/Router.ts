import Content from "./Core/Content"

/** Router Class
 * 
 * @author Alex Malotky
 */
export default class Router extends Content{
    private _route: string;
    private _render: ()=>Promise<string>|string;
    private _execute: ()=>Promise<any>|void;

    constructor(route: string, title: string, description:string){
        super(title, description);

        if(typeof route === "string"){
            this._route = route;
        } else {
            throw new Error("Title must be a string!");
        }
        
        //easier to make execute return nothing!
        this._execute = () => undefined;
    }

    /** On Load Event Callback
     * 
     * This event is called when the page loads to render the html.
     * 
     * @param {Function} callback 
     */
    public onLoad(callback:()=>Promise<string>|string): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._render = callback;
    }

    /** On Connected Event Callback
     * 
     * This event is called once the html is rendered to execute any javascript.
     * 
     * @param {Function} callback 
     */
    public onConnected(callback:()=>Promise<any>|void): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._execute = callback;
    }

    /** Get HTML
     * 
     */
    get html(): Promise<string>{
        if(this._render)
            return convertToPromise(this._render())
        else
            return convertToPromise(this._string, "No html given!");
    }

    /** Get Javascript
     * 
     */
    get js(): Promise<any>{
        return convertToPromise(this._execute());
    }

    /** Checks if the route matches the url
     * 
     * May be changing to allow variables within the url
     * 
     * @param {string} url 
     * @returns {boolean}
     */
    public matches(url: string): boolean{
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

/** Convert to Promise
 * 
 * Wraps the value in a promis if the value isn't already a promise.
 * Will reject if value is undefined & message is set.
 * 
 * @param {any} value 
 * @param {string} message 
 * @returns {Promise<any>}
 */
function convertToPromise(value: any, message?: string): Promise<any>{
    if(value instanceof Promise)
        return value;

    return new Promise((res,rej)=>{
        if(value)
            res(value);

        if(message)
            rej(new Error(message));

        res(undefined);
    })
}