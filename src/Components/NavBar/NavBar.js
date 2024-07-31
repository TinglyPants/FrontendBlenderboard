export default function NavBar({ children }) {
    return (
        <div className="w-full h-[6rem] bg-light border-b-2 border-lightest flex flex-row">
            {children}
        </div>
    );
}
