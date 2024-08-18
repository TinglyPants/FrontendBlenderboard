import { useEffect, useState } from "react";
import MediaViewer from "../MediaViewer/MediaViewer";
import { ApiUrl } from "../../../config";

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
                <div className="flex flex-row w-min pr-[4rem] cursor-pointer">
                    <div className="mr-[1rem] w-full max-w-[50rem] flex flex-col justify-evenly">
                        <h2 className="text-right text-lg">
                            {authorData.username}
                        </h2>
                        <p className="text-right text-lightest">
                            {dateStringToFormattedDate(postData.dateOfCreation)}
                        </p>
                    </div>
                    <div className="rounded-full overflow-hidden aspect-square flex flex-col items-center bg-black shrink-0 mr-[1.5rem]">
                        <img
                            alt="User Profile"
                            src={
                                authorData.profileImage !== undefined
                                    ? `${ApiUrl}/media/image/${authorData.profileImage}`
                                    : // SVG by default
                                      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBMaWNlbnNlOiBBcGFjaGUuIE1hZGUgYnkgbGF3bmNoYWlybGF1bmNoZXI6IGh0dHBzOi8vZ2l0aHViLmNvbS9sYXduY2hhaXJsYXVuY2hlci9sYXduaWNvbnMgLS0+Cjxzdmcgdmlld0JveD0iLTQwIC00MCAyNzIgMjcyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggZD0iTTAgMGgxOTJ2MTkySDB6IiBzdHlsZT0iZmlsbDpub25lIi8+PGNpcmNsZSBjeD0iOTYiIGN5PSI0OC43OCIgcj0iMjYuNzgiIHN0eWxlPSJzdHJva2U6IzU1NTU1NTtzdHJva2Utd2lkdGg6MTJweDtmaWxsOm5vbmUiLz48cGF0aCBkPSJNMzAuMDYgMTIxYzguNzEtNy44OSAyOC42OS0yMC44NCA2NS45NC0yMC44NHM1Ny4yMyAxMi45NSA2NS45NCAyMC44NGMzLjkyIDMuNTQgNS40OCA4Ljc2IDUuNDggMTR2MjMuMTNBMTcuODUgMTcuODUgMCAwIDEgMTQ5LjU3IDE3Nkg0Mi40M2ExNy44NSAxNy44NSAwIDAgMS0xNy44NS0xNy44NlYxMzVjMC01LjI4IDEuNTYtMTAuNSA1LjQ4LTE0Wk05NiAxNjIuNjFoNTMuNTdhNC40NyA0LjQ3IDAgMCAwIDQuNDYtNC40N1YxMzVjMC0yLjkzLS44Ni0zLjkzLTEuMDctNC4xMy02LjM2LTUuNzUtMjMuMTYtMTcuMzctNTctMTcuMzdzLTUwLjYgMTEuNjItNTcgMTcuMzdjLS4yMS4yLTEuMDcgMS4yLTEuMDcgNC4xM3YyMy4xM2E0LjQ3IDQuNDcgMCAwIDAgNC40NiA0LjQ3WiIgc3R5bGU9InN0cm9rZTojNTU1NTU1O2ZpbGw6IzU1NTU1NTtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg=="
                            }
                            className="h-full w-full"
                        />
                    </div>
                </div>
            </div>
            <MediaViewer videoID={postData.video} imageIDs={postData.images} />
        </div>
    );
}
