/** /Engine/View/Html/Attributes/Map/TableDataCell
* 
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
* 
* @author Alex Malotky
*/
import {GlobalAttributes, SpaceSeperatedList} from "..";

export default interface TableDataCellAttributes extends GlobalAttributes {
    colspan?: number,
    headers?: SpaceSeperatedList,
    rowspan?: number
}