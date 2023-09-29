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
    private _layers: Array<Layer>

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
        let path: string;
        let middleware: Route|Middleware;

        //Filter Arguments
        if(args.length === 0){
            throw new Error("No arguments given!");
        } else if(args.length === 1){
            path = "";
            middleware = args[0];
        } else if(args.length === 2){
            path = args[0];
            middleware = args[1];
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
}