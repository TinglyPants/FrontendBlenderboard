import MediaViewer from "../../General/MediaViewer/MediaViewer";

export default function PostMediaCard({ videoID, imageIDs, modelID }) {
    return (
        <div className="w-full max-h-[44rem] flex flex-col ml-[1rem] bg-mid rounded-xl">
            <MediaViewer videoID={videoID} imageIDs={imageIDs} />
        </div>
    );
}
