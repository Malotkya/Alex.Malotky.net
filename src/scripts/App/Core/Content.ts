import { sleep } from "..";
import {makeErrorMessage} from "./App_Base";

export interface execute{
    args: any,
    function: (args:any)=>Promise<void>|void
}

/** Content Class
 * 
 * Base Class for Routers
 * 
 * I will likely be changing this to be called middleware
 * 
 * @author Alex Malotky
 */
export default class Countent{
    private _title: string;
    private _description: string;
    protected _string: string;

    constructor(title: string, description:string){       
        if(typeof title === "string"){
            this._title = title;
        } else {
            throw new Error("Title must be a string!");
        }
        
        if(typeof description === "string"){
            this._description = description;
        } else {
            throw new Error("Description must be a string!");
        }
    }

    /** Set HTML string.
     * 
     * @param {string} html 
     */
    public set(html: string): void{
        if(typeof html !== "string")
            throw new Error("Html must be a string!");
            
        this._string = html;
    }

    /** Get HTML string.
     * 
     */
    get html():Promise<string>{
        return new Promise( (resolve, reject)=>{
            if(typeof this._string === "undefined")
                reject(new Error("No html given"));

            resolve(this._string);
        });
    }

    /** Get Javascript (does nothing)
     * 
     */
    get js():Promise<execute>{
        return new Promise((res,rej)=>res({
            args: {},
            function: ()=>undefined
        }));
    }

    /** Render to Element
     * 
     * Displays content after the transition out and executes javascript
     * after the transition in.  Will return any script elements that need
     * to be deleted on loading a new page.
     * 
     * @param {HTMLElement} target 
     * @returns {void}
     */
    public renderDisplay(target: HTMLElement): Promise<void>{
        return new Promise(async(resolve, reject)=>{
            let content:string;
            /** Content Time Out
             * 
             * Gives the content about half a second to render checking
             * event 5 milliseconds.
             * 
             * @returns {string}
             */
            function contentTimeOut(): Promise<string> {
                return new Promise(async(res,rej)=>{
                    let counter = 100;
                    while( (--counter > 0) ){
                        if(content)
                            res(content);
                        await sleep(5);
                    }
                        
                    rej(new Error("Content rendering has timed out!"))
                })
            }

            function handleError(error: any){
                target.ontransitionend = undefined;
                target.innerHTML = makeErrorMessage(error, 500);
                target.style.opacity ="";
                reject(error);
            }

            try {
                //Callback for when transition OUT is finished
                target.ontransitionend = async() => {

                    try {
                        //Set content to page.
                        target.innerHTML = await contentTimeOut();
                        let exe:execute = await this.js;

                        //Callback for when transiton IN is finished
                        target.ontransitionend = async() => {

                            target.ontransitionend = undefined;

                            //Run the javascript
                            resolve(await exe.function(exe.args));
                        }

                        //Start transition IN
                        target.style.opacity = "";
                    } catch(err: any){
                        handleError(err);
                    }
                    
                }

                //Start transition OUT
                target.style.opacity = "0";

                //Get HTML
                content = await this.html;
            }catch(err: any){
                handleError(err);
            }
        });
    }

    /** Getters
     */
    get title(): string{
        return this._title;
    }
    get description(): string{
        return this._description;
    }
}