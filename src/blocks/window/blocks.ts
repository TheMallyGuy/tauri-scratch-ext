import { invoke } from "@tauri-apps/api/core"
import { join, tempDir } from "@tauri-apps/api/path"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { Window } from "@tauri-apps/api/window"
import { registerBlock } from "../../registry"
import { createWebviewWindow } from "../../tauri/webivew"
import { getWindowByLabel, refreshWindowLabelCache, windowLabelArgument } from "./shared"

export const createWindowBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "createWindow",
    text: "Create window labeled [LABEL] with url [URL] title [TITLE] width [WIDTH] height [HEIGHT] clone current project? [CLONE_PROJECT] auto green flag [AUTO_GREEN_FLAG] hide stage controls [HIDE_STAGE_CONTROLS]",
    arguments: {
        LABEL: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "new-window"
        },
        URL: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: window.location.href
        },
        TITLE: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "New window"
        },
        WIDTH: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 800
        },
        HEIGHT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 600
        },
        CLONE_PROJECT: {
            type: Scratch.ArgumentType.BOOLEAN,
            defaultValue: true
        },
        AUTO_GREEN_FLAG: {
            type: Scratch.ArgumentType.BOOLEAN,
            defaultValue: true
        },
        HIDE_STAGE_CONTROLS: {
            type: Scratch.ArgumentType.BOOLEAN,
            defaultValue: true
        }
    }
} as const


const AUTO_GREEN_FLAG_PARAM = "tauriAutoGreenFlag"

const CLONE_PROJECT_PARAM = "cloneProjectFile"

if (new URLSearchParams(window.location.search).has(AUTO_GREEN_FLAG_PARAM)) {
    let pressed = false
    const press = () => {
        if (pressed) return
        pressed = true

        // we start son
        Scratch.vm.start()
        Scratch.vm.greenFlag()
    }

    const isReady = () =>
        Scratch.vm.runtime.targets.length > 0 &&
        Scratch.vm.runtime.getOpcodeFunction("tauriExtension_createWindow") !== undefined

    const pressWhenReady = () => {
        if (pressed || !isReady()) return
        press()
    }
    Scratch.vm.runtime.once("PROJECT_LOADED", pressWhenReady)
    pressWhenReady()
    const timer = setInterval(() => {
        if (pressed) {
            clearInterval(timer)
            return
        }
        pressWhenReady()
    }, 200)
}

if (new URLSearchParams(window.location.search).has("tauriHideStageControls")) {
    const style = document.createElement("style")
    style.textContent =
        '[class*="stage-header-wrapper-overlay"] { display: none !important; }' +
        '[class*="stage-wrapper"][class*="full-screen"] { top: 0 !important; }'
    document.head.appendChild(style)

    const STAGE_HEADER_RESERVED_PX = 56 // 44 (menu) + 12 (border/spacing)
    const realInnerHeightDescriptor = Object.getOwnPropertyDescriptor(window, "innerHeight")
        ?? Object.getOwnPropertyDescriptor(Window.prototype, "innerHeight")
    if (realInnerHeightDescriptor?.get) {
        const getRealInnerHeight = realInnerHeightDescriptor.get.bind(window)
        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            get: () => getRealInnerHeight() + STAGE_HEADER_RESERVED_PX
        })
    }

    window.dispatchEvent(new Event("resize"))
}

export async function createWindow(args: ScratchBlockArgs<typeof createWindowBlock>) {
    const existing = await Window.getByLabel(args.LABEL)
    if (existing != null) {
        throw new Error(`Window with label ${args.LABEL} already exists`)
    }

    const url = new URL(args.URL, window.location.href)
    if (url.hostname === window.location.hostname && url.protocol !== window.location.protocol) {
        url.protocol = window.location.protocol
    }

    url.searchParams.set("tauriExtWindow", "1")

    if (args.HIDE_STAGE_CONTROLS) {
        url.searchParams.set("tauriHideStageControls", "1")
    }

    if (args.CLONE_PROJECT) {
        const blob = await Scratch.vm.saveProjectSb3()
        const bytes = Array.from(new Uint8Array(await blob.arrayBuffer()))
        const filePath = await join(await tempDir(), `tauri-ext-clone-${args.LABEL}-${Date.now()}.sb3`)
        await invoke("write_file", { file: filePath, contents: bytes })
        url.searchParams.set(CLONE_PROJECT_PARAM, filePath)
    }

    if (args.AUTO_GREEN_FLAG) {
        url.searchParams.set(AUTO_GREEN_FLAG_PARAM, "1")
    }

    const windowOptions = {
        title: args.TITLE,
        width: args.WIDTH,
        height: args.HEIGHT
    }

    const pathExists = await fetch(url.toString(), { method: "GET" })
        .then(response => {
            response.body?.cancel()
            return response.ok
        })
        .catch(() => false)

    const finalUrl = pathExists ? url : (() => {
        const fallbackUrl = new URL(window.location.href)
        fallbackUrl.search = url.search
        return fallbackUrl
    })()

    await createWebviewWindow(args.LABEL, finalUrl.toString(), windowOptions)

    refreshWindowLabelCache()
}


export const setWindowTitleBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "setWindowTitle",
    text: "Set window title to [TITLE] on window labeled [LABEL]",
    arguments: {
        TITLE: {
            type: Scratch.ArgumentType.STRING
        },
        LABEL: windowLabelArgument,
    }
} as const

export async function setWindowTitle(args: ScratchBlockArgs<typeof setWindowTitleBlock>) {
    const targetWindow = await getWindowByLabel(args.LABEL)
    await targetWindow.setTitle(args.TITLE)
}

export const setWindowSizeBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "setWindowSize",
    text: "Set window size to [WIDTH] width [HEIGHT] height",
    arguments: {
        WIDTH: {
            type: Scratch.ArgumentType.NUMBER
        },
        HEIGHT: {
            type: Scratch.ArgumentType.NUMBER
        }
    }
} as const

export async function setWindowSize(args: ScratchBlockArgs<typeof setWindowMinSizeBlock>) {
    await invoke("set_window_size", { width: args.WIDTH, height: args.HEIGHT })
}

export const setWindowMinSizeBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "setWindowMinSize",
    text: "Set window minimum size to [WIDTH] width [HEIGHT] height",
    arguments: {
        WIDTH: {
            type: Scratch.ArgumentType.NUMBER
        },
        HEIGHT: {
            type: Scratch.ArgumentType.NUMBER
        }
    }
} as const

export async function setWindowMinSize(args: ScratchBlockArgs<typeof setWindowMinSizeBlock>) {
    await invoke("set_window_min_size", { width: args.WIDTH, height: args.HEIGHT })
}

export const setWindowMaxSizeBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "setWindowMaxSize",
    text: "Set window maximum size to [WIDTH] width [HEIGHT] height",
    arguments: {
        WIDTH: {
            type: Scratch.ArgumentType.NUMBER
        },
        HEIGHT: {
            type: Scratch.ArgumentType.NUMBER
        }
    }
} as const

export async function setWindowMaxSize(args: ScratchBlockArgs<typeof setWindowMaxSizeBlock>) {
    await invoke("set_window_max_size", { width: args.WIDTH, height: args.HEIGHT })
}

export const saveWindowStateBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "saveWindowState",
    text: "Save window state",
}

export async function saveWindowState() {
    await invoke("save_window_state");
}

export const restoreWindowStateBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "restoreWindowState",
    text: "Restore window state",
}

export async function restoreWindowState() {
    await invoke("restore_window_state");
}

export const closeBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "closeWindow",
    text: "Close Window (THIS WILL CLOSE YOUR SCRATCH PROJECT!)",
}

export async function closeWindow() {
    await getCurrentWebviewWindow().close()
}

registerBlock("Window", createWindowBlock, createWindow)
registerBlock("Window", setWindowTitleBlock, setWindowTitle)
registerBlock("Window", setWindowSizeBlock, setWindowSize)
registerBlock("Window", setWindowMinSizeBlock, setWindowMinSize)
registerBlock("Window", setWindowMaxSizeBlock, setWindowMaxSize)
registerBlock("Window", saveWindowStateBlock, saveWindowState)
registerBlock("Window", restoreWindowStateBlock, restoreWindowState)
registerBlock("Window", closeBlock, closeWindow)
