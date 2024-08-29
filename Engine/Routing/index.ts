/** /Engine/Routing
 * 
 * @author Alex Malotky
 */
import Context from "../Context";
import Router from "./Router";
import HttpError from "../HttpError";

type Handler = (context:Context)=>Promise<Response>|Response;
type ErrorHandler = (error:any, context:Context)=>Promise<Response>|Response;

export default class Routing extends Router{
    private notFoundHandler:Handler;
    private errorHandler:ErrorHandler;

    constructor(){
        super("Main Routing");
        this.notFoundHandler = (ctx:Context) => {throw new HttpError(404, `${ctx.url.pathname} was not found!`)};
        this.errorHandler = (e:any) => {
            return new Response(e.message || String(e), {status: e.statusCode || e.code || e.status || 500})
        }
    }

    async handle(context:Context):Promise<Response>{
        try {
            for(const {name, layer} of this._methods){
                if(name === "MIDDLEWARE"){
                    await layer.handle(context);
                } else if(name === context.method || name === "ALL") {
                    
                    const response = await layer.handle(context);
                    if(response)
                        return response;

                    if(context.response.commited())
                        return await context.flush();
                }
            }

            return await this.notFoundHandler(context);
        } catch (error:any){
            return await this.errorHandler(error, context);
        }
        
    }
}