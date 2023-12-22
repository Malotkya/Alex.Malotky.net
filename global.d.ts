declare module '*.html' {
    const content: any;
    export default content;
}

declare interface Window { 
    route: (href:string, body?:any)=>void; 
}