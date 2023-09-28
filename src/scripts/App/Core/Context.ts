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

    constructor(l: Location){
        this._port = l.port;
        this._host = l.hostname;
        this._path = l.pathname;
        this._body = "";
        this._params = {};
        this._gets = {};
        for(let args of location.search.substring(1).split('&')){
            let buffer = decodeURIComponent(args).split("=");
            this._gets[buffer[0]] = buffer[1];
        }
    }

    get port(): string{
        return this._port;
    }

    get host(): string{
        return this._host;
    }

    get path(): string{
        return this._path;
    }

    get body(): string{
        return this._body;
    }

    get params(): any{
        return {...this._gets, ...this._params};
    }

    get title(): string {
        return this._title;
    }

    get info(): string {
        return this._info;
    }

    set body(value:string|HTMLElement){
        if(value instanceof HTMLElement)
            this._body = value.outerHTML;
        else
            this._body = String(value);
    }

    set params(value: any){
        this._params = value;
    }

    set title(value: string){
        this._title = String(value);
    }

    set info(value: string){
        this._info = String(value);
    }
}