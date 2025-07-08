import * as BABYLON from "babylonjs";
import { createCamera } from "./camera";
import { createEnvironment } from "./environment";
import * as CANNON from "cannon-es";
import { createPlayer } from "./player";

export function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {

    //create the engine scene
    const scene = new BABYLON.Scene(engine);

    // Enable physics in the scene
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin(true, 10, CANNON));

    //create the player character
    const { rig, body, cameraPivot } = createPlayer(scene);

    //create the camera
    const camera = createCamera(scene, canvas, rig);

    camera.parent = cameraPivot;
    camera.position = new BABYLON.Vector3(0, 1, 0); // 1 unit above the pivot

    //create the physical environment
    createEnvironment(scene);

    return scene;
}