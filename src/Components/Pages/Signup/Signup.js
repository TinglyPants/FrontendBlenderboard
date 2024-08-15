import { useState } from "react";
import BlenderboardIcon from "../../General/SVGIcon/BlenderboardIcon";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [profileImage, setProfileImage] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
        setPreviewImage(reader.result);
    });

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setPreviewImage(undefined);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("bio", bio);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profileImage", profileImage);

        try {
            const response = await fetch("http://localhost:4000/users/create", {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                console.log("Successful user creation.");
            } else {
                console.log(
                    `Error code: ${
                        response.status
                    }, message: ${await response.text()}`
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full h-full p-[1.5rem] bg-black text-white flex justify-center items-center">
            <div className="bg-mid h-fit w-[40rem] rounded-2xl flex flex-col items-center p-[0.75rem]">
                <div className="flex w-full h-[5rem] justify-center">
                    <BlenderboardIcon />
                    <h1 className="font-semibold text-[4rem] text-nowrap ml-[1rem]">
                        Sign up!
                    </h1>
                </div>

                <form
                    className="w-full mt-[1rem] flex flex-col items-center"
                    onSubmit={handleSubmit}
                >
                    <input
                        placeholder="Email"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.5rem]"
                        onChange={handleEmailChange}
                    />
                    <input
                        id="passwordInput"
                        placeholder="Password"
                        type="password"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem]"
                        onChange={handlePasswordChange}
                    />
                    <input
                        id="confirmPasswordInput"
                        placeholder="Confirm Password"
                        type="password"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem]"
                        onChange={handlePasswordConfirmChange}
                    />
                    <div className="flex flex-row items-center mt-[0.65rem]">
                        <input
                            type="checkbox"
                            className="size-[1.25rem] accent-highlight"
                            onClick={() => {
                                let passwordInput =
                                    document.getElementById("passwordInput");
                                let confirmPasswordInput =
                                    document.getElementById(
                                        "confirmPasswordInput"
                                    );

                                if (passwordInput.type === "password") {
                                    passwordInput.type = "text";
                                    confirmPasswordInput.type = "text";
                                } else {
                                    passwordInput.type = "password";
                                    confirmPasswordInput.type = "password";
                                }
                            }}
                        />
                        <p className="ml-[0.5rem]">Show Password</p>
                    </div>
                    <input
                        placeholder="Username"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem]"
                        onChange={handleUsernameChange}
                    />
                    <textarea
                        placeholder="Bio (Optional)"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem] h-[4rem] max-h-[12rem]"
                        onChange={handleBioChange}
                    />
                    <input
                        type="file"
                        className="bg-highlight text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem]"
                        onChange={handleProfileImageChange}
                    />
                    <input
                        type="submit"
                        className="w-[12rem] bg-highlight rounded-full p-[0.5rem] mt-[1rem]"
                    />
                </form>
                <div className="w-[12rem] my-[2rem] rounded-full overflow-hidden aspect-square flex flex-col items-center bg-black shrink-0">
                    <img
                        className="h-full"
                        src={
                            previewImage
                                ? previewImage
                                : // SVG by default
                                  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBMaWNlbnNlOiBBcGFjaGUuIE1hZGUgYnkgbGF3bmNoYWlybGF1bmNoZXI6IGh0dHBzOi8vZ2l0aHViLmNvbS9sYXduY2hhaXJsYXVuY2hlci9sYXduaWNvbnMgLS0+Cjxzdmcgdmlld0JveD0iLTQwIC00MCAyNzIgMjcyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggZD0iTTAgMGgxOTJ2MTkySDB6IiBzdHlsZT0iZmlsbDpub25lIi8+PGNpcmNsZSBjeD0iOTYiIGN5PSI0OC43OCIgcj0iMjYuNzgiIHN0eWxlPSJzdHJva2U6IzU1NTU1NTtzdHJva2Utd2lkdGg6MTJweDtmaWxsOm5vbmUiLz48cGF0aCBkPSJNMzAuMDYgMTIxYzguNzEtNy44OSAyOC42OS0yMC44NCA2NS45NC0yMC44NHM1Ny4yMyAxMi45NSA2NS45NCAyMC44NGMzLjkyIDMuNTQgNS40OCA4Ljc2IDUuNDggMTR2MjMuMTNBMTcuODUgMTcuODUgMCAwIDEgMTQ5LjU3IDE3Nkg0Mi40M2ExNy44NSAxNy44NSAwIDAgMS0xNy44NS0xNy44NlYxMzVjMC01LjI4IDEuNTYtMTAuNSA1LjQ4LTE0Wk05NiAxNjIuNjFoNTMuNTdhNC40NyA0LjQ3IDAgMCAwIDQuNDYtNC40N1YxMzVjMC0yLjkzLS44Ni0zLjkzLTEuMDctNC4xMy02LjM2LTUuNzUtMjMuMTYtMTcuMzctNTctMTcuMzdzLTUwLjYgMTEuNjItNTcgMTcuMzdjLS4yMS4yLTEuMDcgMS4yLTEuMDcgNC4xM3YyMy4xM2E0LjQ3IDQuNDcgMCAwIDAgNC40NiA0LjQ3WiIgc3R5bGU9InN0cm9rZTojNTU1NTU1O2ZpbGw6IzU1NTU1NTtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg=="
                        }
                        alt="Preview"
                    />
                </div>
            </div>
        </div>
    );
}
