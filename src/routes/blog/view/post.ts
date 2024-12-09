/** /routes/blog/view/post
 * 
 * @author Alex Malotky
 */
import { createElement as _, Content } from "zim-engine";
import { formatDate, MarkDown } from "@/util";
import { Buffer } from "node:buffer";
import Post from "../data/post";

/** Edit Post
 * @param {Post} post 
 * @returns {Content}
 */
export function EditPost(post?:Post): Content {
    const {id = 0, title = "", content = ""} = post || {};

    const data = Buffer.from(content).toString("base64");

    return _("form", {id: "blog-post-form", method: "post"},
        _("div", {class: "row"},
            _("div", {class: "post-title"},
                _("label", {for: "post-title"}, "Post Title:"),
                _("input", {id: "post-title", name: "title", value: title})
            ),

            _("p", {id: "post-date"}, formatDate(id, "%M %D, %Y", "")),
        ),
        
        _("mark-down-editor", {class: "row main", name: "content", data}),

        _("div", {class: "row"},
            _("button", {id: "submit", class: "btn"}, "Submit")
        )
    );
}

/** View Post
 * 
 * @param {Post} post 
 * @returns {Content}
 */
export function ViewPost(post:Post): Content {  
    return _("div", {class: "blog-post"},
        _("h2", {class: "post-title"}, post.title),
        _("p", formatDate(post.id, "%M %D, %Y")),
        _("div", {class: "markdown"}, MarkDown(post.content || ""))
    )
}