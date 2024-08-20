import { useContext } from "react";
import { PostCreationContext } from "./PostCreation";
import { useNavigate } from "react-router-dom";
import { HomePath } from "../paths";
import { ErrorContext } from "../../../App";
import { ApiUrl } from "../../../config";

export default function PostCreationTool() {
    const [postCreationData, setPostCreationData] =
        useContext(PostCreationContext);

    const navigate = useNavigate();
    const setErrorMessage = useContext(ErrorContext)[1];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Building FormData object to send to API
        const formData = new FormData();

        formData.append("title", postCreationData.title);
        formData.append("description", postCreationData.description);

        // append individual files to FormData:
        for (let i = 0; i < postCreationData.images.length; i++) {
            formData.append("images", postCreationData.images[i]);
        }
        formData.append("video", postCreationData.video);
        formData.append("mesh", postCreationData.mesh);
        formData.append("alphaMap", postCreationData.alphaMap);
        formData.append(
            "ambientOcclusionMap",
            postCreationData.ambientOcclusionMap
        );
        formData.append("bumpMap", postCreationData.bumpMap);
        formData.append("displacementMap", postCreationData.displacementMap);
        formData.append("emissiveMap", postCreationData.emissiveMap);
        formData.append("metalnessMap", postCreationData.metalnessMap);
        formData.append("normalMap", postCreationData.normalMap);
        formData.append("isTangentSpace", postCreationData.isTangentSpace);
        formData.append("roughnessMap", postCreationData.roughnessMap);
        formData.append("albedoMap", postCreationData.albedoMap);

        formData.append("accessToken", localStorage.getItem("accessToken"));

        const response = await fetch(`${ApiUrl}/posts/create`, {
            method: "POST",
            body: formData,
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
    const handleMeshChange = (e) => {
        // base state is undefined
        setPostCreationData({ ...postCreationData, mesh: e.target.files[0] });
    };
    const handleAlphaMapChange = (e) => {
        // base state is undefined
        setPostCreationData({
            ...postCreationData,
            alphaMap: e.target.files[0],
        });
    };
    const handleAmbientOcclusionMapChange = (e) => {
        // base state is undefined
        setPostCreationData({
            ...postCreationData,
            ambientOcclusionMap: e.target.files[0],
        });
    };
    const handleBumpMapChange = (e) => {
        // base state is undefined
        setPostCreationData({
            ...postCreationData,
            bumpMap: e.target.files[0],
        });
    };
    const handleDisplacementMapChange = (e) => {
        // base state is undefined
        setPostCreationData({
            ...postCreationData,
            displacementMap: e.target.files[0],
        });
    };
    const handleEmissiveMapChange = (e) => {
        // base state is undefined
        setPostCreationData({
            ...postCreationData,
            emissiveMap: e.target.files[0],
        });
    };
    const handleMetalnessMapChange = (e) => {
        // base state is undefined
        setPostCreationData({
            ...postCreationData,
            metalnessMap: e.target.files[0],
        });
    };
    const handleNormalMapChange = (e) => {
        // base state is undefined
        setPostCreationData({
            ...postCreationData,
            normalMap: e.target.files[0],
        });
    };
    const handleRoughnessMapChange = (e) => {
        // base state is undefined
        setPostCreationData({
            ...postCreationData,
            roughnessMap: e.target.files[0],
        });
    };
    const handleAlbedoMapChange = (e) => {
        // base state is undefined
        setPostCreationData({
            ...postCreationData,
            albedoMap: e.target.files[0],
        });
    };
    const handleIsTangentSpaceChange = (e) => {
        e.preventDefault();
        setPostCreationData({
            ...postCreationData,
            isTangentSpace: !postCreationData.isTangentSpace,
        });
    };

    return (
        <div className="w-[36rem] p-[1rem] bg-mid rounded-[1rem] text-white h-fit">
            <form className="flex flex-col">
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

                <label className="mt-[1rem] text-[1.15rem]">Add Mesh:</label>
                <input
                    type="file"
                    className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                    onChange={handleMeshChange}
                    accept=".obj, .fbx, .stl, .gltf, .glb, .dae"
                ></input>

                {postCreationData.mesh !== undefined ? (
                    <>
                        <label className="mt-[1rem] text-[1.15rem]">
                            Add Albedo Map:
                        </label>
                        <input
                            type="file"
                            className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                            onChange={handleAlbedoMapChange}
                            accept=".png, .jpg, .jpeg"
                        ></input>

                        <label className="mt-[1rem] text-[1.15rem]">
                            Add Alpha Map:
                        </label>
                        <input
                            type="file"
                            className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                            onChange={handleAlphaMapChange}
                            accept=".png, .jpg, .jpeg"
                        ></input>

                        <label className="mt-[1rem] text-[1.15rem]">
                            Add Ambient Occlusion Map:
                        </label>
                        <input
                            type="file"
                            className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                            onChange={handleAmbientOcclusionMapChange}
                            accept=".png, .jpg, .jpeg"
                        ></input>

                        <label className="mt-[1rem] text-[1.15rem]">
                            Add Bump Map:
                        </label>
                        <input
                            type="file"
                            className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                            onChange={handleBumpMapChange}
                            accept=".png, .jpg, .jpeg"
                        ></input>

                        <label className="mt-[1rem] text-[1.15rem]">
                            Add Displacement Map:
                        </label>
                        <input
                            type="file"
                            className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                            onChange={handleDisplacementMapChange}
                            accept=".png, .jpg, .jpeg"
                        ></input>

                        <label className="mt-[1rem] text-[1.15rem]">
                            Add Emissive Map:
                        </label>
                        <input
                            type="file"
                            className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                            onChange={handleEmissiveMapChange}
                            accept=".png, .jpg, .jpeg"
                        ></input>

                        <label className="mt-[1rem] text-[1.15rem]">
                            Add Metalness Map:
                        </label>
                        <input
                            type="file"
                            className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                            onChange={handleMetalnessMapChange}
                            accept=".png, .jpg, .jpeg"
                        ></input>

                        <label className="mt-[1rem] text-[1.15rem]">
                            Add Normal Map:
                        </label>
                        <input
                            type="file"
                            className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                            onChange={handleNormalMapChange}
                            accept=".png, .jpg, .jpeg"
                        ></input>

                        {postCreationData.normalMap !== undefined ? (
                            <button onClick={handleIsTangentSpaceChange}>
                                Normal map type:{" "}
                                {postCreationData.isTangentSpace
                                    ? "Tangent"
                                    : "Object"}{" "}
                                space. Click to change.
                            </button>
                        ) : null}

                        <label className="mt-[1rem] text-[1.15rem]">
                            Add Roughness Map:
                        </label>
                        <input
                            type="file"
                            className="bg-highlight p-[0.5rem] rounded-[0.5rem]"
                            onChange={handleRoughnessMapChange}
                            accept=".png, .jpg, .jpeg"
                        ></input>
                    </>
                ) : null}

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
