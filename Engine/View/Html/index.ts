import {buildAttributesString, GlobalAttributes} from "./Attribute";
import Element, { createElement } from "./Element";
import { HTMLContent } from "./Types";
import Content, {compressContent} from "./Element/Content";
import Head, {HeadInit} from "./Head"

type HTMLElement = HTMLContent;
export default HTMLElement;
export type HTMLInit = GlobalAttributes;

export {createElement, compressContent};

function html(init:HTMLInit, head:HTMLElement, body:HTMLElement):HTMLElement {
    return "<html "+buildAttributesString(init)+">"+head+body+"</html>";
}

/**
 * 
 * @param children 
 * @returns 
 */
function body(children:Array<Element|Content>|Element|Content):HTMLElement {
    return "<body>"+compressContent(children)+"</body>";
}

/** Generate HTML Document
 * 
 * @param {Dictionary<string>} att 
 * @param {string} head 
 * @param {Array<Element|Content>} content 
 * @returns {string}
 */
export function HtmlDocument(att:HTMLInit, head:HeadInit, content:Array<Element|Content>|Element|Content):HTMLElement{
    return "<!DOCTYPE html>"+html(att, Head(head), body(content));
}