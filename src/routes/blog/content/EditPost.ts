import { createElement as _, Content } from "../../../util/Elements";
import { formatDate, firebaseDate } from "../../../util/FormateDate";

export interface Post {
    id: string,
    title: string,
    date: firebaseDate,
    content:string
}

export default function EditPost(data:any = {}): Content {
    const { id = "undefined", title = "", date, content = ""} = data;
    console.log(data);

    const input = _("textarea", {id: "post-content", name: "content"}, content) as HTMLTextAreaElement;
    const target = _("div", {id: "content-preview"}, _("mark-down", content));

    const form = _("form", 
        _("label", {for: "post-title"}, "Post Title:"),
        _("input", {id: "post-title", name: "title", value: title}),

        _("p", {id: "post-date"}, formatDate(date, "%M %D, %Y", "")),

        _("lable", {for: "post-content"}, "Mark Down Editor:"),
        input,

        _("label", {for: "content-preview"}, "Mark Down Preview"),
        target,

        _("button", {id: "submit", class: "btn"}, "Submit")
    ) as HTMLFormElement;

    input.addEventListener("input", (event)=>{
        target.innerHTML = "";
        target.appendChild(_("mark-down", input.value));
    });

    form.addEventListener("submit", (event:SubmitEvent)=>{
        event.preventDefault();
        window.route("/Blog/Edit/Update/"+id, new FormData(form))
        return false;
    });

    return form;
}