import { toString } from "../Function";

type Content = string|number|boolean|null|undefined|Function|Array<Content>;
export default Content;

/** Compress Content
 * 
 * @param {Content} content 
 * @returns {string}
 */
export function compressContent(content:Content):string {
    if(Array.isArray(content)){
        let buffer:string = "";
        for(let child of content)
            buffer += compressContent(child);
        return buffer;
    } else if(content === null || content === undefined){
        return "";
    } else {
        switch (typeof content){
            case "function":
                return toString(content);

            case "object":
                return JSON.stringify(content);

            case "string":
                return content;

            default:
                return String(content);
        }
        
    }
}