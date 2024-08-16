import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupPath } from "../Pages/paths";

export default function Profile() {
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
                <img
                    alt="User Profile"
                    src={
                        userData !== null
                            ? "http://localhost:4000/media/image/" +
                              userData.ProfileImage
                            : // SVG by default
                              "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBMaWNlbnNlOiBBcGFjaGUuIE1hZGUgYnkgbGF3bmNoYWlybGF1bmNoZXI6IGh0dHBzOi8vZ2l0aHViLmNvbS9sYXduY2hhaXJsYXVuY2hlci9sYXduaWNvbnMgLS0+Cjxzdmcgdmlld0JveD0iLTQwIC00MCAyNzIgMjcyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggZD0iTTAgMGgxOTJ2MTkySDB6IiBzdHlsZT0iZmlsbDpub25lIi8+PGNpcmNsZSBjeD0iOTYiIGN5PSI0OC43OCIgcj0iMjYuNzgiIHN0eWxlPSJzdHJva2U6IzU1NTU1NTtzdHJva2Utd2lkdGg6MTJweDtmaWxsOm5vbmUiLz48cGF0aCBkPSJNMzAuMDYgMTIxYzguNzEtNy44OSAyOC42OS0yMC44NCA2NS45NC0yMC44NHM1Ny4yMyAxMi45NSA2NS45NCAyMC44NGMzLjkyIDMuNTQgNS40OCA4Ljc2IDUuNDggMTR2MjMuMTNBMTcuODUgMTcuODUgMCAwIDEgMTQ5LjU3IDE3Nkg0Mi40M2ExNy44NSAxNy44NSAwIDAgMS0xNy44NS0xNy44NlYxMzVjMC01LjI4IDEuNTYtMTAuNSA1LjQ4LTE0Wk05NiAxNjIuNjFoNTMuNTdhNC40NyA0LjQ3IDAgMCAwIDQuNDYtNC40N1YxMzVjMC0yLjkzLS44Ni0zLjkzLTEuMDctNC4xMy02LjM2LTUuNzUtMjMuMTYtMTcuMzctNTctMTcuMzdzLTUwLjYgMTEuNjItNTcgMTcuMzdjLS4yMS4yLTEuMDcgMS4yLTEuMDcgNC4xM3YyMy4xM2E0LjQ3IDQuNDcgMCAwIDAgNC40NiA0LjQ3WiIgc3R5bGU9InN0cm9rZTojNTU1NTU1O2ZpbGw6IzU1NTU1NTtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg=="
                    }
                    className="h-full"
                />
            </div>
        </div>
    );
}
