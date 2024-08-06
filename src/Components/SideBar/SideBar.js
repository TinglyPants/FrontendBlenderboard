export default function SideBar({ children }) {
    return (
        <div className="bg-mid w-[22rem] h-full text-white border-r-2 border-lightest flex flex-col">
            {children}
        </div>
    );
}
