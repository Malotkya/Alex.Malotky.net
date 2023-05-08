import Content from "./Core/Content"

export default class Router extends Content{
    private _route: string;
    private _render: ()=>Promise<string>;
    private _execute: ()=>Promise<any>;

    constructor(route: string, title: string, description:string){
        super(title, description);

        if(typeof route === "string"){
            this._route = route;
        } else {
            throw new Error("Title must be a string!");
        }

        this._execute = () => new Promise((res, rej)=> res(undefined));
    }

    onLoad(callback:()=>Promise<string>){
        this._render = callback;
    }

    onConnected(callback:()=>Promise<any>){
        this._execute = callback;
    }

    get html(): Promise<string>{
        return new Promise( (resolve, reject)=>{
            if(this._render)
                this._render().then(resolve).catch(reject);
            else
                resolve(this._string);
        });
    }

    get js(): Promise<HTMLElement>{
        return this._execute();
    }

    matches(route: string){
        if(typeof route !== "string"){
            throw new Error("Title must be a string!");
        }

        return route === this._route;
    }

    get href(){
        return this._route;
    }
}