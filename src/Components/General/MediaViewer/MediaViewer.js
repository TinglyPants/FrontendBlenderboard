import { useState } from "react";
import SVGIcon from "../SVGIcon/SVGIcon";
import { nextArrowIcon, prevArrowIcon } from "../SVGIcon/icons";

export default function MediaViewer({ mediaIDs }) {
    const [mediaIndex, setMediaIndex] = useState(0);

    const cycleNext = () => {
        if (mediaIndex === mediaIDs.length - 1) {
            setMediaIndex(0);
            return;
        }
        setMediaIndex((prev) => prev + 1);
    };

    const cyclePrev = () => {
        if (mediaIndex === 0) {
            setMediaIndex(mediaIDs.length - 1);
            return;
        }
        setMediaIndex((prev) => prev - 1);
    };
    return (
        <div className="flex-1 w-full flex overflow-hidden relative">
            {mediaIDs.map((id) => {
                return (
                    <div
                        className="p-[1rem] w-full flex-none flex duration-200"
                        style={{ translate: `${-100 * mediaIndex}%` }}
                    >
                        <img
                            alt=""
                            className="flex-1 object-contain bg-black"
                            src={`http://86.167.176.156:4000/media/image/${id}`}
                        />
                    </div>
                );
            })}
            {mediaIDs.length > 1 && (
                <>
                    <div
                        className="p-[1rem] absolute h-full w-[12rem] flex items-center justify-center group cursor-pointer"
                        onClick={cyclePrev}
                    >
                        <SVGIcon
                            path={prevArrowIcon}
                            size={
                                "w-[2.5rem] h-[2.5rem] group-hover:stroke-white opacity-0 group-hover:opacity-100 duration-100"
                            }
                        />
                    </div>
                    <div
                        className="p-[1rem] absolute right-0 h-full w-[12rem] flex items-center justify-center group"
                        onClick={cycleNext}
                    >
                        <SVGIcon
                            path={nextArrowIcon}
                            size={
                                "w-[2.5rem] h-[2.5rem] group-hover:stroke-white opacity-0 group-hover:opacity-100 duration-100"
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
}
