import { createContent as _ } from "Engine";
import { formatDate } from "@/util";

export interface JobItem {
    id: string,
    title: string,
    employer: string,
    startDate: number,
    endDate?: number,
    about: Array<string>
}

export function JobCard(item: JobItem){
    const startDate: string = formatDate(item.startDate, "%m, %Y");
    const endDate: string   = formatDate(item.endDate, "%m, %Y", "Current");

    return _("li", {class: "resume-card"},
        _("h3", {class: "resume-title"},
            _("a", {href:`/Resume/Jobs/${item.id}`}, item.title)
        ),
        _('p', {class: "resume-date"},
            `${startDate} - ${endDate}`
        ),
        _("p", {class: "resume-sub-title"}, item.employer)
    );
}

export function JobDetailed(item: JobItem){
    const startDate: string = formatDate(item.startDate, "%M, %Y");
    const endDate: string   = formatDate(item.endDate, "%M, %Y", "Currently Employed");

    const about: Array<string> = item.about || [];

    return [
        _("h1", item.title),
        _("article", {class: "resume-detailed"},
            _("h2", item.employer),
            _("p", {class: "resume-date"},
                _("span", `${startDate} - ${endDate}`)
            ),
            _("div", {class: "resume-about"},
                _("ul", about.map(a=>_("li", a)))
            )
        )
    ]
}