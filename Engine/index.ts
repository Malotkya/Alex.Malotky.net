/** /Engine
 * 
 * @author Alex Malotky
 */
import Routing from "./Routing";
import Layer from "./Routing/Layer";
import Context, {Authorization} from "./Context";
import View from "./View";
import { EndPoint, Middleware } from "./Routing/Layer";

//Exports
import Router from "./Routing/Router";
import { createElement } from "./View/Html/Element";
import { RenderContent } from "./View";
export {Router, Context, createElement as createContent};
export type {RenderContent as Content};

export default class Engine extends Routing {
    private _view:View|undefined;
    private _auth:Authorization|undefined;

    constructor(){
        super();
    }

    set view(value:View){
        if( !(value instanceof View) )
            throw new Error("Value must be an instance of View!");

        this._view = value;
    }

    auth(value:Authorization) {
        if(typeof value !== "function")
            throw new TypeError("Auth must be a function!");

        this._auth = value;
    }

    async fetch(request:Request, env:Env):Promise<Response> {
        const asset = await env.ASSETS.fetch(request);

        if(asset.ok)
            return asset;

        return await this.handle(new Context(request, env, this._view, this._auth));
    }

    use(handler:Middleware|EndPoint|Layer): void
    use(path:string, endpoint:EndPoint|Layer):void
    use(){
        switch(arguments.length){
            case 0:
                throw new Error("No arguments were passed to Engine.use!");

            case 1:
                switch(typeof arguments[0]){
                    case "function":
                        super.all(arguments[0]);
                        break;

                    case "object":
                        this._methods.add("ALL", arguments[0]);
                        break;

                    default:
                        throw new Error("Handler must be a function or a Layer!");
                }
                break;

            default:
                switch(typeof arguments[1]){
                    case "function":
                        super.all(arguments[1]);
                        break;

                    case "object":
                        this._methods.add("ALL", arguments[1]);
                        break;

                    default:
                        throw new Error("Handler must be a function or a Layer!");
                }
        }
    }

}