declare module '*.html' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const content: any;
    export default content;
}

interface StringIndex {
    [index:string]:string
}
declare type BodyData = StringIndex|FormData|Map<string, string>

declare interface Window { 
    route: (href:string, body?:BodyData)=>void; 
}

declare interface HTMLElement {
    readyCallback():void;
}