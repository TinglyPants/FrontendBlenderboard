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
import MainContent from "./Components/MainContent/MainContent";
import { Route, Routes } from "react-router-dom";
import { CreatePath, HomePath } from "./Components/Pages/paths";
import PostCreation from "./Components/Pages/PostCreation/PostCreation";
import SideBarButton from "./Components/SideBar/SideBarButton";
import Home from "./Components/Pages/Home/Home";

export default function App() {
    return (
        <div className="w-screen h-screen flex flex-col font-poppins">
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
            <div className="flex-1 flex flex-row overflow-hidden">
                <SideBar>
                    <SideBarItem
                        SVGpath={HomeIcon}
                        text={"Home"}
                        path={HomePath}
                    />
                    <SideBarItem SVGpath={SearchIcon} text={"Search"} />
                    <SideBarItem SVGpath={ProfileIcon} text={"Account"} />
                    <SideBarButton text={"Create Post"} path={CreatePath} />
                </SideBar>
                <MainContent>
                    <Routes>
                        <Route path={HomePath} element={<Home />} />
                        <Route path={CreatePath} element={<PostCreation />} />
                    </Routes>
                </MainContent>
            </div>
        </div>
    );
}
