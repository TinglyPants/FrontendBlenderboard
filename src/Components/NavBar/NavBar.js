export default function NavBar({ children }) {
    return (
        <div className="h-[6rem] bg-light border-b-2 border-lightest flex flex-none">
            {children}
        </div>
    );
}
