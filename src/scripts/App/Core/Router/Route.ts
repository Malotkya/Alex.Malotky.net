import Layer, {Middleware, Signal} from "./Layer";
import Context from "../Context";

export default class Route extends Layer{
    private _layers: Array<Layer>

    public constructor(options: any = {}){
        super("", options, undefined);
        this._layers = [];
    }

    //(path:string|Array<string> = "", middleware:Middleware|Router)
    public use(...args: Array<any>): Route{
        let path: string;
        let middleware: Route|Middleware;

        if(args.length === 0){
            throw new Error("No arguments given!");
        } else if(args.length === 1){
            path = "";
            middleware = args[0];
        } else if(args.length === 2){
            path = args[0];
            middleware = args[1];
        }

        if(Array.isArray(path)){
            for(let p of path)
                this.use(p, middleware);

            return this;
        }

        if(middleware instanceof Route){
            middleware.path = this.path + path;
            this._layers.push(middleware);
        } else if(typeof middleware === "function"){
            this._layers.push(new Layer(this._path + path, this._options, middleware));
        } else {
            throw new Error(`Unknown middlware type '${typeof middleware}'!`);
        }

        return this;
    }

    public handle(context: Context, done: Signal){
        let index = 0;

        const next: Signal = async(error?:any)=>{
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