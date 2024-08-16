import { useContext } from "react";
import { PostCreationContext } from "./PostCreation";
import { useNavigate } from "react-router-dom";
import { HomePath } from "../paths";
import { ErrorContext } from "../../../App";

export default function PostCreationTool() {
    const [postCreationData, setPostCreationData] =
        useContext(PostCreationContext);

    const navigate = useNavigate();
    const setErrorMessage = useContext(ErrorContext)[1];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Building FormData object to send to API
        const postCreationFormData = new FormData();

        postCreationFormData.append("title", postCreationData.title);
        postCreationFormData.append(
            "description",
            postCreationData.description
        );
        // append individual files to FormData:
        for (let i = 0; i < postCreationData.images.length; i++) {
            postCreationFormData.append("images", postCreationData.images[i]);
        }
        postCreationFormData.append("video", postCreationData.video);
        postCreationFormData.append("model", postCreationData.model);

        postCreationFormData.append(
            "accessToken",
            localStorage.getItem("accessToken")
        );

        const response = await fetch("http://localhost:4000/posts/create", {
            method: "POST",
            body: postCreationFormData,
        });

        if (response.status === 200) {
            console.log("Successful post creation.");
            navigate(HomePath);
        } else {
            setErrorMessage(`${await response.text()}`);
        }
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
                <p className="font-semibold text-[2rem]">Create Post</p>
                <input
                    placeholder="Title"
                    type="text"
                    className="bg-black p-[0.5rem] rounded-[0.5rem] mt-[0.65rem]"
                    onChange={handleTitleChange}
                />

                <textarea
                    placeholder="Description"
                    className="bg-black p-[0.5rem] rounded-[0.5rem] min-h-[10rem] max-h-[22rem] mt-[0.65rem]"
                    onChange={handleDescriptionChange}
                />

                <label className="mt-[1rem] text-[1.15rem]">Add Images:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                    multiple
                    onChange={handleImagesChange}
                    accept=".png, .jpg, .jpeg, .gif, .webp"
                ></input>

                <label className="mt-[1rem] text-[1.15rem]">Add Video:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                    onChange={handleVideoChange}
                    accept=".mp4, .webm, .ogg"
                ></input>

                <label className="mt-[1rem] text-[1.15rem]">Add Model:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                    onChange={handleModelChange}
                    accept=".obj, .fbx, .stl, .gltf, .glb, .dae"
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
