/*jshint esversion: 6 */
import { ContextMenu, NavCubePlugin, Viewer, XKTLoaderPlugin } from "@xeokit/xeokit-sdk";

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

var lastColorized = null;
var lastColorize = null;

printDetails = (context) => {
    if (!lastColorized || context.entity.id != lastColorized.id) {
        if (lastColorized) {
            lastColorized.colorize = lastColorize;
        }
        lastColorized = context.entity;
        lastColorize = context.entity.colorize.slice();
        context.entity.colorize = [0.0, 0.1, 0.0];
    }
    document.getElementById("model-id-container").innerHTML = "<p>Name: " + viewer.metaScene.metaObjects[context.entity.id].name + " </p><p>Id: " + context.entity.id + "</p>";
};

const menu = new ContextMenu({
    items: [
        [
            {
                title: "Get ID",
                doAction: printDetails
            }
        ]
    ]
});

viewer.cameraControl.on("doublePicked", (e) => {
    const hit = viewer.scene.pick({
        canvasPos: e.canvasPos,
    });
    const context = {
        viewer: viewer,
        entity: hit.entity,
    };
    printDetails(context);
});

viewer.cameraControl.on("rightClick", (e) => {
    const hit = viewer.scene.pick({
        canvasPos: e.canvasPos,
    });

    if (hit && hit.entity.isObject) {
        menu.context = {
            viewer: viewer,
            entity: hit.entity,
        };

        menu.show(e.canvasPos[0], e.pagePos[1]);
    }

    e.event.preventDefault();
});

var lastEntity = null;

viewer.cameraControl.on("hover", (result) => {
    const hit = viewer.scene.pick({
        canvasPos: result.canvasPos,
    });
    if (hit) {
        if (!lastEntity || hit.entity.id != lastEntity.id) {
            if (lastEntity) {
                lastEntity.highlighted = false;
            }
            lastEntity = hit.entity;
            hit.entity.highlighted = true;
        }
    }
    else {
        if (lastEntity) {
            lastEntity.highlighted = false;
            lastEntity = null;
        }
    }
});

viewer.cameraControl.on("hoverOff", (e) => {
    if(lastEntity){
        lastEntity.highlighted = false;
        lastEntity = null;
    }
});