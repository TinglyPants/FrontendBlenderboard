import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../../config";
import PostInfoCard from "./PostInfoCard";
import { ErrorContext } from "../../../App";
import PostMediaCard from "./PostMediaCard";

export default function PostViewing() {
    const { id } = useParams();
    const setErrorMessage = useContext(ErrorContext)[1];

    const [postData, setPostData] = useState({
        title: "Loading...",
        description: "Loading...",
        dateOfCreation: undefined,
        author: undefined,
        images: [],
        video: undefined,
        model: undefined,
    });

    const [authorData, setAuthorData] = useState({
        username: "Loading...",
        profileImage: undefined,
    });

    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (postData.author !== undefined) {
            navigate("/account/" + postData.author);
        }
    };

    useEffect(() => {
        (async () => {
            const response = await fetch(`${ApiUrl}/posts/read/${id}`);

            if (response.status !== 200) {
                setErrorMessage(await response.text());
                return;
            }

            const received = await response.json();
            console.log(received);
            setPostData({
                title: received.title,
                description: received.description,
                dateOfCreation: received.dateOfCreation,
                author: received.author,
                images: received.images,
                video: received.video,
                model: received.model,
            });
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `${ApiUrl}/users/read/${postData.author}`
            );
            if (response.status !== 200) {
                return;
            }
            const received = await response.json();
            setAuthorData({
                username: received.username,
                profileImage: received.profileImage,
            });
        })();
    }, [postData.author]);

    return (
        <div className="w-full h-full flex flex-col p-[1.5rem] bg-black">
            <div className="flex flex-row w-full h-full">
                <PostInfoCard
                    title={postData.title}
                    description={postData.description}
                    profileImage={authorData.profileImage}
                    username={authorData.username}
                    dateOfCreation={postData.dateOfCreation}
                />
                <PostMediaCard
                    videoID={postData.video}
                    imageIDs={postData.images}
                />
            </div>
        </div>
    );
}
