import { LinkRel, RefferPolicy, CrossOrigin, Priority, Target, HTMLContent } from "./Types"
import { buildAttributesString } from "./Attribute";

export type TitleInit = string;
/** Title Tag
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
 * @param {TitleInit} value 
 * @returns {HTMLContent}
 */
export function title(value:TitleInit):HTMLContent {
    return "<title>"+value+"</title>";
}

export type TitleUpdate = string;
/** Update Title
 * 
 */
export function updateTitle(init:TitleInit = "", update:TitleUpdate = ""):TitleUpdate {
    if(init){
        return init+" | "+update;
    }

    return update;
}

export interface BaseInit {
    href?:string,
    target?:Target
}
/** Base Tag
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
 * @param {BaseInit} value 
 * @returns {HTMLContent}
 */
function base(value:BaseInit):HTMLContent {
    if(value.href === undefined && value.target === undefined){
        throw new TypeError("Base must have at least a href or target value!");
    }
    const href = value.href? `href="${value.href} "`: "";
    const target = value.target? `target="${value.target} "`: "";

    return "<base "+target+href+"/>";
}


export interface LinkInit {
    as?:"audio"|"document"|"embed"|"fetch"|"font"|"font"|"image"|"object"|"script"|"style"|"track"|"video"|"worker",
    blocking?:boolean,
    corssorigin?:CrossOrigin,
    disabled?:boolean,
    fetchpriority: Priority,
    href: string,
    hreflang?:string,
    imagesizes?:string,
    imagesrcset?:string,
    integrity?:string,
    media?:string,
    refferpolicy: RefferPolicy,
    rel?: LinkRel,
    sizes?:string,
    title?:string,
    type?:string,
    target?:string,
    charset?:string,
    rev?:string,
    name?:string /* unofficial */
}
/** Link Tag
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
 * @param {LinkInit} value
 * @returns {HTMLContent}
 */
function link(value:LinkInit):HTMLContent {
    const attributes:string = buildAttributesString(value);

    if(attributes === "")
        throw new Error("Empty Attributes for Link!");

    return "<link "+attributes+"/>";
}

export interface StyleInit {
    blocking?:boolean,
    media?:string,
    nonce?:string,
    title?:string,
    type?:"text/css",
    value:string,
    name?:string /* unofficial */
}
/** Style Tag
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style
 * @param {StyleInit} value
 * @returns {HTMLContent}
 */
function style(value:StyleInit):HTMLContent {
    if(value.value === undefined)
        throw new Error("Style must have a content value!");

    const content = value.value;
    value.value = "";

    return "<style "+buildAttributesString(value)+">"+content+"</style>";
}

export interface ScriptInit {
    async?:boolean,
    attributeionsrc?:string|boolean,
    blocking?:"render"|boolean,
    corssorigin?:CrossOrigin,
    defer?:boolean,
    fetchpriority?: Priority,
    integrity?:string,
    nomodule?:boolean,
    nonce?:string,
    refferpolicy?: RefferPolicy,
    src?:string,
    type?: "importmap"|"module"|"specultaionrules",
    charset?:"utf-8",
    language?:string,
    value?:string
    name?:string /* unofficial */
}
/** Script Tag
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
 * @param {ScriptInit} value
 * @returns {HTMLContent}
 */
function script(value:ScriptInit):HTMLContent {
    if(value.value === undefined && value.src === undefined)
        throw new Error("Script must have a content or a source!");

    const content = value.value;
    value.value = "";

    return "<script "+buildAttributesString(value)+">"+content+"</script>";
}

export interface MetaInit {
    charset?:"utf-8",
    content?:string,
    httpEquiv?:"content-security-policy"|"content-type"|"default-style"|"x-ua-compatibl"|"refresh",
    name?:string
}
/** Meta Tag
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
 * @param {MetaInit} value
 * @returns {HTMLContent}
 */
function meta(value:MetaInit):HTMLContent {
    if(value.charset){
        return "<meta charset=\"utf-8\" />"
    }

    if(value.content === undefined)
        throw new Error("Meta must have content!");
    const content = "content=\""+value.content+"\" ";

    if(value.name !== undefined && value.httpEquiv !== undefined)
        throw new Error("Meta should only have name or http-equiv!");
    let name:string;
    if(value.name){
        name = "name=\""+value.name+"\" ";
    } else if(value.httpEquiv) {
        name = "http-equiv=\""+value.httpEquiv+"\" ";
    } else {
        throw new Error("Meta must have a name or http-equiv!");
    }

    return "<meta "+name+content+"/>";
}

export type MetaUpdate = string;
/** Update Meta Tags
 * 
 */
function updateMeta(init:Array<MetaInit> = [], update:Dictionary<MetaUpdate> = {}):Array<MetaInit> {
    const output:Array<MetaInit> = JSON.parse(JSON.stringify(init));
    const list = Object.getOwnPropertyNames(update);

    for(let i=0; i<output.length; i++){
        if(output[i].name){
            const index = list.indexOf(output[i].name!);

            if(index >= 0){
                output[i].content = update[output[i].name!];
                list.splice(index, 1);
            }
        }
    }

    for(let name of list){
        output.push({
            content: update[name],
            name
        });
    }

    return output;
}


export interface HeadInit {
    base?: BaseInit,
    title?:TitleInit,
    meta?:Array<MetaInit>,
    links?:Array<LinkInit>,
    styles?:Array<StyleInit>,
    scripts?:Array<ScriptInit>
}
/** Head Tag
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
 * @param {HeadInit} init
 * @returns {HTMLContent}
 */
export default function Head(init:HeadInit):HTMLContent {
    let content:string = "";

    if(init.base){
        content += base(init.base);
    }

    if(init.title){
        content += title(init.title);
    }

    for(const i of init.meta || []){
        content += meta(i);
    }

    for(const i of init.links || []){
        content += link(i);
    }

    for(const i of init.styles || []){
        content += style(i);
    }

    for(const i of init.scripts || []){
        content += script(i);
    }

    return "<head>"+content+"</head>";
}

/** Merge Init with Update
 * 
 * @param {I} init 
 * @param {U} update 
 * @returns {I}
 */
function merge<U, I extends U&{name?:string}>(init:Array<I> = [], update:Dictionary<U> = {}):Array<I> {
    const output: Array<I> = [];
    const list = Object.getOwnPropertyNames(update);

    for(let original of init){
        if(original.name){
            const index = list.indexOf(original.name);
            if(index >= 0){
                output.push(update[original.name]);
                list.splice(index, 0);
            } else {
                const obj = JSON.parse(JSON.stringify(original))
                delete obj.name;
                output.push(obj);
            }
        } else {
            output.push(JSON.parse(JSON.stringify(original)));
        }
    }

    for(let name of list){
        output.push({
            ...update[name],
        })
    }

    return output;
}

export interface LinkUpdate {
    disabled?:boolean,
    href: string,
    imagesrcset?:string,
    integrity?:string,
    media?:string,
    refferpolicy: RefferPolicy,
    sizes?:string,
    title?:string,
}
export interface StyleUpdate {
    media?:string,
    value:string,
}
export interface ScriptUpdate {
    async?:boolean,
    nomodule?:boolean,
    src?:string,
    type?: "importmap"|"module"|"specultaionrules",
    value?:string
}

export interface HeadUpdate {
    title?:TitleInit,
    links?:Dictionary<LinkUpdate>,
    meta?:Dictionary<MetaUpdate>,
    styles?:Dictionary<StyleUpdate>,
    scripts?:Dictionary<ScriptUpdate>
}
/** Merge Init With Update
 * 
 * @param {HeadInit} init 
 * @param {HeadUpdate} update 
 * @returns {HeadInit}
 */
export function mergeInitWithUpdate(init:HeadInit, update:HeadUpdate = {}):HeadInit{
    return {
        base: init.base,
        title: updateTitle(init.title, update.title),
        meta: updateMeta(init.meta, update.meta),
        links: merge(init.links, update.links),
        styles: merge(init.styles, update.styles),
        scripts: merge(init.scripts, update.scripts)
    };
}