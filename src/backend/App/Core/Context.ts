/** App/Core/Context.ts
 * 
 * @author Alex Malotky
 */
import { Content } from "../../../util/Elements";

export type Executable = (context?:Context)=>Promise<void>|void;

interface route {
    path: string,
    body: any
}

class HTMLBodyElement extends HTMLElement{
    public connectedCallback(){
        throw new Error("This Element should never be rendered!");
    }
};
customElements.define("body-element", HTMLBodyElement, {extends: "main"});

/** Context Class
 * 
 * Contains information that can be modified by middleware.
 */
export default class Context{
    //Location Information
    private _port: string;
    private _host: string;
    private _path: string;

    //Information Generated from path
    private _gets: Map<string, string>;
    private _params: Map<string, string>;

    //Information gnerated by users.
    private _body: HTMLBodyElement;
    private _title: string;
    private _info: string;
    private _newRoute: route|undefined;

    //app
    private _done: boolean|Function|undefined;

    /** Constructor
     * 
     * @param {Location} l 
     */
    constructor(l: Location, body?:BodyData){
        this._port = l.port;
        this._host = l.hostname;
        this._path = l.pathname;
        this._body = new HTMLBodyElement;
        this._title = "";
        this._info = "";
        this._params = new Map<string, string>();
        this._gets = new Map<string, string>();
        for(let args of location.search.substring(1).split('&')){
            let buffer = decodeURIComponent(args).split("=");
            this._gets.set(buffer[0], buffer[1]);
        }
        if(typeof body !== "undefined") {
            if(body instanceof FormData){
                for(let [name, value] of body.entries())
                    this._gets.set(name, value.toString());
            } else if(body instanceof Map) {
                for(let [name, value] of body.values())
                    this._gets.set(name, String(value));
            } else {
                for(let name in body)
                    this._gets.set(name, String(body[name]));
            }
        }
    }

    /** Port Number Getter
     * 
     */
    get port(): string{
        return this._port;
    }

    /** Host Name Getter
     * 
     */
    get host(): string{
        return this._host;
    }

    /** Path Getter
     * 
     */
    get path(): string{
        return this._path;
    }

    /** HTML Body Getter
     * 
     */
    get body(): HTMLBodyElement{
        return this._body;
    }

    /** Paramters Getter Wrapper
     * 
     */
    get(key:string):string {
        return this._params.get(key) || "undefined";
    }

    /** Paramters Getter
     * 
     */
    get params():Map<string, string> {
        return this._params;
    }

    /** HTML Title Getter
     * 
     */
    get title(): string {
        return this._title;
    }

    /** HTML Description Getter
     * 
     */
    get info(): string {
        return this._info;
    }

    /** HTML Body Setter
     * 
     */
    set body(value:Content){
        this.add(value);
        this.done();
    }

    /** Add to body
     * 
     * Recursively called if array is passed.
     * 
     * @param {Content} c 
     */
    private add(c:Content){
        if(Array.isArray(c)){
            for(let e of c)
                this.add(e);
        } else if(c instanceof HTMLElement) {
            if(c.nodeName === "BODY-ELEMENT")
                this._body = c as HTMLBodyElement;
            else
                this._body.appendChild(c)
        } else if(c !== null && c !== undefined) {
            this._body.innerHTML += String(c);
        }
            
    }

    /** Paramters Setter
     * 
     */
    set params(value: Map<string, string>){
        if( !(value instanceof Map) ){
            throw new TypeError(`Unknown type '${typeof value}' for Params!`);
        } 

        for(let it of value.entries()){
            this._params.set(it[0], it[1]);
        }

        for(let it of this._gets.entries()){
            this._params.set(it[0], it[1]);
        }
    }

    /** HTML Title Setter
     * 
     */
    set title(value: string){
        if(value !== "")
            this._title = String(value);
    }

    /** HTML Description Setter
     * 
     */
    set info(value: string){
        if(value !== "")
            this._info = String(value);
    }

    public reRoute(path: string, body?:any){
        this._newRoute = {
            path: path,
            body: body
        };
        this.done();
    }

    public done(){
        switch(typeof this._done){
            case "boolean":
                //Do Nothing
                break;

            case "function":
                this._done(this._newRoute?.path, this._newRoute?.body);

            default:
                this._done = true;
        }
    }

    public onDone(callback:(s?:string, b?:any)=>Promise<void>){
        if(typeof callback !== "function")
            throw new TypeError(`Unknown type '${typeof callback}' for done Event!`);

        if(typeof this._done === "boolean") {
            callback(this._newRoute?.path, this._newRoute?.body);
            this._done = true;
        } else {
            this._done = callback;
        }
    }

    public isDone(): boolean{
        if(typeof this._done === "boolean")
            return this._done;

        return false;
    }
}