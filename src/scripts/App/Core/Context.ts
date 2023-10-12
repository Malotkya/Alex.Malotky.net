/** App/Core/Context.ts
 * 
 * @author Alex Malotky
 */
export type Executable = (context?:Context)=>Promise<void>|void;

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
    private _body: string;
    private _title: string;
    private _info: string;
    private _connected: Executable;
    private _newRoute: string|undefined;

    //app
    private _done: boolean|Function|undefined;

    /** Constructor
     * 
     * @param {Location} l 
     */
    constructor(l: Location){
        this._port = l.port;
        this._host = l.hostname;
        this._path = l.pathname;
        this._body = "";
        this._title = "";
        this._info = "";
        this._connected = ()=>undefined;
        this._params = new Map<string, string>();
        this._gets = new Map<string, string>();
        for(let args of location.search.substring(1).split('&')){
            let buffer = decodeURIComponent(args).split("=");
            this._gets.set(buffer[0], buffer[1]);
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
    get body(): string{
        return this._body;
    }

    /** Paramters Getter
     * 
     */
    get params(): Map<string, string>{
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
    set body(value:string|HTMLElement){
        if(value instanceof HTMLElement)
            this._body = value.outerHTML;
        else 
            this._body = String(value);
        this.done();
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
        this._title = String(value);
    }

    /** HTML Description Setter
     * 
     */
    set info(value: string){
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

    public reRoute(path: string){
        this._newRoute = path;
        this.done();
    }

    public done(){
        switch(typeof this._done){
            case "boolean":
                //Do Nothing
                break;

            case "function":
                this._done(this._newRoute);

            default:
                this._done = true;
        }
    }

    public onDone(callback:(s?:string)=>Promise<void>){
        if(typeof callback !== "function")
            throw new TypeError(`Unknown type '${typeof callback}' for done Event!`);

        if(typeof this._done === "boolean") {
            callback(this._newRoute);
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