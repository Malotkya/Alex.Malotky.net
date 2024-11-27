/** /Routes/Resume
 * 
 * @author Alex Malotky
 */
import { Router, HttpError } from "zim-engine";
import ResumeRouter, {DESCRIPTION} from "./router";
import { JobDetailed, EditJob, JobEditListView, JobListView } from "./view/job";
import { JobItem } from "./data/job";
import { SchoolDetailed, EditSchool, SchoolEditListView, SchoolListView } from "./view/school";
import { SchoolItem } from "./data/school";
import { SkillDetailed, EditSkill, SkillEditListView, SkillListView } from "./view/skill";
import { SkillItem } from "./data/skill";
import ResumeView , { EditMainView } from "./view";
import styles from "./style.scss";

const Editor = new Router("/Edit");

//Editor Table Handlers
Editor.use(new ResumeRouter("Job", EditJob, JobEditListView, true));
Editor.use(new ResumeRouter("School", EditSchool, SchoolEditListView, true));
Editor.use(new ResumeRouter("Skill", EditSkill, SkillEditListView, true));

/** Default Editor Handler
 * 
 */
Editor.get(async(ctx)=>{
    ctx.render({
        head: {
            styles,
            title: "Resume Editor",
            meta: {
                description: DESCRIPTION
            }
        },
        body: {
            main: EditMainView()
        }
    })
})

const Resume = new Router("/Resume");
Resume.use(Editor);

Resume.use(new ResumeRouter("Job", JobDetailed, JobListView))
Resume.use(new ResumeRouter("School", SchoolDetailed, SchoolListView));
Resume.use(new ResumeRouter("Skill", SkillDetailed, SkillListView));

/** Default Resume Handler
 * 
 */
Resume.get(async(ctx)=>{

    try {
        //"SELECT * FROM Jobs ORDER BY startDate DESC LIMIT 6"
        const jobs = await ctx.query().getAll(JobItem)
        //"SELECT * FROM School ORDER BY graduated DESC LIMIT 6"
        const school = await ctx.query().getAll(SchoolItem);
        //"SELECT * FROM Skills"
        const skills = await ctx.query().getAll(SkillItem);
        
        ctx.render({
            head: {
                styles,
                title: "Resume",
                meta: {
                    description: DESCRIPTION
                }
            },
            body: {
                main: ResumeView(jobs, school, skills)
            }
        })

    } catch (e){
        console.error(e);
        throw new HttpError(500, "There was a problem getting the resume!");
    }
});


export default Resume;