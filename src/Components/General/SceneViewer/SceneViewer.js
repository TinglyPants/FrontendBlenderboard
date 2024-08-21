import { useContext, useEffect } from "react";
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

        const ambientLight = new THREE.AmbientLight(0x404040, 200); // soft white light
        scene.add(ambientLight);

        // Model processing:

        const sceneGlobalMaterial = new THREE.MeshStandardMaterial();
        sceneGlobalMaterial.color = new THREE.Color(0x808080);
        const textureLoader = new THREE.TextureLoader();

        if (sceneSettings.model.AlbedoMap) {
            const albedoTexture = textureLoader.load(
                `${ApiUrl}/media/map/${sceneSettings.model.AlbedoMap}`
            );
            sceneGlobalMaterial.map = albedoTexture;
        }
        if (sceneSettings.model.AlphaMap) {
            const alphaTexture = textureLoader.load(
                `${ApiUrl}/media/map/${sceneSettings.model.AlphaMap}`
            );
            sceneGlobalMaterial.alphaMap = alphaTexture;
        }
        if (sceneSettings.model.AmbientOcclusionMap) {
            const ambientOcclusionTexture = textureLoader.load(
                `${ApiUrl}/media/map/${sceneSettings.model.AmbientOcclusionMap}`
            );
            sceneGlobalMaterial.aoMap = ambientOcclusionTexture;
        }
        if (sceneSettings.model.BumpMap) {
            const bumpTexture = textureLoader.load(
                `${ApiUrl}/media/map/${sceneSettings.model.BumpMap}`
            );
            sceneGlobalMaterial.bumpMap = bumpTexture;
        }
        if (sceneSettings.model.DisplacementMap) {
            const displacementTexture = textureLoader.load(
                `${ApiUrl}/media/map/${sceneSettings.model.DisplacementMap}`
            );
            sceneGlobalMaterial.displacementMap = displacementTexture;
        }
        if (sceneSettings.model.EmissiveMap) {
            const emissiveTexture = textureLoader.load(
                `${ApiUrl}/media/map/${sceneSettings.model.EmissiveMap}`
            );
            sceneGlobalMaterial.emissive = new THREE.Color(0xffffff);
            sceneGlobalMaterial.emissiveMap = emissiveTexture;
        }
        if (sceneSettings.model.MetalnessMap) {
            const metalnessTexture = textureLoader.load(
                `${ApiUrl}/media/map/${sceneSettings.model.MetalnessMap}`
            );
            sceneGlobalMaterial.metalness = 1.0;
            sceneGlobalMaterial.metalnessMap = metalnessTexture;
        }
        if (sceneSettings.model.NormalMap) {
            const normalTexture = textureLoader.load(
                `${ApiUrl}/media/map/${sceneSettings.model.NormalMap}`
            );
            sceneGlobalMaterial.normalMap = normalTexture;
            if (sceneSettings.model.IsTangentSpace === true) {
                sceneGlobalMaterial.normalMapType = THREE.TangentSpaceNormalMap;
            } else {
                sceneGlobalMaterial.normalMapType = THREE.ObjectSpaceNormalMap;
            }
        }
        if (sceneSettings.model.RoughnessMap) {
            const roughnessTexture = textureLoader.load(
                `${ApiUrl}/media/map/${sceneSettings.model.RoughnessMap}`
            );
            sceneGlobalMaterial.roughness = 1.0;
            sceneGlobalMaterial.roughnessMap = roughnessTexture;
        }

        switch (sceneSettings.model.Mesh.split(".")[1]) {
            case "obj":
                const objLoader = new OBJLoader();
                objLoader.load(
                    `${ApiUrl}/media/mesh/${sceneSettings.model.Mesh}`,
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
                    `${ApiUrl}/media/mesh/${sceneSettings.model.Mesh}`,
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
            case "stl":
                const stlLoader = new STLLoader();
                stlLoader.load(
                    `${ApiUrl}/media/mesh/${sceneSettings.model.Mesh}`,
                    (geometry) => {
                        // Create a mesh from the geometry
                        const material = sceneGlobalMaterial;
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

        function animate() {
            controls.update();
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);

        return () => {
            divContainer.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

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
