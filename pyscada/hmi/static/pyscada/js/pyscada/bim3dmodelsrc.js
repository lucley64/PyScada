import { NavCubePlugin, TreeViewPlugin, Viewer, XKTLoaderPlugin } from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es";

const isBim3DModel = document.getElementById("isBim3DModel");

if (isBim3DModel) {
    const canvas = document.getElementById("3dmodel-canvas");
    canvas.style.position = "absolute"
    canvas.style.height = window.innerHeight-200 + "px";
    const viewer = new Viewer({
        canvasId: "3dmodel-canvas",
        transparent: true,
    });

    viewer.camera.eye = [-3.933, 2.855, 27.018];
    viewer.camera.look = [4.400, 3.724, 8.899];
    viewer.camera.up = [-0.018, 0.999, 0.039];

    const loader = new XKTLoaderPlugin(viewer);

    const fileName = document.getElementById("isBim3DModel").getAttribute("fileName");
    const fileUrl = window.location.origin + document.getElementById("isBim3DModel").getAttribute("fileUrl")

    const model = loader.load({
        id: fileName,
        src: fileUrl,
        edges: true,
    });

    model.on("loaded", () => {
        canvas.style.position = ""
    });

    const navCube = new NavCubePlugin(viewer, {
        canvasId: "nav-cube-canvas",
        color: "lightblue",
        visible: true,
        cameraFly: true,
        cameraFitFOV: 45,
        cameraFlyDuration: 0.5,
    });

    new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("model-tree-content-containment"),
        autoExpandDepth: 1,
        hierarchy: "containment",
        sortNodes: true,
    })

    new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("model-tree-content-storeys"),
        autoExpandDepth: 1,
        hierarchy: "storeys"
    })

    new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("model-tree-content-types"),
        autoExpandDepth: 1,
        hierarchy: "types",
    })

    openTree = (event, tree) =>{
        const tabContent = document.getElementsByClassName("model-tab-content");
        for (const i of tabContent) {
            i.style.display = "none";
        }

        const tabLinks = document.getElementsByClassName("model-tree-tab-links");
        for (const i of tabLinks) {
            i.className = i.className.replace(" active", "");
        }

        document.getElementById("model-tree-content-" + tree).style.display = "block";
        event.currentTarget.className += "active";
    }

    window.onload = () =>{
        document.getElementById("model-tree-tab").children[0].click();
    }
}