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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-mid w-full flex text-white rounded-xl p-[1rem] my-[0.65rem]">
            <form className="w-full" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Add Comment Content"
                    className="bg-black text-white p-[0.5rem] rounded-lg w-full h-[4rem] max-h-[12rem]"
                    onChange={handleCommentContentChange}
                ></textarea>
                <button
                    type="submit"
                    className="w-[8rem] bg-highlight p-[0.5rem] rounded-full mt-[0.5rem] text-[1rem] font-semibold"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
