
/** App/Core/Router/Layer.ts
 * 
 * @author Alex Malotky
 */
import {pathToRegexp, Key} from "path-to-regexp";
import Context from "../Context";

/** Signal Function Type
 * 
 */
export type Signal = (error?:any) => void;

/** Middleware Function Type
 * 
 */
export type Middleware = (context:Context) => Promise<void>;

/** Layer Class
 * 
 */
export default class Layer {
    //Private attributes
    private _regex: RegExp;
    private _keys: Array<Key>  
    private _shortcut: boolean

    //Protected attributes
    protected _path: string;
    protected _handler: Middleware;
    protected _options: any;
    protected _params: any;
    
    /** Constructor
     * 
     * @param {string} path 
     * @param {any} options 
     * @param {Middleware} handler 
     */
    constructor(path: string, options: any = {}, handler:Middleware){
        if(typeof path !== "string")
            throw new TypeError(`Unknown type '${typeof path}' for path!`);
        this.path = path;

        if(typeof handler !== "function" && typeof handler !== "undefined")
            throw new TypeError(`Unknown type '${typeof handler}' for handler!`);
        this._handler = handler;

        this._options = options;
    }

    /** Handle Context/Response
     * 
     * @param {Context} context 
     * @param {Signal} next 
     */
    public handle(context: Context, next: Signal){
        if(context instanceof Context)
            context.params = this._params;
        else
            throw new TypeError(`Unknown type '${typeof context}' for context!`);

        const wrapper = async(callback:Middleware) => await callback(context);
        wrapper(this._handler).then(next).catch(next);
        
    }

    /** Path Setter
     * 
     * Used by parent route to update path if/when added to a route.
     */
    protected set path(value: string){
        if(typeof value !== "string")
            throw new TypeError(`Unknown type '${typeof value}' for path!`);

        this._regex = pathToRegexp(value);
        this._path = value;
        this._shortcut = value === "";
    }

    /** Path Getter
     * 
     */
    protected get path(){
        return this._path;
    }

    /** Match Path
     * 
     * @param {string} path 
     * @returns {boolean}
     */
    public match(path: string): boolean{
        if(typeof path !== "string")
            throw new TypeError(`Unknown type '${typeof path}' for path!`);

        if(this._shortcut)
            return true;

        let match = path.match(this._regex)

        if(match === null){
            return false;
        }

        this._params = {};
        for(let index = 1; index < match.length; index++){
            let name = this._keys[index-1].name;
            let value = decodeURIComponent(match[index]);
            this._params[name] = value;
        }

        return true;
    }
}

async function promiseWrapper(callback:Middleware, context:Context):Promise<void>{
    return await callback(context);
}