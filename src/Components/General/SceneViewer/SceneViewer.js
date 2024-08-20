import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SceneViewerContext } from "../../../App";
import SVGIcon from "../SVGIcon/SVGIcon";
import { CloseIcon } from "../SVGIcon/icons";

export default function SceneViewer() {
    const showAxes = useRef(false);
    const [sceneSettings, setSceneSettings] = useContext(SceneViewerContext);

    useEffect(() => {
        const divContainer = document.getElementById("scene-container");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            divContainer.clientWidth / divContainer.clientHeight,
            0.1,
            1000
        );

        const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
        scene.add(ambientLight);

        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(divContainer.clientWidth, divContainer.clientHeight);
        divContainer.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        function animate() {
            controls.update();
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);

        return () => {
            divContainer.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [showAxes]);

    return (
        <div
            className="bg-black absolute m-[2rem]"
            style={{
                width: "calc(100vw - 4rem)",
                height: "calc(100vh - 4rem)",
                zIndex: 2,
            }}
            id="scene-container"
        >
            <SVGIcon
                path={CloseIcon}
                name="Close Renderer"
                size="w-8 h-8 absolute right-[1rem] top-[1rem]"
                onClick={() => {
                    setSceneSettings({
                        ...sceneSettings,
                        sceneViewerEnabled: false,
                    });
                }}
            />
        </div>
    );
}
