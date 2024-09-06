import { useContext } from "react";
import { CommentCreationContext } from "./PostViewing";

export default function CommentCreationTool() {
    const [commentCreationData, setCommentCreationData] = useContext(
        CommentCreationContext
    );

    const handleCommentContentChange = (e) => {
        setCommentCreationData({
            ...commentCreationData,
            content: e.target.value,
        });
    };

    return (
        <div className="bg-mid w-full flex text-white rounded-xl p-[1rem]">
            <form>
                <textarea
                    placeholder="Add Comment Content"
                    className="bg-black text-white p-[0.5rem] rounded-lg w-full h-[4rem] max-h-[12rem]"
                    onChange={handleCommentContentChange}
                ></textarea>
            </form>
        </div>
    );
}
