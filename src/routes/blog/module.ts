import { createElement as _, Content } from "../../util/Elements";
import { formatDate } from "../../util/FormateDate";
import EditPost, {Post} from "./content/EditPost";

interface expectedArgs {
    edit: boolean,
    item: Post|Array<Post>
}

export default function Blog(args:expectedArgs):Content {

    if(Array.isArray(args.item)) {
        return [
            _("style", require("./style.scss")),
            ListResults(args.item, args.edit)
        ];
    }

    if(args.edit) {

        return [
            _("style", require("./style.scss")),
            _("h1", "Blog Post Editor!"),
            _("a", {href: "/Blog/Edit", class:"btn", clear:"true"}, "Back"),
            _("a", {href: `/Blog/${args.item.id}`, id: "btnView", class: "btn", clear:"true"}, "View"),
            EditPost(args.item)
        ];
    }

    const {
        id = "undefined",
        title = "Not Found!",
        date,
        content = ""
    } = args.item;
        
    return [
        _("style", require("./style.scss")),
        _("article", {id: id, class: "blog-post"},
            _("h1", {id: "post-title"}, title),
            _("p", {id: "post-date"}, formatDate(date, "%M %D, %Y")),
            _("mark-down", {id: "post-content"}, content)
        )
    ]
}

function ListResults(list:Array<Post>, edit:boolean):Content {
    return [
        _("h1", "Blog Posts!"),
        edit? _("a", {class: "btn", href: "/Blog/Edit/New"}, "New Post"): null,
        _("ul", {id: "post-list"},
            list.map((p:Post)=>Result(p, edit))
        )
    ]
}

function Result(post:Post, edit:boolean):Content {
    const {
        id = "undefined",
        title = "Title Not Found",
        date,
        content = ""
    } = post;

    const deleteButton = _("button", {class: "btn"}, "Delete");
    deleteButton.addEventListener("click", (event:Event)=>{
        event.preventDefault();
        event.stopPropagation();
        if( confirm(`Are you sure you want to delete post?\n''${title}`)) {
            window.route("/Blog/Edit/Delete/" + id);
        }
    });

    const editButton = _("button", {class: "btn"}, "Edit");
    editButton.addEventListener("click", (event:Event)=>{
        event.preventDefault();
        event.stopPropagation();
        window.route("/Blog/Edit/" + id);
    });

    return _("li", {id: id, class: "blog-post"},
        _("h2", title),
        _("p", formatDate(date, "%M %D, %Y")),
        edit? _("div", {class: "post-buttons"}, editButton, deleteButton)
            : _("mark-down", content)
    );
}