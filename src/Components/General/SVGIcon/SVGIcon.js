export default function SVGIcon({ path, onClick, name, size = "w-8 h-8" }) {
    // Example for size prop usage: size={"w-[1.2rem] h-[2.8rem]"}
    return (
        <svg
            className={`${size} stroke-white mx-2 group-hover:stroke-highlight hover:stroke-highlight`}
            viewBox="0 0 24 24"
            fill="none"
            title={name}
            onClick={onClick}
        >
            <path d={path} />
        </svg>
    );
}
