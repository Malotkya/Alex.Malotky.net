import Content, {execute} from "./Core/Content"



/** Router Class
 * 
 * @author Alex Malotky
 */
export default class Router extends Content{
    private _route: string;
    private _render: (args:any)=>Promise<string>|string;
    private _load: ()=>Promise<any>|any;
    private _connected: ()=>Promise<any>|any;
    private _ready: (args: any)=>Promise<void>|void

    constructor(route: string, title: string, description:string){
        super(title, description);

        if(typeof route === "string"){
            this._route = route;
        } else {
            throw new Error("Title must be a string!");
        }

        this._ready = ()=>undefined;
    }

    

    /** On Load Event Callback
     * 
     * This event is called when the page loads before rendering html.
     * 
     * @param {Function} callback 
     */
    public onLoad(callback:()=>Promise<any>|any): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._load = callback;
    }

    /** On Render Event Callback
     * 
     * This event is called when the page is rendering html.
     * 
     * @param {Function} callback 
     */
    public onRender(callback:(args:any)=>Promise<string>|string): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._render = callback;
    }

    /** On Connected Event Callback
     * 
     * This event is called once the html is rendered.
     * 
     * @param {Function} callback 
     */
    public onConnected(callback:()=>Promise<any>|any): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._connected = callback;
    }

    /** On Ready Event Callback
     * 
     * This event is called once the html has been drawn to the display.
     * 
     * @param {Function} callback 
     */
    public onReady(callback:(args:any)=>Promise<void>|void): void{
        if(typeof callback !== "function")
            throw new Error("Callback must be a function!");

        this._ready = callback;
    }

    /** Get HTML
     * 
     */
    get html(): Promise<string>{
        return new Promise(async(res,rej)=>{
            try {
                let args: any;
                if(this._load){
                    args = await this._load();
                }

                if(this._render){
                    res(await this._render(args));
                } else if(this._string){
                    res(this._string);
                } else {
                    rej("No HTML givin!");
                }

            } catch(err: any){
                rej(err)
            }
        })
    }

    /** Get Javascript
     * 
     */
    get js(): Promise<execute>{
        return new Promise(async(res,rej)=>{
            try{
                let args: any;
                if(this._connected)
                    args = await this._connected();

                res({
                    args: args,
                    function: this._ready
                });
            } catch(err: any){
                rej(err);
            }
        });
    }

    /** Checks if the route matches the url
     * 
     * May be changing to allow variables within the url
     * 
     * @param {string} url 
     * @returns {boolean}
     */
    public matches(url: string): boolean{
        if(typeof url !== "string"){
            throw new Error("Title must be a string!");
        }

        return url === this._route;
    }

    /** Get Hypertext Reference
     * 
     */
    get href(){
        return this._route;
    }
}