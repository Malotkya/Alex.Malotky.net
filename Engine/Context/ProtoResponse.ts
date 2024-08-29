import {Transform, TransformCallback} from "node:stream";
import {Buffer} from "node:buffer";
import { sleep } from "../Util";

export default class ProtoResponse extends Transform{
    public status:number;
    public headers:Map<string, string>;
    #body: Array<Uint8Array>;

    private working:boolean;

    constructor(){
        super();

        this.status = 200;
        this.headers = new Map();
        this.#body = [];
        this.working = false;
    }

    _transform(data:Buffer|string, encode:string, callback:TransformCallback){
        this.working = true;
        if(data instanceof Buffer)
            this.#body.push(data);
        else
            this.text(data);
        callback();
    }

    _flush(callback: TransformCallback): void {
        this.working = false;
        callback()
    }

    text(string:any):void {
        this.#body.push(new TextEncoder().encode(String(string)))
    }

    commited(){
        if(this.working)
            return true;

        return this.#body.length > 0;
    }

    async flush():Promise<Response> {
        while(this.working)
            sleep();

        const headers:Record<string, string> = {};
        for(const [name, value] of this.headers.entries())
            headers[name] = value;

        return new Response(new Blob(this.#body), {
            status: this.status,
            headers: headers
        });
    }
}