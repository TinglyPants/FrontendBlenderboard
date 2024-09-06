import { useContext } from "react";
import { CommentCreationContext } from "./PostViewing";
import { ErrorContext } from "../../../App";
import { ApiUrl } from "../../../config";
import SVGIcon from "../../General/SVGIcon/SVGIcon";
import { CloseIcon } from "../../General/SVGIcon/icons";

export default function CommentCreationTool() {
    const [commentCreationData, setCommentCreationData] = useContext(
        CommentCreationContext
    );

    const setErrorMessage = useContext(ErrorContext)[1];

    const handleCommentContentChange = (e) => {
        setCommentCreationData({
            ...commentCreationData,
            content: e.target.value,
        });
    };

    const handleCloseClick = () => {
        setCommentCreationData({
            ...commentCreationData,
            isEditing: false,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("content", commentCreationData.content);
        formData.append("postID", commentCreationData.postID);
        formData.append("accessToken", localStorage.getItem("accessToken"));

        const response = await fetch(`${ApiUrl}/comments/create`, {
            method: "POST",
            body: formData,
        });

        if (response.status === 200) {
            // success
            setCommentCreationData({
                ...commentCreationData,
                isEditing: false,
                content: "",
            });
        } else {
            setErrorMessage(`${await response.text()}`);
        }
    };

    return (
        <div className="bg-mid w-full flex text-white rounded-xl p-[1rem] my-[1rem]">
            <form className="w-full" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Add Comment"
                    className="bg-black text-white p-[0.5rem] rounded-lg w-full h-[4rem] max-h-[12rem]"
                    onChange={handleCommentContentChange}
                ></textarea>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="w-[8rem] bg-highlight p-[0.5rem] rounded-full mt-[0.5rem] text-[1rem] font-semibold"
                    >
                        Submit
                    </button>
                    <SVGIcon
                        path={CloseIcon}
                        size="mt-[0.5rem] w-8 h-8"
                        name="Close"
                        onClick={handleCloseClick}
                    />
                </div>
            </form>
        </div>
    );
}
