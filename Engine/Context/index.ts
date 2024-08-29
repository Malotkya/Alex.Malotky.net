/** /Engine/Context
 * 
 * @author Alex Malotky
 */
import View, {RenderUpdate} from "../View";
import HTMLElement from "../View/Html";
import ProtoResponse from "./ProtoResponse";

const HTML_MIME_TYPE = "text/html";
const TXT_MIME_TYPE  = "text/plain";
const JSON_MIME_TYPE = "application/json";

/** Context
 * 
 * Wrapper Around Request/Response
 */
export default class Context{
    private _request:Request;
    private _response:ProtoResponse;
    private _url:URL;
    private _env:Env;
    private _view:View|undefined;

    private _search:Map<string, string>;
    private _params:Map<string, string>;
    private _query:string|undefined;


    /** Constructor
     * 
     * @param request 
     * @param response 
     */
    constructor(request: Request, env:Env, view?:View){
        this._request = request;
        this._response = new ProtoResponse();
        this._env = env;
        this._url = new URL(request.url || "/", `http://${request.headers.get("host")}`);
        this._view = view;

        //Defaults
        this._search = new Map();
        this._params = new Map();

        //Search Values
        for(const [name, value] of this._url.searchParams.entries())
            this._search.set(name, value);
    }

    /** Request Getter
     * 
     */
    get request():Request {
        return this._request;
    }

    /** Response Getter
     * 
     */
    get response():ProtoResponse {
        return this._response;
    }

    /** Environment Getter
     * 
     */
    get env():Env {
        return this._env;
    }

    /** Url Getter
     * 
     */
    get url():URL {
        return this._url;
    }

    /** Method Getter
     * 
     */
    get method():string {
        return this._request.method;
    }

    /** Params Getter
     * 
     */
    get params():Map<string, string>{
        return this._params;
    }

    /** Search Getter
     * 
     */
    get search():Map<string, string>{
        return this._search;
    }

    /** Set Status Code
     * 
     * @param {number} value 
     * @returns {Context}
     */
    status(value:number):Context {
        if(typeof value !== "number") {
            value = Number(value);
        }

        if(isNaN(value)) {
            throw new TypeError("Status code must be a nubmer!")
        } else if( value < 100 || value > 999) {
            throw new TypeError("Status code is out of range!");
        }
        
        this._response.status = value;
        return this;
    }

    write(chunk:any):Context {
        this._response.write(chunk);
        return this;
    }

    end():void {
        this._response.end();
    }

    /** Set Json Content
     * 
     * @param {Object} object 
     * @returns {Context}
     */
    json(object:Object): Context{
        if (!this._response.headers.get("Content-Type")) {
            this._response.headers.set('Content-Type', JSON_MIME_TYPE);
        }
        this._response.write(JSON.stringify(object));
        this._response.end();
        return this;
    }

    /** Set Text Content
     * 
     * @param {string} value 
     * @returns {this}
     */
    text(value:string): Context{
        if (!this._response.headers.get("Content-Type")) {
            this._response.headers.set('Content-Type', TXT_MIME_TYPE);
        }
        this._response.write(value);
        this._response.end();
        return this;
    }

    /** Set HTML Content
     * 
     * @param {string} value 
     * @returns {this}
     */
    html(value:string): Context{
        if (!this._response.headers.get("Content-Type")) {
            this._response.headers.set('Content-Type', HTML_MIME_TYPE);
        }
        this._response.write(value);
        this._response.end();
        return this;
    }

    /** Reunder Update Content
     * 
     * @param {ContentUpdate} update 
     */
    render(update:RenderUpdate){
        if(this._view === undefined)
            throw new Error("No view to render with!");

        if(this._request.headers.get("Content-Type") === JSON_MIME_TYPE) {
            this.json(update);
        } else {
            this.html(this._view.render(update));
        }
    }

    /** Flush Update Content
     * 
     */
    flush():Promise<Response> {
        return this._response.flush();
    }

    get query():string {
        if(this._query !== undefined) {
            if(this._query === "")
                return "/";
            return this._query;
        }
            
        return this.url.pathname;
    }

    set query(value:string){
        if(typeof value !== "string")
            throw new TypeError("Query must be a string!");

        this._query = value;
    }
}