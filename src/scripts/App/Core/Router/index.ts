import Context from "../Context";
import { Signal, SignalEnd } from "./Layer";
import Route from "./Route";

export default class Router extends Route {
    private _title: string;
    private _info: string;

    constructor(title:string, info?:string){
        super();

        if(typeof title === "string")
            this._title = title;
        else
            throw new Error(`Unknown type '${typeof title}' for title!`);

        if(typeof info === "string")
            this._info = info;
        else
            this._info = "";
    }

    public handle(context: Context, done: Signal) {
        context.title = this._title;
        context.info = this._info;
        
        super.handle(context, (error?:any) =>{
            if(error)
                return done(error);

            done(SignalEnd);
        });
    }

    public get title(){
        return this._title;
    }

    public get href(){
        return this.path;
    }
}