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
                "http://86.167.176.156:4000/posts/read/" + id
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
        <div className="bg-mid rounded-xl w-full max-h-[44rem] flex flex-col mb-[2rem]">
            <h1 className="mx-[1rem] mt-[1rem] mb-[0.25rem] text-white text-3xl font-semibold flex-none">
                {postData.title}
            </h1>
            <p className="mx-[1rem] text-white text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap flex-none">
                {postData.description}
            </p>
            <MediaViewer videoID={postData.video} imageIDs={postData.images} />
        </div>
    );
}
