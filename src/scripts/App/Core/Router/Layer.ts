
import {pathToRegexp, Key} from "path-to-regexp";
import Context from "../Context";

export type Signal = (error?:any) => void;
export type Middleware = (context:Context) => Promise<void>;

export const SignalEnd = "END";

export default class Layer {
    private _regex: RegExp;
    protected _path: string;
    public _handler: Middleware;
    protected _options: any;
    protected _params: any;
    private _keys: Array<Key>  
    private _shortcut: boolean

    constructor(path: string, options: any = {}, handler:Middleware){
        this.path = path;
        this._handler = handler;
        this._options = options;
        
    }

    public handle(context: Context, next: Signal){
        context.params = this._params;
        this._handler(context)
            .then(next)
            .catch(next);
    }

    protected set path(value: string){
        this._regex = pathToRegexp(value);
        this._path = value;
        this._shortcut = value === "";
    }

    protected get path(){
        return this._path;
    }

    public match(path: string): boolean{
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