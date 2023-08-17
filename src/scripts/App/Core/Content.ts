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
            if(this._string){
                target.innerHTML = this._string;
                resolve();
            }

            reject(new Error("No content to be rendered!"))
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