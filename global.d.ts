declare module '*.html' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const content: any;
    export default content;
}

interface Dictionary<t> {
    [index:string]:t
}

interface Env {
    ASSETS: Fetcher
    DB: D1Database
}

interface User {
    username:string,
    password:string
}