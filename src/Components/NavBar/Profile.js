export default function Profile({ username, email, image }) {
    return (
        <div className="w-[24rem] h-full flex mx-[3rem] cursor-pointer py-[1.5rem]">
            <div className="pr-[1.25rem] max-w-[16rem]">
                <p className="text-white overflow-hidden text-ellipsis whitespace-nowrap">
                    {username}
                </p>
                <p className="text-lightest overflow-hidden text-ellipsis whitespace-nowrap">
                    {email}
                </p>
            </div>
            <div className="rounded-full overflow-hidden aspect-square flex flex-col items-center bg-black shrink-0 mr-[1.5rem]">
                <img alt="User Profile" src={image} className="h-full" />
            </div>
        </div>
    );
}
