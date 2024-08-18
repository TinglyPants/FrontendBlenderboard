import { useState } from "react";
import SVGIcon from "../SVGIcon/SVGIcon";
import { nextArrowIcon, prevArrowIcon } from "../SVGIcon/icons";
import { ApiUrl } from "../../../config";

export default function MediaViewer({ videoID, imageIDs }) {
    const [mediaIndex, setMediaIndex] = useState(0);

    let totalLength = imageIDs.length;

    if (videoID !== undefined) {
        totalLength += 1;
    }

    const cycleNext = () => {
        if (mediaIndex === totalLength - 1) {
            setMediaIndex(0);
            return;
        }
        setMediaIndex((prev) => prev + 1);
    };

    const cyclePrev = () => {
        if (mediaIndex === 0) {
            setMediaIndex(totalLength - 1);
            return;
        }
        setMediaIndex((prev) => prev - 1);
    };
    return (
        <div className="flex-1 w-full flex overflow-hidden relative select-none">
            {videoID !== undefined && (
                <div
                    className="p-[1rem] w-full flex-none flex duration-200"
                    style={{ translate: `${-100 * mediaIndex}%` }}
                >
                    <video controls className="flex-1 bg-black px-[12rem]">
                        <source src={`${ApiUrl}/media/video/${videoID}`} />
                    </video>
                </div>
            )}
            {imageIDs.map((id) => {
                return (
                    <div
                        className="p-[1rem] w-full flex-none flex duration-200"
                        style={{ translate: `${-100 * mediaIndex}%` }}
                    >
                        <img
                            alt=""
                            className="flex-1 object-contain bg-black"
                            src={`${ApiUrl}/media/image/${id}`}
                        />
                    </div>
                );
            })}
            {totalLength > 1 && (
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
                        className="p-[1rem] absolute right-0 h-full w-[12rem] flex items-center justify-center group cursor-pointer"
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
