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
        <div className="w-full h-full flex p-[1.5rem] bg-black text-white">
            <form
                className=" flex flex-col justify-evenly"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="username"
                    className="bg-mid"
                    onChange={handleUsernameChange}
                />
                <input
                    type="text"
                    placeholder="bio"
                    className="bg-mid"
                    onChange={handleBioChange}
                />
                <input
                    type="text"
                    placeholder="email"
                    className="bg-mid"
                    onChange={handleEmailChange}
                />
                <input
                    type="text"
                    placeholder="password"
                    className="bg-mid"
                    onChange={handlePasswordChange}
                />
                <input
                    type="file"
                    className="bg-mid"
                    onChange={handleProfileImageChange}
                />
                <input type="submit" />
            </form>
        </div>
    );
}
