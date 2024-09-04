/** /Engine/View/Html/Attributes/Map/Data
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
 * 
 * @author Alex Malotky
 */
import {GlobalAttributes, Value} from "..";

export default interface DataAttributes extends GlobalAttributes {
    value?:Value
}