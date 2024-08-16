import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupPath } from "../Pages/paths";

export default function Profile({ username, email, image }) {
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    const handleClick = () => {
        if (userData === null) {
            navigate(SignupPath);
        }
    };

    useEffect(() => {
        function checkUpdate() {
            try {
                setUserData(jwtDecode(localStorage.getItem("accessToken")));
            } catch {
                setUserData(null);
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
                    {userData !== null
                        ? userData.Username
                        : "Sign up or Log in!"}
                </p>
                <p className="text-lightest overflow-hidden text-ellipsis whitespace-nowrap">
                    {userData !== null
                        ? userData.Email
                        : "Click here to start!"}
                </p>
            </div>
            <div className="rounded-full overflow-hidden aspect-square flex flex-col items-center bg-black shrink-0 mr-[1.5rem]">
                <img alt="User Profile" src={image} className="h-full" />
            </div>
        </div>
    );
}
