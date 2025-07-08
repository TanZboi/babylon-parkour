import * as BABYLON from "babylonjs";

export function createEnvironment(scene: BABYLON.Scene) {
    scene.clearColor = new BABYLON.Color4(0.8, 0.9, 1, 1);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);

    //make ground static
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.2, friction: 1 },
        scene
    );

    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.2, 0.6, 0.2);
    ground.material = groundMat;

    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.y = 0.5;

    //make box affected by gravity
    box.physicsImpostor = new BABYLON.PhysicsImpostor(
        box,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 1, restitution: 0.1, friction: 1 },
        scene
    );

    box.position.y = 5;
}