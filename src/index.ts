import "./blocks/os";
import "./blocks/screen";
import "./blocks/pointer";
import "./blocks/window";
import "./blocks/messaging";
import "./blocks/projectState";
import "./blocks/notification";
import { icon } from "./icon";
import { buildExtensionBlocks, getMenus, getMethods } from "./registry";


; (async function (Scratch) {
    if (!Scratch.extensions.unsandboxed) {
        throw new Error("Please run Tauri Extension without sandbox!")
    }

    if (!window.__TAURI__) {
        const modal = await (ScratchBlocks as any).customPrompt({
            title: "Error",
        }, {
            content: { width: "500px" }
        }, [
            { name: "OK", role: "ok", callback: () => console.log("Confirmed") },
            { name: "Cancel", role: "close", callback: () => console.log("Cancelled") }
        ]);

        modal.appendChild(document.createTextNode("Please run this extension in PenguinDesktop.\nhttps://github.com/TheMallyGuy/penguin-desktop"));
    }

    const extension = {
        getInfo() {
            return {
                id: 'tauriExtension',
                name: "Tauri extension",
                color1: "#f1b62b",
                blockIconURI: icon,
                blocks: buildExtensionBlocks(),
                menus: getMenus()
            }
        },
        ...getMethods()
    }

    Scratch.extensions.register(extension)
})(Scratch)
