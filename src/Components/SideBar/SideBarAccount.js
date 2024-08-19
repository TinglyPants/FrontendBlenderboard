import { useNavigate } from "react-router-dom";
import SVGIcon from "../General/SVGIcon/SVGIcon";
import { SignupPath } from "../Pages/paths";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function SideBarAccount({ SVGpath, text }) {
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    const handleClick = () => {
        if (userData === null) {
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
            className="flex h-[4rem] mx-[1rem] mt-[0.5rem] items-center cursor-pointer group pl-[3.5rem]"
            onClick={handleClick}
        >
            <SVGIcon
                path={SVGpath}
                name={text}
                size={"w-[2.5rem] h-[2.5rem]"}
            />
            <p className="text-xl group-hover:text-highlight">{text}</p>
        </div>
    );
}
