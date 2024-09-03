const LONG_MONTH = [
    "January", "Febuary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]; const SHORT_MONTH = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
]; const LONG_DAY = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Tursday", "Friday", "Saturday"
]; const SHORT_DAY = [
    "Sun", "Mon", "Tue", "Wend",
    "Thur", "Fri", "Sat"
];

/** Format Date Function
 * 
 * @param {Date|number|string} date 
 * @param {string} format  %Y   - year as 4 char string
 *                         %y   - year as 2 char string
 *                         %M-n - month as a number
 *                         %M   - month as a string
 *                         %m   - month as abreviated string
 *                         %D   - Date of month
 *                         %W   - day of week as string
 *                         %w   - day of week as abreviated string
 *                         $H   - hour as number 0-23
 *                         %h   - hour as number 1-12
 *                         %N   - minute as number
 *                         $S   - second as number
 *                         $s   - milisecond as number
 * 
 * @returns {string}
 */
export function formatDate(date:string|Date|number|undefined|null, format:string, ifNull?:string):string {
    if(date === null){
        if(typeof ifNull === "string"){
            return ifNull;
        }

        return "null";

    } else if(date === undefined){
        if(typeof ifNull === "string"){
            return ifNull;
        }

        return "undefined";

    }else if(typeof date !== "object") {
        date = new Date(date);
    }

    return format
        //Year
        .replace("%Y", date.getFullYear().toString())
        .replace("%y", date.getFullYear().toString().substring(2))

        //Month
        .replace("%M-n", date.getMonth().toString())
        .replace("%M", LONG_MONTH[date.getMonth()])
        .replace("%m", SHORT_MONTH[date.getMonth()])

        //Day/Date
        .replace("%D", date.getDate().toString())
        .replace("%W", LONG_DAY[date.getDay()])
        .replace("%w", SHORT_DAY[date.getDay()])

        //Time
        .replace("%H", date.getHours().toString())
        .replace("%h", (((date.getHours()-1)%12)+1).toString() )
        .replace("%N", date.getMinutes().toString())
        .replace("%S", date.getSeconds().toString())
        .replace("%s", date.getMilliseconds().toString());
}