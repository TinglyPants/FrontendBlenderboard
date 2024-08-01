import { useContext } from "react";
import { PostCreationContext } from "./PostCreation";

export default function PostCreationTool() {
    const [postCreationData, setPostCreationData] =
        useContext(PostCreationContext);

    return (
        <div className="w-[36rem] p-[1rem] bg-mid rounded-[1rem] text-white">
            <form className="flex flex-col max-h-full">
                <label className="text-[1.15rem]">Title:</label>
                <input
                    type="text"
                    className="bg-black p-[0.5rem] rounded-[0.5rem]"
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
            </form>
        </div>
    );
}
