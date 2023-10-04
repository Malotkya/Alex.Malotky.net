/** /Util/Memory.ts
 * 
 * Used to persist information in localStorage
 * 
 * @author Alex Malotky
 */

/** Cache Database Function
 * 
 * If timeout is a number, it will add that number as miliseconds to the timeout.
 * If timeout is a date, it will set that date as the timeout.
 * The timeout will default to tommorow if no timeout is given.
 * 
 * @param {string} key 
 * @param {Function} download 
 * @param {Date|number} timeout
 * @returns {any}
 */
export async function cache(key: string, download: Function, timeout?:Date|number):Promise<any>{
    let now = new Date(Date.now());
    let update:number = Number(window.localStorage.getItem(`${key}:update`));
    if(isNaN(update))
        update = 0;
    
    if(update < now.valueOf()){
        let newUpdate:Date = new Date(now.toLocaleDateString());
        if(typeof timeout === "undefined"){
            newUpdate.setDate(newUpdate.getDate()+1);
        } else if(typeof timeout === "number"){
            newUpdate = new Date(now.valueOf() + timeout);
        } else {
            newUpdate = timeout;
        }

        const data: any = await download();
        window.localStorage.setItem(`${key}:update`, String(newUpdate.valueOf()));
        window.localStorage.setItem(`${key}:data`, JSON.stringify(data));

        return data;
    }

    return JSON.parse(window.localStorage.getItem(`${key}:data`));
}