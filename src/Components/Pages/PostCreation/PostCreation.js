import { createContext, useState } from "react";
import PostCreationTool from "./PostCreationTool";

export const PostCreationContext = createContext();

export default function PostCreation() {
    // Initialising post creation data state.
    const [postCreationData, setPostCreationData] = useState({
        title: "",
        description: "",
        images: "",
        video: "",
        model: "",
    });

    return (
        <div className="w-full h-full flex p-[1.5rem] bg-black overflow-y-scroll">
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
