import { useContext, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { SceneViewerContext } from "../../../App";
import SVGIcon from "../SVGIcon/SVGIcon";
import { CloseIcon } from "../SVGIcon/icons";
import { ApiUrl } from "../../../config";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";
import RenderBG from "./RenderBG.exr";

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

        const renderer = new THREE.WebGLRenderer();
        const clock = new THREE.Clock();
        let mixer; // Animation Mixer

        new EXRLoader().load(RenderBG, function (texture) {
            const pmremGenerator = new THREE.PMREMGenerator(renderer);
            pmremGenerator.compileEquirectangularShader();
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture;
            scene.environment =
                pmremGenerator.fromEquirectangular(texture).texture;

            pmremGenerator.dispose();
        });

        // Model processing:
        const loader = new GLTFLoader();
        loader.load(ApiUrl + "/media/model/" + sceneSettings.model, (gltf) => {
            scene.add(gltf.scene);
            mixer = new THREE.AnimationMixer(gltf.scene);
            for (let i = 0; i < gltf.animations.length; i++) {
                const action = mixer.clipAction(gltf.animations[i]);
                action.play();
            }
        });

        camera.position.z = 5;

        renderer.setSize(divContainer.clientWidth, divContainer.clientHeight);
        divContainer.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        function animate() {
            controls.update();
            renderer.render(scene, camera);
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
