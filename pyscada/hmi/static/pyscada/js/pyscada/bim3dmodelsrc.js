/*jshint esversion: 6*/
import { ContextMenu, NavCubePlugin, TreeViewPlugin, Viewer, XKTLoaderPlugin } from "@xeokit/xeokit-sdk";

const isBim3DModel = document.getElementById("isBim3DModel");

if (isBim3DModel) {
    const canvas = document.getElementById("3dmodel-canvas");
    canvas.style.position = "absolute";
    canvas.style.height = window.innerHeight - 200 + "px";
    const viewer = new Viewer({
        canvasId: "3dmodel-canvas",
        transparent: true,
    });

    viewer.camera.eye = [-3.933, 2.855, 27.018];
    viewer.camera.look = [4.400, 3.724, 8.899];
    viewer.camera.up = [-0.018, 0.999, 0.039];

    const loader = new XKTLoaderPlugin(viewer);

    const fileName = document.getElementById("isBim3DModel").getAttribute("fileName");
    const fileUrl = window.location.origin + document.getElementById("isBim3DModel").getAttribute("fileUrl");

    const model = loader.load({
        id: fileName,
        src: fileUrl,
        edges: true,
    });

    model.on("loaded", () => {
        canvas.style.position = "";
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
    });

    new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("model-tree-content-storeys"),
        autoExpandDepth: 1,
        hierarchy: "storeys"
    });

    new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("model-tree-content-types"),
        autoExpandDepth: 1,
        hierarchy: "types",
    });

    openTree = (event, tree) => {
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
    };

    window.onload = () => {
        document.getElementById("model-tree-tab").children[0].click();
    };

    lastDataShown = null;
    const modelContextMenu = new ContextMenu({
        items: [
            [
                {
                    title: "Get Data",
                    getEnabled: (context) => {
                        return document.querySelector("div[id='" + context.entity.id + "']") != null;
                    },
                    doAction: (context) => {
                        const container = document.querySelector("div[id='" + context.entity.id + "']");
                        if (container != lastDataShown) {
                            if (lastDataShown) {
                                lastDataShown.style.display = "none";
                            }
                            container.style.display = "";
                            lastDataShown = container;
                        }
                    }
                },
                {
                    title: "Inspect Properties",
                    doAction: (context) => {
                        const obj = viewer.metaScene.metaObjects[context.entity.id];
                        const propContainer = document.getElementById("class-properties-container");
                        propContainer.innerHTML = "Nom : " + obj.name + "<br/> Id : " + obj.id + "<br/> Class : " + obj.type + "<br/>";
                        for (const propName in obj.propertySets) {
                            const wrap = document.createElement("div");
                            wrap.className = "model-properties-wrap-collabsible";
                            const property = obj.propertySets[propName];
                            const inp = document.createElement("input");
                            inp.id = "collapsible" + obj + propName;
                            inp.className = "model-properties-toggle";
                            inp.type = "checkbox";
                            wrap.appendChild(inp);
                            const label = document.createElement("label");
                            label.htmlFor = "collapsible" + obj + propName;
                            label.className = "model-properties-lbl-toggle";
                            label.innerHTML = property.name;
                            wrap.appendChild(label);
                            const content = document.createElement("div");
                            content.className = "model-properties-collapsible-content";
                            const inner = document.createElement("div");
                            inner.className = "model-properties-content-inner";
                            for (const set in property.properties) {
                                const p = document.createElement("p");
                                p.innerHTML = property.properties[set].name + " : " + property.properties[set].value + "<br/>";
                                inner.appendChild(p);
                            }
                            content.appendChild(inner);
                            wrap.appendChild(content);
                            propContainer.appendChild(wrap);
                        }
                        if (propContainer != lastDataShown){
                            if (lastDataShown){
                                lastDataShown.style.display = "none";
                            }
                            propContainer.style.display = "";
                            lastDataShown = propContainer;
                        }
                    }
                }
            ]
        ]
    });

    viewer.cameraControl.on("rightClick", (e) => {
        const hit = viewer.scene.pick({
            canvasPos: e.canvasPos,
        });
        if (hit && hit.entity.isObject) {
            modelContextMenu.context = {
                viewer: viewer,
                entity: hit.entity,
            };
            modelContextMenu.show(e.pagePos[0], e.pagePos[1]);
        }
        e.event.preventDefault();
    });
}