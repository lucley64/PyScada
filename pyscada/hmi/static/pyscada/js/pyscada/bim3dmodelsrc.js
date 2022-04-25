import { Viewer, XKTLoaderPlugin } from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es";

const isBim3DModel = document.getElementById("isBim3DModel");

if (isBim3DModel) {
    const viewer = new Viewer({
        canvasId: "3dmodel-canvas",
        transparent: true,
    });

    viewer.camera.eye = [-3.933, 2.855, 27.018];
    viewer.camera.look = [4.400, 3.724, 8.899];
    viewer.camera.up = [-0.018, 0.999, 0.039];

    const loader = new XKTLoaderPlugin(viewer);

    const fileName = document.getElementById("isBim3DModel").getAttribute("fileName");
    const fileUrl = window.location.origin +  document.getElementById("isBim3DModel").getAttribute("fileUrl")

    const model = loader.load({
        id: fileName,
        src: fileUrl,
        edges: true,
    })
}