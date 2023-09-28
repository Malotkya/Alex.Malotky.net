/** App/Core/Router.ts
 * 
 * @author Alex Malotky
 */
import Context from "../Context";
import { Signal } from "./Layer";
import Route from "./Route";

//End Signal
export const SignalEnd = "END";

/** Router Class
 * 
 * Distinct from route in that when done it will signal to end routing,
 * and automatically updates the title and info metadata in the context.
 */
export default class Router extends Route {
    private _title: string;
    private _info: string;

    /** Constructor
     * 
     * @param {string} title 
     * @param {string} info 
     */
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

    /** Handle Context/Response Override
     * 
     * @param {Context} context 
     * @param {Signal} done 
     */
    public handle(context: Context, done: Signal) {
        context.title = this._title;
        context.info = this._info;
        
        super.handle(context, (error?:any) =>{
            if(error)
                return done(error);

            done(SignalEnd);
        });
    }

    /** Title Getter
     * 
     */
    public get title(){
        return this._title;
    }

    /** Hyperlink Reference Getter
     * 
     */
    public get href(){
        return this.path;
    }
}