import { useEffect, useState } from "react";
import Post from "../../General/PostComponents/Post";

export default function Home() {
    const [postIDArray, setPostIDArray] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                "http://localhost:4000/posts/homepage"
            );
            const received = await response.json();
            setPostIDArray(received);
        })();
    }, []);
    return (
        <div className="w-full h-full flex flex-col p-[1.5rem] bg-black overflow-y-scroll">
            {postIDArray.map((postID) => {
                return <Post id={postID} key={postID} />;
            })}
        </div>
    );
}
