import { useState } from "react";
import SVGIcon from "../General/SVGIcon/SVGIcon";
import { SearchIcon } from "../General/SVGIcon/icons";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery === "") {
            navigate("/");
            return;
        }
        navigate(`/results/${searchQuery}`);
    };
    return (
        <div className="w-full h-full flex items-center">
            <div className="bg-lightest w-full h-[3rem] rounded-full flex items-center px-[0.25rem]">
                <SVGIcon
                    path={SearchIcon}
                    name="Search"
                    onClick={handleSearch}
                />
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        className="text-white w-full mr-[1rem] bg-lightest focus:outline-none text-[1.1rem]"
                    />
                </form>
            </div>
        </div>
    );
}
