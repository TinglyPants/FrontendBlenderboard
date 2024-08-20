import { useContext, useEffect, useState } from "react";
import Post from "../../General/PostComponents/Post";
import { ApiUrl } from "../../../config";
import { ErrorContext } from "../../../App";

export default function Home() {
    const [postIDArray, setPostIDArray] = useState([]);
    const setErrorMessage = useContext(ErrorContext)[1];

    // Gathering homepage posts
    useEffect(() => {
        // useEffect requires an async IIFE as useEffect callbacks cannot be async
        (async () => {
            const response = await fetch(`${ApiUrl}/posts/homepage`);

            if (response.status !== 200) {
                setErrorMessage(await response.text());
                return;
            }

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
