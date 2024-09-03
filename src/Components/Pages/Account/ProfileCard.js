import { jwtDecode } from "jwt-decode";
import ProfileImage from "../../General/ProfileImage/ProfileImage";
import { useNavigate } from "react-router-dom";

export default function ProfileCard({
    profileImage,
    username,
    email,
    bio,
    _id,
}) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event("storage"));
        navigate("/");
    };
    return (
        <div className="w-[32rem] h-fit pb-[1rem] bg-mid rounded-xl shrink-0 flex flex-col items-center">
            <ProfileImage
                profileImage={profileImage}
                size="w-[22rem] h-[22rem] mt-[1rem] border-[3px] border-lightest"
            />
            <h1 className="w-full text-white text-3xl px-[1rem] mt-[1rem]">
                {username}
            </h1>
            <h2 className="w-full text-lightest text-lg px-[1rem]">{email}</h2>
            <div className="px-[1rem] w-full">
                {bio ? (
                    <p className="w-full text-white p-[0.5rem] mt-[0.75rem] hyphens-auto break-words bg-black rounded-lg">
                        {bio}
                    </p>
                ) : null}
            </div>
            {localStorage.getItem("accessToken") !== null ? (
                <>
                    {_id ===
                    jwtDecode(localStorage.getItem("accessToken"))._id ? (
                        <button
                            className="text-white bg-red-500 rounded-lg p-[0.75rem] mt-[1rem]"
                            onClick={handleLogout}
                        >
                            Logout?
                        </button>
                    ) : null}
                </>
            ) : null}
        </div>
    );
}
