declare module '*.md' {
    const content: string;
    export default content;
}

declare module '*.scss' {
    const content: string;
    export default content;
}

interface Dictionary<t> {
    [index:string]:t
}

type Optional<T> = T|null|undefined

interface Env {
    ASSETS: Fetcher
    DB: D1Database
}

interface User {
    username:string,
    password:string
}

declare const VERSION = "#.#.#.?"