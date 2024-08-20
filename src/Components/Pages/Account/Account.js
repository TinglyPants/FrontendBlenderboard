import { useParams } from "react-router-dom";
import Post from "../../General/PostComponents/Post";
import { useEffect, useState, useContext } from "react";
import { ApiUrl } from "../../../config";
import { ErrorContext } from "../../../App";
import { DefaultProfileImg } from "../../General/SVGIcon/DefaultProfileImg";

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
            <div className="w-[32rem] h-fit pb-[1rem] bg-mid rounded-xl shrink-0 flex flex-col items-center">
                <div className="w-[22rem] aspect-square bg-black rounded-full mt-[1rem] overflow-hidden border-[3px] border-lightest">
                    <img
                        src={
                            userData.profileImage !== undefined
                                ? `${ApiUrl}/media/image/${userData.profileImage}`
                                : DefaultProfileImg
                        }
                        className="w-full h-full object-cover"
                        alt="Profile"
                    />
                </div>
                <h1 className="w-full text-white text-3xl px-[1rem] mt-[1rem]">
                    {userData.username}
                </h1>
                <h2 className="w-full text-lightest text-lg px-[1rem]">
                    {userData.email}
                </h2>
                <div className="px-[1rem] w-full">
                    {userData.bio ? (
                        <p className="w-full text-white p-[0.5rem] mt-[0.75rem] hyphens-auto break-words bg-black rounded-lg">
                            {userData.bio}
                        </p>
                    ) : null}
                </div>
            </div>
            <div className="ml-[2rem]">
                {postIDArray.map((postID) => {
                    return <Post id={postID} key={postID} />;
                })}
            </div>
        </div>
    );
}
