/** /App/Module.ts
 * 
 * @author Alex Malotky
 */
import Router from "./Core/Router";
import Context, {Executable} from "./Core/Context";
import { Middleware, Signal } from "./Core/Router/Layer";

/** Module Class
 * 
 * The Modlue is the final layer of abstraction that includes executing javascript
 * when a router is first hit, and when it done rendering.
 */
export default class Module extends Router{
    private _load: Executable;
    private _connected: Executable;

    /** Constructor
     * 
     * @param {string} title 
     * @param {string} info 
     */
    constructor(title:string, info?:string){
        super(title, info);
    }

    /** Handle Context/Response Override
     * 
     * @param {Context} context 
     * @param {Signal} done 
     */
    handle(context: Context, done: Signal){
        if(this._load)
            this._load();

        if(this._connected)
            context.execute = this._connected;

        super.handle(context, done);
    }

    /** On Load Event
     * 
     * @param {Executable} callback 
     */
    onLoad(callback:Executable){
        if(typeof callback !== "function")
            throw new TypeError(`Unknown type '${typeof callback}' for Load Event`);

        this._load = callback;
    }

    /** On Render Event
     * 
     * @param {Middleware} callback 
     */
    onRender(callback:Middleware){
        if(typeof callback !== "function")
            throw new TypeError(`Unknown type '${typeof callback}' for Render Event`);

        this.use(callback);
    }

    /** On Connected Event
     * 
     * @param {Executable} callback
     */
    onConnected(callback:Executable){
        if(typeof callback !== "function")
            throw new TypeError(`Unknown type '${typeof callback}' for Connected Event`);

        this._connected = callback;
    }

    
}