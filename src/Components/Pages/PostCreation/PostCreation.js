import { createContext, useState } from "react";
import PostCreationTool from "./PostCreationTool";

export const PostCreationContext = createContext();

export default function PostCreation() {
    // Initialising post creation data state.
    const [postCreationData, setPostCreationData] = useState({
        title: "",
        description: "",
        images: FileList,
        video: undefined,
        mesh: undefined,
        alphaMap: undefined,
        ambientOcclusionMap: undefined,
        bumpMap: undefined,
        displacementMap: undefined,
        emissiveMap: undefined,
        metalnessMap: undefined,
        normalMap: undefined,
        roughnessMap: undefined,
        albedoMap: undefined,
        isTangentSpace: true,
    });

    return (
        <div className="w-full h-full flex p-[1.5rem] bg-black">
            {/* Initialising post context provider */}
            <PostCreationContext.Provider
                value={[postCreationData, setPostCreationData]}
            >
                <PostCreationTool />
                {/* Post preview component will go here later */}
            </PostCreationContext.Provider>
        </div>
    );
}
