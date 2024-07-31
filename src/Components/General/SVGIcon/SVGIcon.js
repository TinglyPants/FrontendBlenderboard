export default function SVGIcon({ path, onClick, name }) {
    return (
        <svg
            className="w-8 h-8 stroke-white mx-2 group-hover:stroke-highlight hover:stroke-highlight"
            viewBox="0 0 24 24"
            fill="none"
            title={name}
            onClick={onClick}
        >
            <path d={path} />
        </svg>
    );
}
