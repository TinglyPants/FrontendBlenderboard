export default function MediaViewer({ mediaIDs }) {
    return <img src={`http://localhost:4000/media/image/${mediaIDs[0]}`} />;
}
