/** /Util/Cache
 * 
 * @author Alex Malotky
 */
import { openDB, IDBPDatabase, deleteDB, IDBPTransaction } from 'idb';
import {sleep} from ".";

const INDEX_DATABASE_NAME = "Cache";

/** Cahce Store Item
 * 
 */
interface CacheStoreItem{
    value:string
    ttl:number
}

type CacheDatabse = IDBPDatabase<CacheStoreItem>
type CacheTransaction<M extends IDBTransactionMode> = IDBPTransaction<CacheStoreItem, [string], M>

/** Create Object Store Inside Cache Database
 * 
 * @param {string} name 
 * @returns {Promise<IDBPDatabase>}
 */
async function createObjectStore(name:string):Promise<CacheDatabse> {
    const db = (await openDB(INDEX_DATABASE_NAME)) as CacheDatabse;

    if(db.objectStoreNames.contains(name)) {
        return db;
    }

    let version = db.objectStoreNames.length + 1;
    if(version <= db.version) {
        db.close();
        console.warn("Cache has been corupted, and will be cleared!");
        await deleteDB(INDEX_DATABASE_NAME);
        version = 1;
    } else {
        db.close();
    }
    
    const update = (await openDB(INDEX_DATABASE_NAME, version, {
        upgrade: (db) => {
            db.createObjectStore(name);
        }
    })) as CacheDatabse;

    return update;
}

/** Index Database Cache
 * 
 * Mimics localStorage but allows for much larger items to be stored.
 * Added optional TTL
 *      Negative TTL = never expires.
 * 
 */
export default class Cache{
    private _conn:CacheDatabse|null|undefined;
    private _name:string;
    private _ttl:number;

    /** Create Cache Store
     * 
     * @param {string} name
     * @param {number} defaultTtl = Week
     */
    constructor(name:string, defaultTtl:number = -1){
        this._name = name;
        this._ttl = defaultTtl;

        createObjectStore(name)
            .then(db=>{
                this._conn = db; 
            }).catch(e=>{
                console.error(e);
                this._conn = null;
            });
    }

    /** Connection Ready
     * 
     * @returns {Promise<IDBPTransaction>}
     */
    private async _ready<M extends IDBTransactionMode>(mode:M):Promise<CacheTransaction<M>> {
        while(this._conn === undefined)
            await sleep();

        if(this._conn === null)
            throw new Error("Not connected to the Database!");

        return this._conn.transaction(this._name, mode);
    }

    /** Validate Cahce Store Item
     * 
     * @param {CacheStoreItem|undefined} item
     * @returns {{result:CacheStoreItem|null, error:string|undefined}}
     */
    private validate(item:CacheStoreItem|undefined):{result:CacheStoreItem|null, error?:string} {
        let error:string|undefined;
        const addError = (value:string) => {
            if(error){
                error += "\n"+value
            } else {
                error = value;
            }
        }

        if(item){
            let {value, ttl} = item;
            ttl = Number(ttl);

            if(isNaN(ttl)) {
                ttl = 0;
                addError("Ttl must be a number!");
            }

            if(typeof value !== "string") {
                value = String(value);
                addError("Value must be a string!");
            }

            return {
                result: {ttl, value},
                error
            };
        }

        return { result: null };
    }

    /** Set Cache Value
     * 
     * @param {string} key 
     * @param {string} value 
     * @param {number} ttl = defaultTtl
     */
    async set(key:string, value:string, ttl:number = this._ttl):Promise<void> {
        const tx = await this._ready("readwrite");

        ttl += Date.now();

        await tx.store.add({ttl,value}, key);
        await tx.done;
    }

    /** Remove Cache Value
     * 
     * @param {string} key 
     */
    async remove(key:string):Promise<void> {
        const tx = await this._ready("readwrite");

        await tx.store.delete(key);
        await tx.done;
    }

    /** Get Cache Value
     * 
     * @param {string} key
     * @returns {Promise<string|null>}
     */
    async get(key:string):Promise<string|null> {
        const tx = await this._ready("readwrite");

        const {result, error} = this.validate(await tx.store.get(key));

        if(result){
            const {ttl, value} = result;

            if(error){
                console.error(`Cache Store Item '${key}' was Corupted!\n${error}`);
                await tx.store.add(result, key);
            }

            //Close transactiona after store might be updated.
            await tx.done;

            if(ttl >= 0 && ttl < Date.now()) {
                return null;
            }

            return value;
        } else {
            //End Transaction Still
            await tx.done;
        }

        return null;
    }
    
    /** Clear Cache
     * 
     */
    async clear():Promise<void> {
        const tx = await this._ready("readwrite");

        await tx.store.clear();
        await tx.done;
    }

    /** Close Connection
     * 
     */
    async close(){
        this._conn?.close();
        this._conn = null;
    }
}