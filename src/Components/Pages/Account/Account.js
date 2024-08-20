import { useParams } from "react-router-dom";
import Post from "../../General/PostComponents/Post";
import { useEffect, useState, useContext } from "react";
import { ApiUrl } from "../../../config";
import { ErrorContext } from "../../../App";
import ProfileCard from "./ProfileCard";

export default function Account() {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        username: "Loading...",
        email: "Loading...",
        bio: "Loading...",
        profileImage: undefined,
    });

    const [postIDArray, setPostIDArray] = useState([]);
    const setErrorMessage = useContext(ErrorContext)[1];

    useEffect(() => {
        (async () => {
            const response = await fetch(`${ApiUrl}/users/read/${id}`);

            if (response.status !== 200) {
                setErrorMessage(await response.text());
                return;
            }

            const received = await response.json();
            setUserData({
                username: received.username,
                email: received.email,
                bio: received.bio,
                profileImage: received.profileImage,
            });
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${ApiUrl}/posts/userpage/${id}`);

            if (response.status !== 200) {
                return;
            }

            const received = await response.json();
            setPostIDArray(received);
        })();
    }, [id]);
    return (
        <div className="w-full h-full bg-black flex p-[1.5rem]">
            <ProfileCard
                profileImage={userData.profileImage}
                username={userData.username}
                email={userData.email}
                bio={userData.bio}
            />
            <div className="ml-[2rem]">
                {postIDArray.map((postID) => {
                    return <Post id={postID} key={postID} />;
                })}
            </div>
        </div>
    );
}
