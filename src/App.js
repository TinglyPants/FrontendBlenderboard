import Logo from "./Components/NavBar/Logo";
import NavBar from "./Components/NavBar/NavBar";
import Profile from "./Components/NavBar/Profile";
import SearchBar from "./Components/NavBar/SearchBar";

export default function App() {
    return (
        <div className="w-screen h-screen bg-black">
            <NavBar>
                <Logo />
                <SearchBar />
                <Profile
                    username={"Cat#302241"}
                    email={"Cat#302241@catmail.com"}
                    image={
                        "https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg?auto=compress&cs=tinysrgb&w=600"
                    }
                />
            </NavBar>
        </div>
    );
}
