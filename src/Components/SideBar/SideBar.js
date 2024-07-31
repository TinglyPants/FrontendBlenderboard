export default function SideBar({ children }) {
    return (
        <div className="h-full w-[20rem] pt-[5rem] bg-mid text-white flex flex-col">
            {children}
        </div>
    );
}
