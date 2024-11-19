import { createElement as _, Content } from "zim-engine";
import { formatDate, MarkDown } from "@/util";
import { Buffer } from "node:buffer";

export default interface Post {
    id: number,
    title: string,
    content:string
}

export function validatePost(value:Dictionary<unknown>|Post):Post {
    const id = Number(value["id"]);
    const title = value["title"]? String(value["title"]): "Title Not Found!";
    const content = value["content"]? String(value["content"]): "";

    return {id, title, content};
}

export function EditPost(data?:Post): Content {
    const {id = 0, title = "", content = ""} = data || {};

    const buffer = Buffer.from(content).toString("base64");

    return _("form", {id: "blog-post-form", method: "post"},
        _("div", {class: "row"},
            _("div", {class: "post-title"},
                _("label", {for: "post-title"}, "Post Title:"),
                _("input", {id: "post-title", name: "title", value: title})
            ),

            _("p", {id: "post-date"}, formatDate(id, "%M %D, %Y", "")),
        ),
        
        _("mark-down-editor", {class: "row main", name: "content", data: buffer}),

        _("div", {class: "row"},
            _("button", {id: "submit", class: "btn"}, "Submit")
        )
    );
}

export function ViewPost(post:Post): Content {  
    return _("div", {class: "blog-post"},
        _("h2", {class: "post-title"}, post.title),
        _("p", formatDate(post.id, "%M %D, %Y")),
        _("div", {class: "markdown"}, MarkDown(post.content || ""))
    )
}