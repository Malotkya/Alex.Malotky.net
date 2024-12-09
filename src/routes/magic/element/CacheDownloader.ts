/** /routes/magic/element/CacheDownloader
 * 
 * @author Alex Malotky
 */
import { fetchShard, CACHE_NAME, CACHE_TTL } from "@/util/Scryfall";
import Cache from "@/util/Cache";
import { createElement as _ } from "@/util/Element";

const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);

/** Cache Downloader Element
 * 
 */
export default class CacheDownloader extends HTMLElement {
    async connectedCallback(){
        const header = _("h2", "Cache Downloading...");
        this.appendChild(header);
        const current = _("p");
        this.appendChild(current);

        const cache = new Cache(CACHE_NAME, CACHE_TTL);

        /** Downlaod Shard to Cahce
         * 
         * @param {string} char 
         */
        const download = async(char:string) => {
            current.innerText = `Downloading '${char}'!`;

            try {
                const file = await fetchShard(char);
                await cache.set(char, file)
            } catch (e){
                this.appendChild(_("p", {class: "error"}, `There was a problem with '${char}'!`));
                console.error(e);
            }
        }

        for(let code=A; code<=Z; code++){
            const char = String.fromCharCode(code);
            current.innerText = `Checking '${char}'!`;

            if((await cache.get(char)) === null) {
                await download(char);
            }
        }

        current.innerText = `Checking '_'!`;
        if((await cache.get("_")) === null) {
            await download("_");
        }

        this.removeChild(current);
        header.innerText = "Cache Up To Date!";

        await cache.close();
    }
}

customElements.define("cache-downloader", CacheDownloader)