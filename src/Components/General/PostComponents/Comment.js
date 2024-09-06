import { useEffect, useState } from "react";
import { ApiUrl } from "../../../config";
import ProfileImage from "../../General/ProfileImage/ProfileImage";
import { useNavigate } from "react-router-dom";

export default function Comment({ id }) {
    const [commentData, setCommentData] = useState({
        content: "Loading...",
        dateOfCreation: undefined,
        author: undefined,
    });

    const [authorData, setAuthorData] = useState({
        username: "Loading...",
        profileImage: undefined,
    });

    const navigate = useNavigate();

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

    const handleProfileClick = () => {
        if (commentData.author !== undefined) {
            navigate("/account/" + commentData.author);
        }
    };

    useEffect(() => {
        (async () => {
            const response = await fetch(`${ApiUrl}/comments/read/${id}`);
            const received = await response.json();
            setCommentData({
                content: received.content,
                dateOfCreation: received.dateOfCreation,
                author: received.author,
            });
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `${ApiUrl}/users/read/${commentData.author}`
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
    }, [commentData.author]);

    return (
        <div className="text-white bg-mid flex rounded-xl mt-[1rem] p-[1rem]">
            <p className="min-w-0 mr-[2rem] bg-black rounded-xl p-[0.5rem] hyphens-auto break-words flex-grow">
                {commentData.content}
            </p>
            <div
                className="flex-none flex flex-row-reverse mr-[1rem] cursor-pointer"
                onClick={handleProfileClick}
            >
                <ProfileImage profileImage={authorData.profileImage} />
                <div className="flex flex-col h-[4rem] mr-[1rem] justify-evenly">
                    <h2 className="w-full text-white text-right">
                        {authorData.username}
                    </h2>
                    <p className="text-right text-lightest">
                        {dateStringToFormattedDate(commentData.dateOfCreation)}
                    </p>
                </div>
            </div>
        </div>
    );
}
