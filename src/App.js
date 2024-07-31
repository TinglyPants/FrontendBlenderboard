import Logo from "./Components/NavBar/Logo";
import NavBar from "./Components/NavBar/NavBar";
import Profile from "./Components/NavBar/Profile";
import SearchBar from "./Components/NavBar/SearchBar";
import SideBar from "./Components/SideBar/SideBar";
import SideBarItem from "./Components/SideBar/SideBarItem";
import {
    HomeIcon,
    ProfileIcon,
    SearchIcon,
} from "./Components/General/SVGIcon/icons";

export default function App() {
    return (
        <div className="w-screen h-screen bg-black flex flex-col">
            <NavBar>
                <Logo />
                <SearchBar />
                <Profile
                    username={"Cat#302241"}
                    email={
                        "EXAMPLE-TEXT EXAMPLE-TEXT EXAMPLE-TEXT EXAMPLE-TEXT EXAMPLE-TEXT EXAMPLE-TEXT"
                    }
                    image={
                        "https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg?auto=compress&cs=tinysrgb&w=600"
                    }
                />
            </NavBar>
            {/* flex div for sidebar and main content. */}
            <div className="w-full h-full">
                <SideBar>
                    <SideBarItem path={HomeIcon} text={"Home"} />
                    <SideBarItem path={SearchIcon} text={"Search"} />
                    <SideBarItem path={ProfileIcon} text={"Account"} />
                </SideBar>
            </div>
        </div>
    );
}
