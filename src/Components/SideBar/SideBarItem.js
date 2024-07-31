import SVGIcon from "../General/SVGIcon/SVGIcon";

export default function SideBarItem({ path, text, redirect }) {
    return (
        <div className="flex h-[4rem] mx-[1rem] mt-[0.5rem] items-center pl-[4rem] cursor-pointer">
            <SVGIcon path={path} name={text} size={"w-[2.5rem] h-[2.5rem]"} />
            <p className="text-xl">{text}</p>
        </div>
    );
}
