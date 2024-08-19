import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function SceneViewer() {
    useEffect(() => {
        const divContainer = document.getElementById("scene-container");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            divContainer.clientWidth / divContainer.clientHeight,
            0.1,
            1000
        );

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

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
    }, []);

    return (
        <div
            className="bg-black absolute m-[2rem]"
            style={{
                width: "calc(100vw - 4rem)",
                height: "calc(100vh - 4rem)",
            }}
            id="scene-container"
        ></div>
    );
}
