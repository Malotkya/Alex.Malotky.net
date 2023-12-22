/** App/Core/Context.ts
 * 
 * @author Alex Malotky
 */
export type Executable = (context?:Context)=>Promise<void>|void;
export type Content = string|HTMLElement|Array<Content>;

export interface Module {
    main?: Executable,
    content: Content
}

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
    private _connected: Executable;
    private _newRoute: route|undefined;

    //app
    private _done: boolean|Function|undefined;

    /** Constructor
     * 
     * @param {Location} l 
     */
    constructor(l: Location, body?:FormData|Map<any, any>|any){
        this._port = l.port;
        this._host = l.hostname;
        this._path = l.pathname;
        this._body = new HTMLBodyElement;
        this._title = "";
        this._info = "";
        this._connected = ()=>undefined;
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
                    this._gets.set(String(name), String(value));
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

    /** Paramters Getter
     * 
     */
    get(key:string):string {
        return this._params.get(key) || "undefined";
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
        if(Array.isArray(value)){
            for(let e of value)
                this.body = e;
        } else if(value instanceof HTMLElement)
            if(value.nodeName === "BODY-ELEMENT")
                this._body = value as HTMLBodyElement;
            else
                this._body.appendChild(value)
        else 
            this._body.innerHTML += String(value);
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

    set connected(value: Executable){
        if(typeof value !== "function")
            throw new TypeError(`Unknown type '${typeof value}' for Executable!`);
        this._connected = value;
    }

    get connected(){
        return this._connected;
    }

    public reRoute(path: string, body?:any){
        this._newRoute = {
            path: path,
            body: body
        };
        this.done();
    }

    set module(value: Module){
        this.body = value.content;
        if(value.main)
            this.connected = value.main;
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