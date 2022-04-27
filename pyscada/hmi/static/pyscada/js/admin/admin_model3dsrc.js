/*jshint esversion: 6 */
import { NavCubePlugin, Viewer, XKTLoaderPlugin } from "@xeokit/xeokit-sdk";

const viewer = new Viewer({
    canvasId: "model-canvas",
    transparent: true,
});

viewer.camera.eye = [-3.933, 2.855, 27.018];
viewer.camera.look = [4.400, 3.724, 8.899];
viewer.camera.up = [-0.018, 0.999, 0.039];

new NavCubePlugin(viewer, {
    canvasId: "navcube-canvas",
    color: "lightblue",
    visible: true,
    cameraFly: true,
    cameraFitFOV: 45,
    cameraFlyDuration: 0.5,
});

const loader = new XKTLoaderPlugin(viewer);

const file = document.querySelectorAll("p.file-upload > a[href]")[0].getAttribute("href");

const model = loader.load({
    id: file,
    src: file,
    edges: true,
});