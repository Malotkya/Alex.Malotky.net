import ProtoResponse from "./Context/ProtoResponse"

export type AuthGet = (request:Request) => Promise<User|null>|User|null
export type AuthSet = (response:ProtoResponse, user:User|null) => Promise<void>|void;

export default class Authorization{
    private _getter:AuthGet|undefined;
    private _setter:AuthSet|undefined;

    set(value:AuthSet):void
    set():AuthSet
    set():AuthSet|void{
        if(arguments.length === 0){
            return this._setter;
        }

        if(typeof arguments[0] !== "function")
            throw new TypeError("Authentication Setter must be a function!");

        this._setter = arguments[0];
    }

    get(value:AuthGet):void
    get():AuthGet
    get():AuthGet|void{
        if(arguments.length === 0){
            return this._getter;
        }

        if(typeof arguments[0] !== "function")
            throw new TypeError("Authentication Setter must be a function!");

        this._getter = arguments[0];
    }
}