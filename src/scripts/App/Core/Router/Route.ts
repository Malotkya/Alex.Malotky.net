/** App/Core/Router/Route.ts
 * 
 * @author Alex Malotky
 */
import Layer, {Middleware, Signal} from "./Layer";
import Context from "../Context";

/** Route Class
 * 
 */
export default class Route extends Layer{
    protected _layers: Array<Layer>

    /** Constructor
     * 
     * @param {any} options 
     */
    public constructor(options: any = {}){
        super("", options, undefined);
        this._layers = [];
    }

    /** Use Middleware or Route
     * 
     * originaly: use(path:string|Array<string> = "", middleware:Middleware|Router)
     * 
     * @param {string|Array<string>} path 
     * @param {Middleware|Router} middleware
     * @returns {Route}
     */
    public use(...args: Array<any>): Route {
        //Input Arguments
        let path: string|Array<string>;
        let middleware: Route|Middleware;

        //Filter Arguments
        switch (args.length){
            case 1:
                path = "";
                middleware = args[0];
                break;

            case 2:
                path = args[0];
                middleware = args[1];
                break;
                
            case 0:
                throw new Error("No arguments given!");

            default:
                path = [];

                while(args.length > 1){
                    path.push( String(args.splice(0,1)) );
                }
                middleware = args[0];
        }

        //Recursion for List of paths
        if(Array.isArray(path)){
            for(let p of path)
                this.use(p, middleware);

            return this;
        }

        //Validate Path
        if(typeof path !== "string")
            throw new TypeError(`Unknown type '${typeof path}' for path!`);

        //Handle adding middleware
        if(middleware instanceof Route){
            middleware.path = this.path + path;
            this._layers.push(middleware);
        } else if(typeof middleware === "function"){
            this._layers.push(new Layer(this._path + path, this._options, middleware));
        } else {
            throw new TypeError(`Unknown middlware type '${typeof middleware}'!`);
        }

        return this;
    }

    /** Handle Context/Response Override
     * 
     * @param {Context} context 
     * @param {Signal} done 
     */
    public handle(context: Context, done: Signal){
        let index = 0;

        const next: Signal = async(error?:any): Promise<void>=>{
            if(error)
                return done(error);

            if(context.isDone())
                return done();

            let layer: Layer = this._layers[index++];

            if(typeof layer === "undefined")
                return done();

            if(layer.match(context.path)) {
                return layer.handle(context, next);
            }

            next();
        }

        next();
    }

    /** Set Path Override
     * 
     */
    public set path(value: string){
        if(this._layers){
            let index = this._path.length;
            for(let layer of this._layers){
                let oldPath = layer.path.substring(index);
                layer.path = value + oldPath;
            }
        }
        super.path = value;
    }

    /** Get Path Override
     * 
     * Needed once set path was added.
     * 
     */
    public get path(): string{
        return this._path;
    }

    /** Match Path Override
     * 
     * @param {string} path 
     * @returns {boolean}
     */
    public match(path:string): boolean{
        for(let layer of this._layers) {
            if(layer.match(path, true))
                return true;
        }
            
        return super.match(path);
    }

    /** Set Parameter Override
     * 
     * @param {string} key 
     * @param {string} value 
     */
    public set(key:string, value:string){
        for(let layer of this._layers){
            layer.set(key, value);
        }
    }
}