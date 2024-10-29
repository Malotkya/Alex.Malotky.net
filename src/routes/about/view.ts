import { createElement as _, Content } from "zim-engine";

export default function AboutView():Content {
    return [
        _("h1", "About Me"),
        _("p",
            "My name is Alex and I am currently enrolled in the ",
            _("a", {href: "https://uwex.wisconsin.edu/applied-computing", target: "_blank"}, "Applied Computing Program"),
            " through the UW extended campus. I want to tell you a little bit about myself so that you can better know me."
        )
    ]
}