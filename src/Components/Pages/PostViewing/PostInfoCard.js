import ProfileImage from "../../General/ProfileImage/ProfileImage";

export default function PostInfoCard({
    title,
    description,
    profileImage,
    username,
    dateOfCreation,
}) {
    const dateStringToFormattedDate = (initial) => {
        const date = new Date(Date.parse(initial));
        const day = date.getDate();
        const month = date.getMonth() + 1; // months are zero based for some reason
        const year = date.getFullYear();

        return [
            (day > 9 ? "" : "0") + day,
            (month > 9 ? "" : "0") + month,
            year,
        ].join("/");
    };

    return (
        <div className="w-[32rem] h-fit bg-mid rounded-xl shrink-0 flex flex-col items-center pb-[1rem]">
            <h1 className="w-full text-white text-3xl px-[1rem] mt-[1rem]">
                {title}
            </h1>
            <div className="px-[1rem] w-full">
                <p className="w-full text-white p-[0.5rem] mt-[0.75rem] hyphens-auto break-words bg-black rounded-lg">
                    {description}
                </p>
            </div>
            <div className="w-full flex flex-row-reverse mt-[1rem] mr-[2rem]">
                <ProfileImage profileImage={profileImage} />
                <div className="flex flex-col h-[4rem] mr-[1rem] justify-evenly">
                    <h2 className="w-full text-white text-right">{username}</h2>
                    <p className="text-right text-lightest">
                        {dateStringToFormattedDate(dateOfCreation)}
                    </p>
                </div>
            </div>
        </div>
    );
}
