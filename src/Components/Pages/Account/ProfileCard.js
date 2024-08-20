import { ApiUrl } from "../../../config";
import { DefaultProfileImg } from "../../General/SVGIcon/DefaultProfileImg";

export default function ProfileCard({ profileImage, username, email, bio }) {
    return (
        <div className="w-[32rem] h-fit pb-[1rem] bg-mid rounded-xl shrink-0 flex flex-col items-center">
            <div className="w-[22rem] aspect-square bg-black rounded-full mt-[1rem] overflow-hidden border-[3px] border-lightest">
                <img
                    src={
                        profileImage !== undefined
                            ? `${ApiUrl}/media/image/${profileImage}`
                            : DefaultProfileImg
                    }
                    className="w-full h-full object-cover"
                    alt="Profile"
                />
            </div>
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
        </div>
    );
}
