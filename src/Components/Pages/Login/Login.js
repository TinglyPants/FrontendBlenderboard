import { useContext, useState } from "react";
import BlenderboardIcon from "../../General/SVGIcon/BlenderboardIcon";
import { ErrorContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { SignupPath } from "../paths";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setErrorMessage = useContext(ErrorContext)[1];
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetch("http://localhost:4000/users/login", {
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
                        Log in!
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

                    <div className="flex flex-row items-center mt-[0.65rem]">
                        <input
                            type="checkbox"
                            className="size-[1.25rem] accent-highlight"
                            onClick={() => {
                                let passwordInput =
                                    document.getElementById("passwordInput");

                                if (passwordInput.type === "password") {
                                    passwordInput.type = "text";
                                } else {
                                    passwordInput.type = "password";
                                }
                            }}
                        />
                        <p className="ml-[0.5rem]">Show Password</p>
                    </div>

                    <input
                        type="submit"
                        className="w-[12rem] bg-highlight rounded-full p-[0.5rem] mt-[1rem] cursor-pointer"
                    />
                </form>
                <p className="mt-[1.5rem]">
                    New here?{" "}
                    <button
                        className="underline text-blue-400"
                        onClick={() => {
                            navigate(SignupPath);
                        }}
                    >
                        Sign up!
                    </button>
                </p>
            </div>
        </div>
    );
}
