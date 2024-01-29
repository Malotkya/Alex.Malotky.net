/** App/Core/Router.ts
 * 
 * @author Alex Malotky
 */
import Context from "../Context";
import { Signal } from "./Layer";
import Route from "./Route";

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
            throw new TypeError(`Unknown type '${typeof title}' for title!`);

        if(typeof info === "string")
            this._info = info;
        else if(typeof info === "undefined")
            this._info = "";
        else
            throw new TypeError(`Unknown type '${typeof title}' for info!`)
    }

    /** Handle Context/Response Override
     * 
     * @param {Context} context 
     */
    public async handle(context: Context): Promise<void> {
        if( !(context instanceof Context) )
            throw new TypeError(`Unknown type '${typeof context}' for Context!`);

        if(this.match(context)) {
            context.title = this._title;
            context.info = this._info;

            try {
                await super.handle(context);
            } catch (e: any){
                throw e;
            }
            
        }
    }

    /** Match Override
     * 
     * Routers handle path matching differently then layers and routes.
     * 
     * @param {string} path 
     * @returns {boolean}
     */
    public match(ctx:Context):boolean{
        return ctx.path.match(this.path) !== null;
    }

    /** Title Getter
     * 
     */
    public get title(): string{
        return this._title;
    }

    /** Hyperlink Reference Getter
     * 
     */
    public get href():string {
        //Remove Variables from path.
        return this.path.replace(/\/:.*?(?=\/|$)/gm, "");
    }

    /** Sub Routers
     * 
     * Compiles all Routers inside of this routers into a seperate list.
     * 
     * @returns {Array<Router>}
     */
    public subRouters(): Array<Router>{
        const output: Array<Router> = [];

        for(let layer of this._layers){
            if(layer instanceof Router)
                output.push(layer);
        }

        return output;
    }
}