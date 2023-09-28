/** App/Core/Context.ts
 * 
 * @author Alex Malotky
 */

export type Executable = ()=>Promise<void>|void;

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
    private _gets: any;
    private _params: any;

    //Information gnerated by users.
    private _body: string;
    private _title: string;
    private _info: string;
    private _execute: Executable;

    /** Constructor
     * 
     * @param {Location} l 
     */
    constructor(l: Location){
        this._port = l.port;
        this._host = l.hostname;
        this._path = l.pathname;
        this._body = "";
        this._params = {};
        this._gets = {};
        this._execute = ()=>undefined;
        for(let args of location.search.substring(1).split('&')){
            let buffer = decodeURIComponent(args).split("=");
            this._gets[buffer[0]] = buffer[1];
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
    get params(): any{
        return {...this._gets, ...this._params};
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
    }

    /** Paramters Setter
     * 
     */
    set params(value: any){
        this._params = value;
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

    set execute(value: Executable){
        this._execute = value;
    }

    get execute(){
        return this._execute;
    }
}