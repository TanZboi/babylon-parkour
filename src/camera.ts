import * as BABYLON from "babylonjs";

export function createCamera(scene: BABYLON.Scene, canvas: HTMLCanvasElement, target: BABYLON.Node) {
    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 2, -10), scene);
    camera.attachControl(canvas, true);

    camera.lockedTarget = target; // Follow the player mesh

    camera.keysUp.push(87);    // W
    camera.keysDown.push(83);  // S
    camera.keysLeft.push(65);  // A
    camera.keysRight.push(68); // D

    canvas.tabIndex = 1;
    canvas.addEventListener("click", () => canvas.requestPointerLock());

    return camera;
}