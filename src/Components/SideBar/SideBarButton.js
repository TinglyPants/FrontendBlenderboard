import { useNavigate } from "react-router-dom";

export default function SideBarButton({ text, path }) {
    const navigate = useNavigate;

    const handleRedirect = () => {
        navigate(path);
    };

    return (
        <button className="" onClick={handleRedirect}>
            {text}
        </button>
    );
}
