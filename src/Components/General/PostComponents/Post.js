import { useEffect, useState } from "react";
import MediaViewer from "../MediaViewer/MediaViewer";
import { ApiUrl } from "../../../config";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";

export default function Post({ id }) {
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
            const received = await response.json();
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

    const dateStringToFormattedDate = (initial) => {
        const date = new Date(Date.parse(initial));
        const day = date.getDate();
        const month = date.getMonth() + 1; // months are zero based for some reason
        const year = date.getFullYear();

        return [
            (day > 9 ? "" : "0") + day,
            (month > 9 ? "" : "0") + month,
            year,
        ].join("/");
    };

    return (
        <div className="bg-mid rounded-xl w-full max-h-[44rem] flex flex-col mb-[2rem] text-white">
            <div className="flex flex-row w-full h-[5rem] pt-[0.75rem] justify-between">
                <div className="pl-[1rem] w-full max-w-[50rem] flex flex-col justify-around">
                    <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl">
                        {postData.title}
                    </h1>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg">
                        {postData.description}
                    </p>
                </div>
                <div
                    className="flex flex-row w-min pr-[4rem] cursor-pointer"
                    onClick={handleProfileClick}
                >
                    <div className="mr-[1rem] w-full max-w-[50rem] flex flex-col justify-evenly">
                        <h2 className="text-right text-lg">
                            {authorData.username}
                        </h2>
                        <p className="text-right text-lightest">
                            {dateStringToFormattedDate(postData.dateOfCreation)}
                        </p>
                    </div>
                    <ProfileImage
                        profileImage={authorData.profileImage}
                        size="mr-[1.5rem]"
                    />
                </div>
            </div>
            <MediaViewer videoID={postData.video} imageIDs={postData.images} />
        </div>
    );
}
