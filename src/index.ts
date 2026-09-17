import "./blocks/os";
import "./blocks/screen";
import "./blocks/pointer";
import "./blocks/window";
import "./blocks/messaging";
import "./blocks/projectState";
import "./blocks/notification";
import { icon } from "./icon";
import { buildExtensionBlocks, getMenus, getMethods } from "./registry";


; (function (Scratch) {
    if (!Scratch.extensions.unsandboxed) {
        throw new Error("Please run Tauri Extension without sandbox!")
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
