/** /Util/Memory.ts
 * 
 * Used to persist information in localStorage
 * 
 * @author Alex Malotky
 */

/** Cache Database Function
 * 
 * @param {string} key 
 * @param {Function} download 
 * @returns {any}
 */
export async function cache(key: string, download: Function):Promise<any>{
    const today:string = new Date().toLocaleDateString();

    //Update
    if(window.localStorage.getItem(`${key}:lastUpdate`) !== today){
        const data:any = await download();
        window.localStorage.setItem(`${key}:lastUpdate`, today);
        window.localStorage.setItem(`${key}:data`, JSON.stringify(data));
        return data;
    }

    return JSON.parse(window.localStorage.getItem(`${key}:data`));
}