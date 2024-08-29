/** /Engine
 * 
 * @author Alex Malotky
 */
import Routing from "./Routing";
import Context from "./Context";
import View from "./View";

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
}