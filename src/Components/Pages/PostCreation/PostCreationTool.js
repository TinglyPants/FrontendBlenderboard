import { useContext } from "react";
import { PostCreationContext } from "./PostCreation";

export default function PostCreationTool() {
    const [postCreationData, setPostCreationData] =
        useContext(PostCreationContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // guard clauses to prevent invalid post
        if (postCreationData.title === "") {
            console.log("You need to include a title!");
            return;
        }
        if (postCreationData.description === "") {
            console.log("You need to include a description!");
            return;
        }
        if (postCreationData.images.length === 0) {
            console.log("You need to include at least one image!");
            return;
        }

        console.log(postCreationData);
    };

    const handleTitleChange = (e) => {
        // base state is ""
        setPostCreationData({ ...postCreationData, title: e.target.value });
    };
    const handleDescriptionChange = (e) => {
        // base state is ""
        setPostCreationData({
            ...postCreationData,
            description: e.target.value,
        });
    };
    const handleImagesChange = (e) => {
        // base state is FileList length 0
        setPostCreationData({ ...postCreationData, images: e.target.files });
    };
    const handleVideoChange = (e) => {
        // base state is undefined
        setPostCreationData({ ...postCreationData, video: e.target.files[0] });
    };
    const handleModelChange = (e) => {
        // base state is undefined
        setPostCreationData({ ...postCreationData, model: e.target.files[0] });
    };

    return (
        <div className="w-[36rem] p-[1rem] bg-mid rounded-[1rem] text-white">
            <form className="flex flex-col max-h-full">
                <label className="text-[1.15rem]">Title:</label>
                <input
                    type="text"
                    className="bg-black p-[0.5rem] rounded-[0.5rem]"
                    onChange={handleTitleChange}
                />

                <label className="mt-[1rem] text-[1.15rem]">Description:</label>
                <textarea
                    className="bg-black p-[0.5rem] rounded-[0.5rem]"
                    rows={6}
                    onChange={handleDescriptionChange}
                />

                <label className="mt-[1rem] text-[1.15rem]">Add Images:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                    multiple
                    onChange={handleImagesChange}
                ></input>

                <label className="mt-[1rem] text-[1.15rem]">Add Video:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                    onChange={handleVideoChange}
                ></input>

                <label className="mt-[1rem] text-[1.15rem]">Add Model:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                    onChange={handleModelChange}
                ></input>

                <button
                    className="w-[12rem] bg-highlight p-[0.5rem] rounded-full mt-[1.5rem] text-[1.15rem] font-semibold self-center"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
