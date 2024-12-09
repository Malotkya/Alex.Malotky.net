/** /routes/blog/data/post
 * 
 * @author Alex Malotky
 */
import DataObject, {optional, number, string, TypeOf} from "zim-engine/Validation";

export const BlogPost = new DataObject("Blog", {
    id: optional(number()),
    title: string("Title not Found!"),
    content: string("")
});

type Post = TypeOf<typeof BlogPost>;
export default Post;
