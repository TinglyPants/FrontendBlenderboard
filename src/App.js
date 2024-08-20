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
import {
    AccountPath,
    CreatePath,
    HomePath,
    LoginPath,
    PostViewingPath,
    SignupPath,
} from "./Components/Pages/paths";
import PostCreation from "./Components/Pages/PostCreation/PostCreation";
import SideBarButton from "./Components/SideBar/SideBarButton";
import Home from "./Components/Pages/Home/Home";
import Signup from "./Components/Pages/Signup/Signup";
import ErrorViewer from "./Components/General/ErrorViewer/ErrorViewer";
import { createContext, useState } from "react";
import Login from "./Components/Pages/Login/Login";
import Account from "./Components/Pages/Account/Account";
import SideBarAccount from "./Components/SideBar/SideBarAccount";
import SceneViewer from "./Components/General/SceneViewer/SceneViewer";
import PostViewing from "./Components/Pages/PostViewing/PostViewing";

export const ErrorContext = createContext();
export const SceneViewerContext = createContext();

export default function App() {
    const [errorMessage, setErrorMessage] = useState("");
    const [sceneSettings, setSceneSettings] = useState({
        sceneViewerEnabled: false,
        modelFilename: undefined,
        modelType: undefined,
    });
    return (
        <div className="w-screen h-screen flex flex-col font-poppins bg-black">
            <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
                <SceneViewerContext.Provider
                    value={[sceneSettings, setSceneSettings]}
                >
                    <ErrorViewer />
                    {sceneSettings.sceneViewerEnabled ? <SceneViewer /> : null}
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
                            <SideBarAccount
                                SVGpath={ProfileIcon}
                                text={"Account"}
                            />
                            <SideBarButton
                                text={"Create Post"}
                                path={CreatePath}
                            />
                        </SideBar>
                        <MainContent>
                            <Routes>
                                <Route
                                    exact
                                    path={HomePath}
                                    element={<Home />}
                                />
                                <Route
                                    exact
                                    path={CreatePath}
                                    element={<PostCreation />}
                                />
                                <Route
                                    exact
                                    path={SignupPath}
                                    element={<Signup />}
                                />
                                <Route
                                    exact
                                    path={LoginPath}
                                    element={<Login />}
                                />
                                <Route
                                    exact
                                    path={AccountPath}
                                    element={<Account />}
                                />
                                <Route
                                    exact
                                    path={PostViewingPath}
                                    element={<PostViewing />}
                                />
                            </Routes>
                        </MainContent>
                    </div>
                </SceneViewerContext.Provider>
            </ErrorContext.Provider>
        </div>
    );
}
