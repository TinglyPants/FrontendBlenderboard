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
        <div className="bg-black p-[1rem]">
            {postIDArray.map((postID) => {
                return <Post id={postID} key={postID} />;
            })}
        </div>
    );
}
