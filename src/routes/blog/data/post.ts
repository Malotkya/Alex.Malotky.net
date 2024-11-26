import DataObject, {Optional, number, string, TypeOf} from "zim-engine/Validation";

export const BlogPost = new DataObject("Blog", {
    id: Optional(number()),
    title: string("Title not Found!"),
    content: string("")
});

type Post = TypeOf<typeof BlogPost>;
export default Post;
