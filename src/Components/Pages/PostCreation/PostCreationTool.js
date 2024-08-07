import { useContext } from "react";
import { PostCreationContext } from "./PostCreation";
import { useNavigate } from "react-router-dom";
import { HomePath } from "../paths";

export default function PostCreationTool() {
    const [postCreationData, setPostCreationData] =
        useContext(PostCreationContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Eventually an error popup will be used
        // Title checks
        if (postCreationData.title === "") {
            console.log("You need to include a title!");
            return;
        }
        if (postCreationData.title.length > 120) {
            console.log("Your title is too big!");
            return;
        }

        // Description checks
        if (postCreationData.description === "") {
            console.log("You need to include a description!");
            return;
        }
        if (postCreationData.description.length > 3000) {
            console.log("Your description is too big!");
            return;
        }

        // Media presence check
        if (
            postCreationData.images.length === 0 &&
            postCreationData.video === undefined
        ) {
            console.log("You need to include at least one media!");
            return;
        }

        // Image count check
        if (postCreationData.images.length > 12) {
            console.log("Too many images!");
            return;
        }

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

        try {
            const response = await fetch(
                "http://86.167.176.156:4000/posts/create",
                {
                    method: "POST",
                    body: postCreationFormData,
                }
            );

            if (response.status === 200) {
                console.log("Successful post creation.");
                navigate(HomePath);
            } else {
                console.log(
                    `Error code: ${
                        response.status
                    }, message: ${await response.text()}`
                );
            }
        } catch (err) {
            console.error(err);
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
