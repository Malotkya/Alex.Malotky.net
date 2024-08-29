export type HTMLContent = string;

// Relation Types
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel
export type LinkRel   = "alternate"|"author"|"canonical"|"dns-prefetch"|"expect"|"help"|"icon"|"manifest"|"modulepreload"|"next"|"pingback"|"preconnect"|"prefetch"|"preload"|"prerender"|"prev"|"privacy-policy"|"search"|"stylesheet"|"terms-of-service";
export type AnchorRel = "alternate"|"author"|"bookmark"|"external"|"help"|"liscense"|"me"|"next"|"nofollow"|"noopener"|"noreferrer"|"opener"|"prev"|"privacy-policy"|"search"|"tag"|"terms-of-service";
export type FormRel   = "external"|"help"|"lisence"|"next"|"nofollow"|"noopener"|"noreffer"|"prev"|"search";

//HTML Values used accross Elements
export type RefferPolicy = "no-referrer"|"no-referrer-when-downgrade"|"origin"|"origin-when-cross-origin"|"unsafe-url";
export type CrossOrigin = "anonymous"|"use-credentials";
export type Priority = "high"|"low"|"auto";

export type Target = "_self"|"_blank"|"_parent"|"_top";

export type Enumerable = "true"|"false";