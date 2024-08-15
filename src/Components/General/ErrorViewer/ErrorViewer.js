import { useContext } from "react";
import { ErrorContext } from "../../../App";
import SVGIcon from "../SVGIcon/SVGIcon";
import { CloseIcon } from "../SVGIcon/icons";

export default function ErrorViewer() {
    const [errorMessage, setErrorMessage] = useContext(ErrorContext);
    return (
        <>
            {errorMessage !== "" ? (
                <>
                    <div className="absolute flex justify-center w-full p-[1rem]">
                        <div className="p-[1.5rem] rounded-3xl border-[2px] border-red-400 bg-red-500 text-white flex items-center">
                            <p className="mr-[1rem]">{errorMessage}</p>
                            <SVGIcon
                                path={CloseIcon}
                                size={
                                    "w-8 h-8 hover:stroke-white cursor-pointer"
                                }
                                onClick={() => {
                                    setErrorMessage("");
                                }}
                            />
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
