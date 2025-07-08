import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

window.addEventListener('DOMContentLoaded', () => {
    console.log("✅ Babylon script loaded and running!");
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true);

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.8, 0.9, 1, 1); // light sky blue

    // Camera (WASD + mouse to look)
    const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 2, -10), scene);
    camera.attachControl(canvas, true);

    // Autofocus canvas when user clicks anywhere in the window
    window.addEventListener("click", () => {
        if (document.activeElement !== canvas) {
            canvas.focus();
        }
    });
    canvas.tabIndex = 1; // Make canvas focusable

    // Enable pointer lock on canvas click (FPS-style)
    canvas.addEventListener("click", () => {
        canvas.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
        if (document.pointerLockElement === canvas) {
            console.log("Pointer locked");
        } else {
            console.log("Pointer unlocked");
        }
    });
    camera.keysUp.push(87);    // W
    camera.keysDown.push(83);  // S
    camera.keysLeft.push(65);  // A
    camera.keysRight.push(68); // D
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.speed = 0.5;

    // Light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);

    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    (ground.material as BABYLON.StandardMaterial).diffuseColor = new BABYLON.Color3(0.2, 0.6, 0.2); // greenish

    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.y = 0.5;

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });
});