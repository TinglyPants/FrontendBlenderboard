export default function SideBar({ children }) {
    return (
        <div className="bg-mid w-[22rem] h-full pt-[4rem] text-white border-r-2 border-lightest flex flex-col">
            {children}
        </div>
    );
}
