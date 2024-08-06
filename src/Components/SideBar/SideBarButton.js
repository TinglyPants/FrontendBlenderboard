import { useNavigate } from "react-router-dom";

export default function SideBarButton({ text, path }) {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(path);
    };

    return (
        <button
            className="bg-highlight rounded-full w-[9rem] p-[0.85rem] mt-[1.5rem] text-xl font-semibold text-nowrap self-center"
            onClick={handleRedirect}
        >
            {text}
        </button>
    );
}
