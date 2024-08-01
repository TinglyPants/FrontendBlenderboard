import SVGIcon from "../General/SVGIcon/SVGIcon";

export default function SideBarItem({ SVGpath, text, path }) {
    return (
        <div className="flex h-[4rem] mx-[1rem] mt-[0.5rem] items-center pl-[4rem] cursor-pointer group">
            <SVGIcon
                path={SVGpath}
                name={text}
                size={"w-[2.5rem] h-[2.5rem]"}
            />
            <p className="text-xl group-hover:text-highlight">{text}</p>
        </div>
    );
}
