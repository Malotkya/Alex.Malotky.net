/** Path.ts
 * 
 * @author Alex Malotky
 */

/** Path Class
 * 
 * Used to streamline the app finding its router.
 */
export default class Path extends Array{
    public _get: any;

    constructor(location: Location){
        super();

        this._get = {};
        for(let args of location.search.substring(1).split('&')){
            let buffer = decodeURIComponent(args).split("=");
            this._get[buffer[0]] = buffer[1];
        }

        for(let value of location.pathname.split("/")){
            if(value !== "")
                this.push(value);
        }
    }
}