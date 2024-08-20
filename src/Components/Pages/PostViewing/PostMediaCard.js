import MediaViewer from "../../General/MediaViewer/MediaViewer";
import { CubeIcon } from "../../General/SVGIcon/icons";
import SVGIcon from "../../General/SVGIcon/SVGIcon";
import { SceneViewerContext } from "../../../App";
import { useContext } from "react";

export default function PostMediaCard({ videoID, imageIDs, modelID }) {
    const setSceneSettings = useContext(SceneViewerContext)[1];
    const handleOpenSceneViewer = () => {
        setSceneSettings({
            sceneViewerEnabled: true,
            modelFilename: modelID,
            modelType: modelID.split(".")[1],
        });
    };
    return (
        <div className="w-full max-h-[44rem] flex flex-col ml-[1rem] bg-mid rounded-xl pb-[0.75rem]">
            <MediaViewer videoID={videoID} imageIDs={imageIDs} />
            <SVGIcon
                path={CubeIcon}
                title="3D Viewer"
                onClick={handleOpenSceneViewer}
                size="w-[3rem] h-[3rem]"
            />
        </div>
    );
}
