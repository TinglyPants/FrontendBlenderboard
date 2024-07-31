import Logo from "./Components/NavBar/Logo";
import NavBar from "./Components/NavBar/NavBar";
import SearchBar from "./Components/NavBar/SearchBar";

export default function App() {
    return (
        <div className="w-screen h-screen bg-black">
            <NavBar>
                <Logo />
                <SearchBar />
            </NavBar>
        </div>
    );
}
