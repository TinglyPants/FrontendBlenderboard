import { useEffect, useState } from "react";
import Post from "../../General/PostComponents/Post";

export default function Home() {
    const [postIDArray, setPostIDArray] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    "http://86.167.176.156:4000/posts/homepage"
                );
                const received = await response.json();
                setPostIDArray(received);
            } catch (err) {
                console.log("Unable to contact API.");
            }
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
