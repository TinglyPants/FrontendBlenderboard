import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { SceneViewerContext } from "../../../App";
import SVGIcon from "../SVGIcon/SVGIcon";
import { CloseIcon } from "../SVGIcon/icons";
import { ApiUrl } from "../../../config";

export default function SceneViewer() {
    const showAxes = useRef(false);
    const [sceneSettings, setSceneSettings] = useContext(SceneViewerContext);

    const wireframeEvent = new CustomEvent("wireframe");
    const handleWireframe = () => {
        document
            .getElementById("scene-container")
            .dispatchEvent(wireframeEvent);
    };

    useEffect(() => {
        const divContainer = document.getElementById("scene-container");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            divContainer.clientWidth / divContainer.clientHeight,
            0.1,
            1000
        );

        const ambientLight = new THREE.AmbientLight(0x404040, 200); // soft white light
        scene.add(ambientLight);

        // Model processing:

        const sceneGlobalMaterial = new THREE.MeshStandardMaterial();
        sceneGlobalMaterial.color = new THREE.Color(0x12f43e);

        divContainer.addEventListener("wireframe", () => {
            sceneGlobalMaterial.wireframe = true;
        });

        switch (sceneSettings.modelType) {
            case "obj":
                const objLoader = new OBJLoader();
                objLoader.load(
                    `${ApiUrl}/media/model/${sceneSettings.modelFilename}`,
                    (object) => {
                        object.traverse((child) => {
                            if (child.isMesh) {
                                child.material = sceneGlobalMaterial;
                            }
                        });
                        scene.add(object);
                    }
                );
                break;
            case "fbx":
                const fbxLoader = new FBXLoader();
                fbxLoader.load(
                    `${ApiUrl}/media/model/${sceneSettings.modelFilename}`,
                    (object) => {
                        scene.add(object);
                    }
                );
                break;
            case "stl":
                const stlLoader = new STLLoader();
                stlLoader.load(
                    `${ApiUrl}/media/model/${sceneSettings.modelFilename}`,
                    (geometry) => {
                        // Create a mesh from the geometry
                        const material = new THREE.MeshStandardMaterial({
                            color: 0x00ff00,
                        });
                        const mesh = new THREE.Mesh(geometry, material);

                        scene.add(mesh);
                    }
                );
                break;
            // To be added
            case "gltf":
                break;
            case "glb":
                break;
            case "dae":
                break;
            default:
                console.log("Unknown model type.");
        }

        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(divContainer.clientWidth, divContainer.clientHeight);
        divContainer.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        console.log(scene);

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
            <button className="absolute" onClick={handleWireframe}>
                Click
            </button>
        </div>
    );
}
