/** /Engine
 * 
 * @author Alex Malotky
 */
import Routing from "./Routing";
import Context from "./Context";
import View from "./View";
import { EndPoint, Middleware } from "./Routing/Layer";

export default class Engine extends Routing {
    private _view:View|undefined;

    constructor(view?:View){
        super();
        this._view = view;
    }

    async fetch(request:Request, env:Env):Promise<Response> {
        const asset = await env.ASSETS.fetch(request);

        if(asset.ok)
            return asset;

        return await this.handle(new Context(request, env, this._view));
    }

    use(handler:Middleware|EndPoint): void
    use(path:string, endpoint:EndPoint):void
    use(){
        switch(arguments.length){
            case 0:
                throw new Error("No arguments were passed to Engine.use!");

            case 1:
                super.all(arguments[0]);
                break;

            default:
                super.all(arguments[0], arguments[1]);
        }
    }

}