import SVGIcon from "../General/SVGIcon/SVGIcon";

export default function SideBarItem({ path, text, redirect }) {
    return (
        <div className="flex h-[4rem] mx-[1rem] mt-[1rem] items-center pl-[5rem]">
            <SVGIcon path={path} name={text} size={"w-[2.5rem] h-[2.5rem]"} />
            <p className="text-xl ">{text}</p>
        </div>
    );
}
