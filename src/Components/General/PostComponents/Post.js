import { useEffect, useState } from "react";

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
            console.log(received);
            setPostData({
                title: received.title,
                description: received.description,
                images: received.images,
                video: received.video,
            });
        })();
    }, [id]);
    return <p className="text-white">{postData.title}</p>;
}
