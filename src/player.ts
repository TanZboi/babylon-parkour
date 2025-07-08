import * as BABYLON from "babylonjs";

export function createPlayer(scene: BABYLON.Scene): { rig: BABYLON.TransformNode, body: BABYLON.Mesh, cameraPivot: BABYLON.TransformNode } {
    // Create the main player rig node
    const rig = new BABYLON.TransformNode("playerRig", scene);

    // Create the player body (a physics-enabled sphere)
    const body = BABYLON.MeshBuilder.CreateSphere("playerBody", { diameter: 1 }, scene);
    body.position.y = 10;
    body.parent = rig;

    body.physicsImpostor = new BABYLON.PhysicsImpostor(
        body,
        BABYLON.PhysicsImpostor.SphereImpostor,
        { mass: 1, restitution: 0.1, friction: 1 },
        scene
    );

    // Create a camera pivot inside the rig, slightly above the body
    const cameraPivot = new BABYLON.TransformNode("cameraPivot", scene);
    cameraPivot.position.y = 0.3;
    cameraPivot.parent = rig;

    return { rig, body, cameraPivot };
}