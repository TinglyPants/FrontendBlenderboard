import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupPath } from "../Pages/paths";
import ProfileImage from "../General/ProfileImage/ProfileImage";

export default function Profile() {
    const [userData, setUserData] = useState({
        Username: undefined,
        Bio: undefined,
        Email: undefined,
        ProfileImage: undefined,
        DateOfCreation: undefined,
        _id: undefined,
    });

    const navigate = useNavigate();

    const handleClick = () => {
        if (userData._id === undefined) {
            navigate(SignupPath);
            return;
        }

        navigate("/account/" + userData._id);
    };

    useEffect(() => {
        function checkUpdate() {
            try {
                setUserData(jwtDecode(localStorage.getItem("accessToken")));
            } catch {
                setUserData({
                    Username: undefined,
                    Bio: undefined,
                    Email: undefined,
                    ProfileImage: undefined,
                    DateOfCreation: undefined,
                    _id: undefined,
                });
            }
        }

        checkUpdate();

        window.addEventListener("storage", checkUpdate);

        return () => {
            window.removeEventListener("storage", checkUpdate);
        };
    }, []);
    return (
        <div
            className="w-[24rem] h-full flex mx-[3rem] cursor-pointer py-[1.5rem]"
            onClick={handleClick}
        >
            <div className="pr-[1.25rem] max-w-[16rem]">
                <p className="text-white overflow-hidden text-ellipsis whitespace-nowrap">
                    {userData.Username !== undefined
                        ? userData.Username
                        : "Sign up or Log in!"}
                </p>
                <p className="text-lightest overflow-hidden text-ellipsis whitespace-nowrap">
                    {userData.Email !== undefined
                        ? userData.Email
                        : "Click here to start!"}
                </p>
            </div>
            <ProfileImage
                profileImage={userData.ProfileImage}
                size="mr-[1.5rem]"
            />
        </div>
    );
}
