import Path from "./Path";

interface Layer {
    key: boolean,
    value: string
}

export default class Route {
    private _layers: Array<Layer>;
    private _get: any;
    private _keys: any;
    private _overflow: boolean;

    constructor(path: string){
        this._keys = {};
        if(typeof path !== "string")
            throw new Error("Path must be a string!");

        this._layers = [];
        const buffer: Array<string> = path.split("/");
        for(let index=0; index < buffer.length; index++){

            if(buffer[index] !== "") {
                let value:string = buffer[index];

                if(value[0] === ":") {
                    this._layers.push({
                        key: true,
                        value: value.substring(1)
                    });
                } else if(value[0] === "*"){
                    this._overflow = true;
                    index = buffer.length;
                } else {
                    this._layers.push({
                        key: false,
                        value: value
                    });
                }
            }
        }
    }

    public match(path: Path):boolean{
        this._get = path._get;

        if(path.length > this._layers.length) {
            if(this._overflow){
                this._keys["args"] = path.splice(this._layers.length);
            } else {
                return false;
            }
        }

        for(let index = 0; index < this._layers.length; index++){
            let layer = this._layers[index];
            let value = path[index];

            if(typeof value === "undefined"){
                if(!layer.key)
                    return false;
            } else {
                if(layer.key){
                    this._keys[layer.value] = value;
                } else if(layer.value !== value){
                    return false;
                }
            }
        }

        return true;
    }

    public get args(){
        return {...this._keys, ...this._get};
    }

    public get value(){
        return this._layers.map((layer:Layer)=>{
            if(layer.key)
                return undefined;
            return layer.value
        }).join("/");
    }
}