import { useEffect, useState } from "react";
import { ApiUrl } from "../../../config";
import Post from "../../General/PostComponents/Post";
import { useParams } from "react-router-dom";

export default function Results() {
    const [postIDArray, setPostIDArray] = useState(undefined);
    const { searchQuery } = useParams();

    // Gathering results posts
    useEffect(() => {
        // useEffect requires an async IIFE as useEffect callbacks cannot be async
        (async () => {
            const response = await fetch(
                `${ApiUrl}/posts/search/${searchQuery}`
            );

            const received = await response.json();
            setPostIDArray(received);
        })();
    }, [searchQuery]);
    return (
        <div className="bg-black p-[1rem]">
            {postIDArray === undefined ? (
                <>
                    <h1 className="text-white text-[1.25rem] w-full text-center">
                        Loading...
                    </h1>
                </>
            ) : (
                <>
                    {postIDArray.map((postID) => {
                        return <Post id={postID} key={postID} />;
                    })}
                    {postIDArray.length === 0 ? (
                        <>
                            <h1 className="text-white text-[1.25rem] w-full text-center">
                                Nothing found for: '{searchQuery}'
                            </h1>
                        </>
                    ) : null}
                </>
            )}
        </div>
    );
}
