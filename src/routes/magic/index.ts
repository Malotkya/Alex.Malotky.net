/** /Router/Magic
 * 
 * @author Alex Malotky
 */
import {Router} from "Engine";
import { createContent as _ } from "Engine";

const Magic = new Router("/Magic");

const style = _("style", require("./style.scss"));

Magic.all((ctx)=>{
    ctx.render({
        body: [
            style,
            _("h1", "MTG Test"),
            _("card-input")
        ]
    })
});

export default Magic;