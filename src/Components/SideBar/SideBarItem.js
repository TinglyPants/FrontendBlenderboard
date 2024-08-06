import { useNavigate } from "react-router-dom";
import SVGIcon from "../General/SVGIcon/SVGIcon";

export default function SideBarItem({ SVGpath, text, path }) {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(path);
    };

    return (
        <div
            className="flex h-[4rem] mx-[1rem] mt-[0.5rem] items-center cursor-pointer group self-center"
            onClick={handleRedirect}
        >
            <SVGIcon
                path={SVGpath}
                name={text}
                size={"w-[2.5rem] h-[2.5rem]"}
            />
            <p className="text-xl group-hover:text-highlight">{text}</p>
        </div>
    );
}
