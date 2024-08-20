import { ApiUrl } from "../../../config";
import { DefaultProfileImg } from "../SVGIcon/DefaultProfileImg";

export default function ProfileImage({
    profileImage,
    size = "w-[4rem] h-[4rem]", // default value
}) {
    return (
        <div
            className={`rounded-full overflow-hidden aspect-square bg-black shrink-0 mr-[1.5rem] ${size}`}
        >
            <img
                alt="User Profile"
                src={
                    profileImage !== undefined
                        ? `${ApiUrl}/media/image/${profileImage}`
                        : DefaultProfileImg
                }
                className="h-full w-full object-cover"
            />
        </div>
    );
}
