import Router from "../App/Router";
import Database, {firebaseConfig} from "../App/Database";
import {render} from "../App";

/** Resume Router
 * 
 * @author Alex Malotky
 */
export const Resume = new Router("/Resume", "Resume", "Alex's resume and other skills.");
const database = new Database();

Resume.onLoad(async()=>{

    let results = await database.resume();
    if(results.unknown.length > 0)
        console.warn("Unknown results found:\n" + JSON.stringify(results.unknown, null, 2));
    
    // Imitating database results to show template rendering functionality.
    const schooling = [
        {
            schoolName: "Madison Area Technical College",
            graduated: "Dec, 2019",
            degree: "Associates in Applied Science - Web Development"
        },
        {
            schoolName: "University of Wisconsin - Platteville",
            graduated: "Dec, 2023",
            degree: "Basholors of Science in Applied Computing"
        }
    ];
    const work = [
        {
            employer: "Walmart",
            title: "Sales Associate",
            startDate: "Sept, 2016",
            endDate: "Aug, 2018"
        },
        {
            employer: "Permar Security Services",
            title: "Security Officer",
            startDate: "May, 2018"
        }
    ];
    const skills = [
        /* Coming Soon */
    ]

    return render("resume.html", results);
});