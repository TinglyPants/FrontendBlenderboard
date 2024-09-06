import MediaViewer from "../../General/MediaViewer/MediaViewer";
import { CommentIcon, CubeIcon } from "../../General/SVGIcon/icons";
import SVGIcon from "../../General/SVGIcon/SVGIcon";
import { SceneViewerContext } from "../../../App";
import { ErrorContext } from "../../../App";
import { CommentCreationContext } from "./PostViewing";
import { useContext } from "react";

export default function PostMediaCard({ videoID, imageIDs, model }) {
    const setSceneSettings = useContext(SceneViewerContext)[1];
    const setErrorMessage = useContext(ErrorContext)[1];
    const [commentCreationData, setCommentCreationData] = useContext(
        CommentCreationContext
    );

    const handleOpenSceneViewer = () => {
        if (model !== undefined) {
            setSceneSettings({
                sceneViewerEnabled: true,
                model: model,
            });
        } else {
            setErrorMessage("This post does not have a 3D model!");
        }
    };

    const handleAddComment = () => {
        setCommentCreationData({ ...commentCreationData, isEditing: true });
    };
    return (
        <div className="w-full max-h-[44rem] flex flex-col ml-[1rem] bg-mid rounded-xl pb-[0.75rem]">
            <MediaViewer videoID={videoID} imageIDs={imageIDs} />
            <div className="w-full h-[3rem] flex">
                <SVGIcon
                    path={CubeIcon}
                    title="3D Viewer"
                    onClick={handleOpenSceneViewer}
                    size="w-[3rem] h-[3rem]"
                />
                <SVGIcon
                    path={CommentIcon}
                    title="Add Comment"
                    onClick={handleAddComment}
                    size="w-[3rem] h-[3rem]"
                />
            </div>
        </div>
    );
}
