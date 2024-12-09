/** /routes/pokemon/games
 * 
 * @author Alex Malotky
 */
import { Game } from "../types";

/** Alpha Sapphire Content
 * 
 */
import { yellow } from "./yellow";
import { crystal } from "./crystal";
import { ruby } from "./ruby";
import { platinum } from "./platinum";
import { white } from "./white";
import { x } from "./x"
import { sun } from "./sun";
import { eevee } from "./eevee";
import { diamond } from "./brilliantDiamond";
import { red } from "./fireRed";
import { gold } from "./heartGold";
import { sapphire } from "./alphaSapphire";
import {black} from "./black2";
import {shield} from "./shield";
import {violet} from "./violet";

//Default/Latest Game
export const DEFAULT_INIT = "violet";

//Export All Games
export default {
    yellow, red, eevee,
    crystal, gold,
    ruby, sapphire,
    platinum, diamond,
    white, black,
    x,
    sun,
    shield,
    violet
};