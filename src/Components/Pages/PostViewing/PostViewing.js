import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../../config";

export default function PostViewing() {
    const { id } = useParams();

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
        <div className="w-full h-full flex flex-col p-[1.5rem] bg-black"></div>
    );
}
