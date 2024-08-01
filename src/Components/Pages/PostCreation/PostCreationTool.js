import { useContext } from "react";
import { PostCreationContext } from "./PostCreation";

export default function PostCreationTool() {
    const [postCreationData, setPostCreationData] =
        useContext(PostCreationContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here
        console.log(postCreationData);
    };

    const handleTitleChange = (e) => {
        setPostCreationData({ ...postCreationData, title: e.target.value });
    };
    // to be added
    // const handleDescriptionChange = (e) => {};
    // const handleImagesChange = (e) => {};
    // const handleVideoChange = (e) => {};
    // const handleModelChange = (e) => {};

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
                />

                <label className="mt-[1rem] text-[1.15rem]">Add Images:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                    multiple
                ></input>

                <label className="mt-[1rem] text-[1.15rem]">Add Video:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                ></input>

                <label className="mt-[1rem] text-[1.15rem]">Add Model:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
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
