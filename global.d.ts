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
declare type BodyData = Dictionary<string>|FormData|Map<string, string>

declare interface Window { 
    route: (href:string, body?:BodyData)=>void; 
}

declare interface HTMLElement {
    readyCallback():void;
}