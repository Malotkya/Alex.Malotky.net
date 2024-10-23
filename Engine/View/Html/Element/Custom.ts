interface CustomElementOptions {
    extends?:string
}

export default class CustomElementRegistry {
    #map:Map<string, string|null>;

    constructor(){
        this.#map = new Map();
    }

    define(name:string, constructor:CustomElementConstructor, options:CustomElementOptions = {}) {
        if(this.#map.has(name))
            throw new Error(`'${name}' already exists in the custom element registry!`);

        this.#map.set(name, options.extends? options.extends: null);
    }

    extends(name:string):string|null {
        return this.#map.get(name) || null;
    }
}