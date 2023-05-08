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

    set(html: string){
        if(typeof html === "string"){
            this._string = html;
        } else {
            throw new Error("Html must be a string!");
        }
    }

    get html():Promise<string>{
        return new Promise( (resolve, reject)=>{
            if(typeof this._string === "undefined")
                reject(new Error("No html given"));

            resolve(this._string);
        });
    }

    get js(){
        return new Promise((res,rej)=>res(undefined));
    }

    get title(){
        return this._title;
    }

    get description(){
        return this._description;
    }
}