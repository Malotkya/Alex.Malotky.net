import { createElement as _, Content } from "../../../util/Elements";
import { formatDate } from "../../../util/FormateDate";
import { Timestamp } from "firebase/firestore";

export interface Post {
    id: string,
    title: string,
    date: Timestamp,
    content:string
}

export default function EditPost(data:any = {}): Content {
    const { id = "undefined", title = "", date, content = ""} = data;
    console.log(data);

    //Elements used by form code.
    const input = _("textarea", {id: "post-content", name: "content"}, content) as HTMLTextAreaElement;
    const target = _("div", {id: "content-preview"}, _("mark-down", content));
    const form = _("form", {id: "blog-post-form"},
        _("div", {class: "row"},
            _("label", {for: "post-title", class: "post-title"},
                "Post Title:",
                _("input", {id: "post-title", name: "title", value: title}),
            ),

            _("p", {id: "post-date"}, formatDate(date, "%M %D, %Y", "")),
        ),
        
        _("div", {class: "row main"},
            _("label", {for: "post-content", class: "post-content"},
                "Mark Down Editor:",
                input
            ),
            

            _("label", {for: "content-preview", class: "content-preview"},
                "Mark Down Preview",
                target
            ),
        ),

        _("div", {class: "row"},
            _("button", {id: "submit", class: "btn"}, "Submit")
        ),

        
    ) as HTMLFormElement;

    //Event Listeners.
    input.addEventListener("input", ()=>{
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