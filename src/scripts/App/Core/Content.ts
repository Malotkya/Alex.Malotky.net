import { sleep } from "..";

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
    get js():Promise<any>{
        return new Promise((res,rej)=>res(undefined));
    }

    /** Render to Element
     * 
     * Displays content after the transition out and executes javascript
     * after the transition in.  Will return any script elements that need
     * to be deleted on loading a new page.
     * 
     * @param {HTMLElement} target 
     * @returns {any}
     */
    public renderDisplay(target: HTMLElement): Promise<any>{
        let content: string;

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

        return new Promise((resolve, reject)=>{

            //Render the HTML
            this.html.then(value=>{
                content = value;
            }).catch(reject);

            //Callback for when transition OUT is finished
            target.ontransitionend = () => {

                //Set content to page.
                contentTimeOut().then( (content:string) => {
                    target.innerHTML = content;

                    //Callback for when transiton IN is finished
                    target.ontransitionend = () => {

                        //Run the javascript
                        this.js.then((result:any)=>{

                            //Return with results
                            resolve(result);

                        }).catch(reject);
                    }

                    //Start transition IN
                    target.style.opacity = "";
                }).catch(reject);
                
            }

            //Start transition OUT
            target.style.opacity = "0";
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