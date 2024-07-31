import Logo from "./Components/NavBar/Logo";
import NavBar from "./Components/NavBar/NavBar";

export default function App() {
    return (
        <div className="w-screen h-screen bg-black">
            <NavBar>
                <Logo />
            </NavBar>
        </div>
    );
}
