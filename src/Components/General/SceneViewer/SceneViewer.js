import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { SceneViewerContext } from "../../../App";
import SVGIcon from "../SVGIcon/SVGIcon";
import { CloseIcon } from "../SVGIcon/icons";
import { ApiUrl } from "../../../config";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";
import RenderBG from "./RenderBG.exr";
import UVChecker from "./UVChecker.png";

export default function SceneViewer() {
    const [sceneSettings, setSceneSettings] = useContext(SceneViewerContext);

    const showAxesHelper = useRef(false);
    const showGridHelper = useRef(false);

    let mixer; // Animation mixer
    const clock = new THREE.Clock();
    const scene = new THREE.Scene();
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    });
    const UVMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(UVChecker),
    });
    const NormalMaterial = new THREE.MeshNormalMaterial();
    const renderer = new THREE.WebGLRenderer();

    const axesHelper = new THREE.AxesHelper(100);
    const gridHelper = new THREE.GridHelper(100, 100);

    useEffect(() => {
        const divContainer = document.getElementById("scene-container");
        const camera = new THREE.PerspectiveCamera(
            75,
            divContainer.clientWidth / divContainer.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        // Load environment map
        new EXRLoader().load(RenderBG, function (texture) {
            const pmremGenerator = new THREE.PMREMGenerator(renderer);
            pmremGenerator.compileEquirectangularShader();
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture;
            scene.environment =
                pmremGenerator.fromEquirectangular(texture).texture;

            pmremGenerator.dispose();
        });

        // Load Scene
        new GLTFLoader().load(
            ApiUrl + "/media/model/" + sceneSettings.model,
            (gltf) => {
                scene.add(gltf.scene);
                if (gltf.animations.length > 0) {
                    mixer = new THREE.AnimationMixer(gltf.scene);
                    // Load all animations for scene
                    for (let i = 0; i < gltf.animations.length; i++) {
                        const action = mixer.clipAction(gltf.animations[i]);
                        action.play();
                    }
                }
            }
        );

        renderer.setSize(divContainer.clientWidth, divContainer.clientHeight);
        divContainer.appendChild(renderer.domElement);

        // Load orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);

        function animate() {
            controls.update();
            renderer.render(scene, camera);

            // Animate if not paused
            if (mixer) {
                mixer.update(clock.getDelta());
            }
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
                size="w-8 h-8 absolute right-[1rem] top-[1rem] mix-blend-difference hover:mix-blend-normal"
                onClick={() => {
                    setSceneSettings({
                        ...sceneSettings,
                        sceneViewerEnabled: false,
                    });
                }}
            />

            <div className="flex flex-col absolute p-[1rem] items-start">
                <button
                    className="h-8 text-white mix-blend-difference hover:text-highlight hover:mix-blend-normal"
                    onClick={() => {
                        clock.stop();
                    }}
                >
                    Pause Animation
                </button>
                <button
                    className="h-8 text-white mix-blend-difference hover:text-highlight hover:mix-blend-normal"
                    onClick={() => {
                        clock.start();
                    }}
                >
                    Play Animation
                </button>
                <button
                    className="h-8 text-white mix-blend-difference hover:text-highlight hover:mix-blend-normal"
                    onClick={() => {
                        if (mixer) {
                            mixer.update(-0.5);
                        }
                    }}
                >
                    Cycle Animation Backwards
                </button>
                <button
                    className="h-8 text-white mix-blend-difference hover:text-highlight hover:mix-blend-normal"
                    onClick={() => {
                        if (mixer) {
                            mixer.update(0.5);
                        }
                    }}
                >
                    Cycle Animation Forwards
                </button>
                <button
                    className="h-8 text-white mix-blend-difference hover:text-highlight hover:mix-blend-normal"
                    onClick={() => {
                        if (scene.overrideMaterial === wireframeMaterial) {
                            scene.overrideMaterial = null;
                        } else {
                            scene.overrideMaterial = wireframeMaterial;
                        }
                    }}
                >
                    Toggle Wireframe
                </button>
                <button
                    className="h-8 text-white mix-blend-difference hover:text-highlight hover:mix-blend-normal"
                    onClick={() => {
                        if (scene.overrideMaterial === UVMaterial) {
                            scene.overrideMaterial = null;
                        } else {
                            scene.overrideMaterial = UVMaterial;
                        }
                    }}
                >
                    Toggle UV Viewer
                </button>
                <button
                    className="h-8 text-white mix-blend-difference hover:text-highlight hover:mix-blend-normal"
                    onClick={() => {
                        if (scene.overrideMaterial === NormalMaterial) {
                            scene.overrideMaterial = null;
                        } else {
                            scene.overrideMaterial = NormalMaterial;
                        }
                    }}
                >
                    Toggle Normal Viewer
                </button>
                <button
                    className="h-8 text-white mix-blend-difference hover:text-highlight hover:mix-blend-normal"
                    onClick={() => {
                        if (!showAxesHelper.current) {
                            scene.add(axesHelper);
                        } else {
                            scene.remove(axesHelper);
                        }
                        showAxesHelper.current = !showAxesHelper.current;
                    }}
                >
                    Toggle Axes
                </button>
                <button
                    className="h-8 text-white mix-blend-difference hover:text-highlight hover:mix-blend-normal"
                    onClick={() => {
                        if (!showGridHelper.current) {
                            scene.add(gridHelper);
                        } else {
                            scene.remove(gridHelper);
                        }
                        showGridHelper.current = !showGridHelper.current;
                    }}
                >
                    Toggle Grid
                </button>
            </div>
        </div>
    );
}
