import { useState } from "react";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState(undefined);

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

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
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
                <h1 className="font-semibold text-[4rem]">Sign up!</h1>
                <form className="w-full mt-[1rem] flex flex-col items-center">
                    <input
                        placeholder="Email"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.5rem]"
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem]"
                    />
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem]"
                    />
                    <div className="flex flex-row items-center mt-[0.65rem]">
                        <input
                            type="checkbox"
                            className="size-[1.25rem] accent-highlight"
                        />
                        <p className="ml-[0.5rem]">Show Password</p>
                    </div>
                    <input
                        placeholder="Username"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem]"
                    />
                    <textarea
                        placeholder="Bio (Optional)"
                        className="bg-black text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem] h-[4rem] max-h-[12rem]"
                    />
                    <input
                        type="file"
                        className="bg-highlight text-white p-[0.5rem] rounded-lg w-[30rem] mt-[0.65rem]"
                    />
                </form>
                <div className="w-[12rem] my-[3rem] rounded-full overflow-hidden aspect-square flex flex-col items-center bg-black shrink-0">
                    {(
                        <img
                            className="h-full"
                            src={profileImage}
                            alt="Preview"
                        />
                    ) && true}
                </div>
            </div>
        </div>
    );
}
