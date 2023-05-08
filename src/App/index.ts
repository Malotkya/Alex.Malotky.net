import App_Base from "./Core/App_Base";
import NavBar from "./Core/NavBar";
import Router from "./Router";

export default class App extends App_Base {
    private _navbar:NavBar;

    constructor(){
        super(window);
        this._navbar = new NavBar("#top-nav-menu");

        this._navbar.routeEvent(event=>this._route);
    }

    public add(router: Router,addToNav?:boolean){
        this._routes.push(router);

        if(addToNav)
            this._navbar.add(router);

    }
}

export function render(filename: string, args?: any): Promise<string>{
    return new Promise((resolve, reject)=>{
        if(args)
            console.warn("args is not currently implemented in render!");

        fetch("templates/" + filename).then(response=>{
            if(!response.ok)
                reject( new Error("File not Found!"));
    
            response.text().then(resolve).catch(reject);
        }).catch(reject);
    })
}

export function execute(filename: string): Promise<HTMLElement>{
    return new Promise((resolve, reject)=>{
        const script = document.createElement("script");
        document.body.appendChild(script);
        script.onload = () => {
            resolve(script)
        };
        script.onerror = reject;
        script.async = true;
        script.src = "templates/" + filename;
    })
}