import { useParams } from "react-router-dom";
import Post from "../../General/PostComponents/Post";
import { useEffect, useState, useContext } from "react";
import { ApiUrl } from "../../../config";
import { ErrorContext } from "../../../App";

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
                                : // SVG by default
                                  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBMaWNlbnNlOiBBcGFjaGUuIE1hZGUgYnkgbGF3bmNoYWlybGF1bmNoZXI6IGh0dHBzOi8vZ2l0aHViLmNvbS9sYXduY2hhaXJsYXVuY2hlci9sYXduaWNvbnMgLS0+Cjxzdmcgdmlld0JveD0iLTQwIC00MCAyNzIgMjcyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggZD0iTTAgMGgxOTJ2MTkySDB6IiBzdHlsZT0iZmlsbDpub25lIi8+PGNpcmNsZSBjeD0iOTYiIGN5PSI0OC43OCIgcj0iMjYuNzgiIHN0eWxlPSJzdHJva2U6IzU1NTU1NTtzdHJva2Utd2lkdGg6MTJweDtmaWxsOm5vbmUiLz48cGF0aCBkPSJNMzAuMDYgMTIxYzguNzEtNy44OSAyOC42OS0yMC44NCA2NS45NC0yMC44NHM1Ny4yMyAxMi45NSA2NS45NCAyMC44NGMzLjkyIDMuNTQgNS40OCA4Ljc2IDUuNDggMTR2MjMuMTNBMTcuODUgMTcuODUgMCAwIDEgMTQ5LjU3IDE3Nkg0Mi40M2ExNy44NSAxNy44NSAwIDAgMS0xNy44NS0xNy44NlYxMzVjMC01LjI4IDEuNTYtMTAuNSA1LjQ4LTE0Wk05NiAxNjIuNjFoNTMuNTdhNC40NyA0LjQ3IDAgMCAwIDQuNDYtNC40N1YxMzVjMC0yLjkzLS44Ni0zLjkzLTEuMDctNC4xMy02LjM2LTUuNzUtMjMuMTYtMTcuMzctNTctMTcuMzdzLTUwLjYgMTEuNjItNTcgMTcuMzdjLS4yMS4yLTEuMDcgMS4yLTEuMDcgNC4xM3YyMy4xM2E0LjQ3IDQuNDcgMCAwIDAgNC40NiA0LjQ3WiIgc3R5bGU9InN0cm9rZTojNTU1NTU1O2ZpbGw6IzU1NTU1NTtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg=="
                        }
                        className=""
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
