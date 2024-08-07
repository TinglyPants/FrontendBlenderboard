import { useEffect, useState } from "react";
import MediaViewer from "../MediaViewer/MediaViewer";

export default function Post({ id }) {
    const [postData, setPostData] = useState({
        title: "Loading...",
        description: "Loading...",
        images: [],
        video: undefined,
        model: undefined,
    });

    useEffect(() => {
        (async () => {
            const response = await fetch(
                "http://localhost:4000/posts/read/" + id
            );
            const received = await response.json();
            setPostData({
                title: received.title,
                description: received.description,
                images: received.images,
                video: received.video,
                model: received.model,
            });
        })();
    }, [id]);
    return (
        <div className="bg-mid rounded-xl w-full flex flex-col mb-[2rem]">
            <h1 className="mx-[1rem] mt-[1rem] mb-[0.25rem] text-white text-3xl font-semibold">
                {postData.title}
            </h1>
            <p className="mx-[1rem] text-white text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                {postData.description}
            </p>
            <MediaViewer mediaIDs={postData.images} />
        </div>
    );
}
