import { createElement as _, Content } from "zim-engine";
import { formatDate, MarkDown } from "@/util";
import Post from "./post";

export default function BlogResults(list:Array<Post>, edit?:boolean):Content {
    return [
        _("h1", "Blog Posts!"),
        edit? _("a", {class: "btn", href: "/Blog/Edit/New"}, "New Post"): null,
        _("ul", {id: "post-list"},
            list.map((p:Post)=>Result(p, edit))
        )
    ]
}

function Result(post:Post, edit?:boolean):Content {
    const {id, title, content} = post;

    const deleteButton = _("form",
        {
            method: "delete",
            action: "/Blog/Edit/Delete/"+id,
            onSubmit: (event:Event)=>{
                if(!confirm("Are you sure you want to delete post?")){
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        },
        _("button", {class: "btn"}, "Delete")
    );

    const editButton = _("a", {class: "btn", href: `/Blog/Edit/${id}`}, "Edit");

    return _("li", {id: id, class: "blog-post"},
        _("h2", {class: "post-title"}, title),
        _("p", formatDate(id, "%M %D, %Y")),
        edit? _("div", {class: "post-buttons"}, editButton, deleteButton)
            : _("div", {class: "mark-down"}, MarkDown(content))
    );
}