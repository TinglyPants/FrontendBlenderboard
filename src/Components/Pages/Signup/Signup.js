import { useContext, useState } from "react";
import BlenderboardIcon from "../../General/SVGIcon/BlenderboardIcon";
import { ErrorContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { LoginPath } from "../paths";
import { ApiUrl } from "../../../config";
import { DefaultProfileImg } from "../../General/SVGIcon/DefaultProfileImg";
import ProfileImage from "../../General/ProfileImage/ProfileImage";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [profileImage, setProfileImage] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);

    const setErrorMessage = useContext(ErrorContext)[1];
    const navigate = useNavigate();

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

        if (passwordConfirm !== password) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${ApiUrl}/users/create`, {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                let receivedToken = (await response.json()).accessToken;
                localStorage.setItem("accessToken", receivedToken);
                window.dispatchEvent(new Event("storage"));
                navigate("/");
            } else {
                setErrorMessage(`${await response.text()}`);
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
                        accept=".png, .jpg, .jpeg, .gif, .webp"
                    />
                    <input
                        type="submit"
                        className="w-[12rem] bg-highlight rounded-full p-[0.5rem] mt-[1rem] cursor-pointer"
                    />
                </form>
                <ProfileImage
                    profileImage={previewImage}
                    size="w-[12rem] h-[12rem] my-[1rem]"
                    dataURL
                />
                <p>
                    Been here already?{" "}
                    <button
                        className="underline text-blue-400"
                        onClick={() => {
                            navigate(LoginPath);
                        }}
                    >
                        Log in!
                    </button>
                </p>
            </div>
        </div>
    );
}
