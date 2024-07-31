import SVGIcon from "../General/SVGIcon/SVGIcon";
import { SearchIcon } from "../General/SVGIcon/icons";

export default function SearchBar() {
    return (
        <div className="w-full h-full flex items-center">
            <div className="bg-lightest w-full h-[3rem] rounded-full flex items-center px-[0.25rem]">
                <SVGIcon path={SearchIcon} name="Search" />
                <input type="text" className="text-white w-full mr-[1rem]" />
            </div>
        </div>
    );
}
