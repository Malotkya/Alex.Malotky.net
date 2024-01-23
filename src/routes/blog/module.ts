import { createElement as _, Content } from "../../util/Elements";

interface expectedArgs {
    edit: boolean,
    item: any|Array<any>
}

export default function Blog(args:expectedArgs):Content {

    console.log(args.item);

    if(args.edit) {
        return _("h1", "Editor Comming Soon!");
    }
        
    return _("h1", "Comming Soon!");
} 