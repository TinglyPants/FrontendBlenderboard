export default function Profile({ username, email, image }) {
    return (
        <div className="w-[24rem] h-full flex mx-[3rem] cursor-pointer py-[1.5rem]">
            <div className="pr-[1.25rem]">
                <p className="text-white">{username}</p>
                <p className="text-lightest">{email}</p>
            </div>
            <div className="rounded-full overflow-hidden aspect-square flex flex-col items-center bg-black">
                <img alt="User Profile" src={image} className="h-full" />
            </div>
        </div>
    );
}
