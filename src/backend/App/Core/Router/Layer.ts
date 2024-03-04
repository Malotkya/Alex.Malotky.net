
/** App/Core/Router/Layer.ts
 * 
 * @author Alex Malotky
 */
import {pathToRegexp, Key} from "path-to-regexp";
import Context from "../Context";

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
    private _shortcut: boolean;

    //Protected attributes
    protected _path: string;
    protected _handler: Middleware;
    protected _options: any;
    
    /** Constructor
     * 
     * @param {string} path 
     * @param {any} options 
     * @param {Middleware} handler 
     */
    constructor(path: string, options: any = {}, handler:Middleware){
        this._options = options;

        if(typeof path !== "string")
            throw new TypeError(`Unknown type '${typeof path}' for path!`);

        if(path === "*"){
            this._shortcut = true;
            path = "";
        }

        this.path = path;

        if(typeof handler !== "function" && typeof handler !== "undefined")
            throw new TypeError(`Unknown type '${typeof handler}' for handler!`);
        this._handler = handler;
    }

    /** Handle Context/Response
     * 
     * @param {Context} context 
     */
    public async handle(context: Context){
        if( !(context instanceof Context) )
            throw new TypeError(`Unknown type '${typeof context}' for context!`);

        try {
            if(this.match(context))
                await this._handler(context);
        } catch (e:any){
            throw e;
        }
    }

    /** Path Setter
     * 
     */
    public set path(value: string){
        if(typeof value !== "string")
            throw new TypeError(`Unknown type '${typeof value}' for path!`);

        if(value.length > 1 && value.charAt(value.length - 1) === "/")
            value = value.substring(0, value.length-1);

        this._regex = pathToRegexp(value, this._keys = [], this._options);
        this._path = value;
    }

    /** Path Getter
     * 
     */
    public get path(){
        return this._path;
    }

    /** Match Path
     * 
     * @param {Context} context 
     * @returns {boolean}
     */
    public match(context: Context): boolean{
        if( !(context instanceof Context) )
            throw new TypeError(`Unknown type '${typeof context}' for Context!`);

        if(this._shortcut)
            return true;

        let match = context.path.match(this._regex)

        if(match === null){
            return false;
        }

        for(let index = 1; index < match.length; index++){
            let name = String(this._keys[index-1].name);
            let value = decodeURIComponent(match[index]);
            context.params.set(name, value);
        }

        return true;
    }
}