import { fetchShard } from "@/util/Scryfall";
import { openDB as initDB, IDBPDatabase } from 'idb';
import { createElement as _ } from "@/util/Element";

const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);
const WEEK = 604800000;

export function openDB():Promise<IDBPDatabase> {
    return initDB("Scryfall", undefined, {
        upgrade: (db)=>{
            db.createObjectStore("shard");
        }
    });
}

export async function checkCache(db:IDBPDatabase, shard:string):Promise<string|null> {
    const tx = db.transaction('shard', 'readonly');
    const store = tx.objectStore('shard');
    const result = await store.get(shard) as {value:string, ttl:number}|undefined;
    await tx.done;

    if(result){
        if(result.ttl < Date.now())
            return null;

        return result.value;
    }

    return null;
}

export async function setCache(db:IDBPDatabase, shard:string, value:string):Promise<void> {
    const tx = db.transaction('shard', 'readwrite');
    const store = tx.objectStore('shard');
    
    await store.add({
        ttl: Date.now() + WEEK,
        value
    }, shard);

    await tx.done;
}


export default class CacheDownloader extends HTMLElement {
    async connectedCallback(){
        const header = _("h2", "Cache Downloading...");
        this.appendChild(header);
        const current = _("p");
        this.appendChild(current);

        const db = await openDB();

        /** Downlaod Shard to Cahce
         * 
         * @param {string} char 
         */
        const download = async(char:string) => {
            current.innerText = `Downloading '${char}'!`;

            try {
                const file = await fetchShard(char);
                await setCache(db, char, file);
            } catch (e){
                this.appendChild(_("p", {class: "error"}, `There was a problem with '${char}'!`));
                console.error(e);
            }
        }

        /** 
         * 
         */

        for(let code=A; code<=Z; code++){
            const char = String.fromCharCode(code);
            current.innerText = `Checking '${char}'!`;

            if((await checkCache(db, char)) === null) {
                await download(char);
            }
        }

        current.innerText = `Checking '_'!`;
        if((await checkCache(db, "_")) === null) {
            await download("_");
        }

        this.removeChild(current);
        header.innerText = "Cache Up To Date!";
    }
}

customElements.define("cache-downloader", CacheDownloader)