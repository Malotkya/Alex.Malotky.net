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
    const txtContent = _("textarea", {id: "post-content", name: "content"}, content) as HTMLTextAreaElement;
    const txtTitle = _("input", {id: "post-title", name: "title", value: title}) as HTMLInputElement;
    const target = _("div", {id: "content-preview"}, _("mark-down", content));

    //Form
    const form = _("form", {id: "blog-post-form"},
        _("div", {class: "row"},
            _("label", {for: "post-title", class: "post-title"},
                "Post Title:",
                txtTitle,
            ),

            _("p", {id: "post-date"}, formatDate(date, "%M %D, %Y", "")),
        ),
        
        _("div", {class: "row main"},
            _("label", {for: "post-content", class: "post-content"},
                "Mark Down Editor:",
                txtContent
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
    txtContent.addEventListener("input", ()=>{
        target.innerHTML = "";
        target.appendChild(_("mark-down", txtContent.value));
    });

    form.addEventListener("submit", (event:SubmitEvent)=>{
        event.preventDefault();

        const data:any = {
            title: txtTitle.value,
            date: date,
            content: txtContent.value
        }

        window.route("/Blog/Edit/Update/"+id, {post: JSON.stringify(data)})
        return false;
    });

    return form;
}