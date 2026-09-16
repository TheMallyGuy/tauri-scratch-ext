import { invoke } from "@tauri-apps/api/core"
import { join, tempDir } from "@tauri-apps/api/path"
import { getCurrentWebviewWindow, WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { Window } from "@tauri-apps/api/window";

// reporters

export const windowWidthReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "getWWidth",
    text: "Window Width"
}

export async function getWWidth() {
    const [width] = await invoke<[number, number]>("get_window_size")
    return width
}

export const windowHeightReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "getWHeight",
    text: "Window Height"
}

export async function getWHeight() {
    const [, height] = await invoke<[number, number]>("get_window_size")
    return height
}

export const isCloseReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "isCloseable",
    text: "Is Window Closeable",
}

export async function isCloseable() {
    return await getCurrentWebviewWindow().isClosable()
}

export const isFocusedReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "isFocused",
    text: "Is Window Focused",
}

export async function isFocused() {
    return await getCurrentWebviewWindow().isFocused()
}

export const isFullscreenReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "isFullscreen",
    text: "Is Window Fullscreened",
}

export async function isFullscreen() {
    return await getCurrentWebviewWindow().isFullscreen()
}

export const myWindowLabelReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "myWindowLabel",
    text: "This window's label"
}

export function myWindowLabel() {
    return getCurrentWebviewWindow().label
}

export const isWindowLabelReporter = {
    blockType: Scratch.BlockType.BOOLEAN,
    opcode: "isWindowLabel",
    text: "This window is labeled [LABEL]?",
    arguments: {
        LABEL: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "main"
        }
    }
} as const

export function isWindowLabel(args: ScratchBlockArgs<typeof isWindowLabelReporter>) {
    return getCurrentWebviewWindow().label === args.LABEL
}


let cachedWindowLabels: string[] = ["main"]

function refreshWindowLabelCache() {
    Window.getAll().then(windows => {
        cachedWindowLabels = windows.map(w => w.label)
    })
}
refreshWindowLabelCache()

export function windowLabelMenu() {
    refreshWindowLabelCache()
    return cachedWindowLabels
}

export const windowLabelArgument = {
    type: Scratch.ArgumentType.STRING,
    defaultValue: "main",
    menu: "windowLabelMenu"
} as const

async function getWindowByLabel(label: string) {
    const window = await Window.getByLabel(label)
    if (window == null) {
        throw new Error(`Window with label ${label} not found`)
    }
    return window
}

// commands

export const createWindowBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "createWindow",
    text: "Create window labeled [LABEL] with url [URL] title [TITLE] width [WIDTH] height [HEIGHT] clone current project? [CLONE_PROJECT] auto green flag [AUTO_GREEN_FLAG] hide stage controls [HIDE_STAGE_CONTROLS]",
    arguments: {
        LABEL: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "new-window"
        },
        // Defaults to this same page's URL, since that's what "another
        // window running this project" means for a packaged single-page
        // Tauri app - it boots the same sprites/code, just a fresh instance.
        // Point it elsewhere only if you're intentionally loading something else.
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
const isCloningProject = new URLSearchParams(window.location.search).has(CLONE_PROJECT_PARAM)

if (new URLSearchParams(window.location.search).has(AUTO_GREEN_FLAG_PARAM)) {
    let pressed = false
    const press = () => {
        if (pressed) return
        pressed = true

        // we start son
        Scratch.vm.start()
        Scratch.vm.greenFlag()
    }

    if (isCloningProject) {

        Scratch.vm.runtime.once("PROJECT_LOADED", press)
    } else {

        const pressWhenReady = () => {
            if (pressed || Scratch.vm.runtime.targets.length === 0) return
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
}

export async function createWindow(args: ScratchBlockArgs<typeof createWindowBlock>) {
    const existing = await Window.getByLabel(args.LABEL)
    if (existing != null) {
        throw new Error(`Window with label ${args.LABEL} already exists`)
    }

    const url = new URL(args.URL, window.location.href)

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

    const webview = new WebviewWindow(args.LABEL, {
        url: url.toString(),
        title: args.TITLE,
        width: args.WIDTH,
        height: args.HEIGHT
    })

    await new Promise<void>((resolve, reject) => {
        webview.once("tauri://created", () => resolve())
        webview.once("tauri://error", (event) => reject(new Error(`Failed to create window: ${JSON.stringify(event.payload)}`)))
    })

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

// other windows, by label

export const isFocusedByLabelReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "isFocusedByLabel",
    text: "Is window labeled [LABEL] focused?",
    arguments: {
        LABEL: windowLabelArgument
    }
} as const

export async function isFocusedByLabel(args: ScratchBlockArgs<typeof isFocusedByLabelReporter>) {
    const targetWindow = await getWindowByLabel(args.LABEL)
    return await targetWindow.isFocused()
}

export const isFullscreenByLabelReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "isFullscreenByLabel",
    text: "Is window labeled [LABEL] fullscreened?",
    arguments: {
        LABEL: windowLabelArgument
    }
} as const

export async function isFullscreenByLabel(args: ScratchBlockArgs<typeof isFullscreenByLabelReporter>) {
    const targetWindow = await getWindowByLabel(args.LABEL)
    return await targetWindow.isFullscreen()
}

export const isCloseableByLabelReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "isCloseableByLabel",
    text: "Is window labeled [LABEL] closeable?",
    arguments: {
        LABEL: windowLabelArgument
    }
} as const

export async function isCloseableByLabel(args: ScratchBlockArgs<typeof isCloseableByLabelReporter>) {
    const targetWindow = await getWindowByLabel(args.LABEL)
    return await targetWindow.isClosable()
}

export const getWWidthByLabelReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "getWWidthByLabel",
    text: "Width of window labeled [LABEL]",
    arguments: {
        LABEL: windowLabelArgument
    }
} as const

export async function getWWidthByLabel(args: ScratchBlockArgs<typeof getWWidthByLabelReporter>) {
    const targetWindow = await getWindowByLabel(args.LABEL)
    const size = await targetWindow.innerSize()
    return size.width
}

export const getWHeightByLabelReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "getWHeightByLabel",
    text: "Height of window labeled [LABEL]",
    arguments: {
        LABEL: windowLabelArgument
    }
} as const

export async function getWHeightByLabel(args: ScratchBlockArgs<typeof getWHeightByLabelReporter>) {
    const targetWindow = await getWindowByLabel(args.LABEL)
    const size = await targetWindow.innerSize()
    return size.height
}

export const focusWindowByLabelBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "focusWindowByLabel",
    text: "Focus window labeled [LABEL]",
    arguments: {
        LABEL: windowLabelArgument
    }
} as const

export async function focusWindowByLabel(args: ScratchBlockArgs<typeof focusWindowByLabelBlock>) {
    const targetWindow = await getWindowByLabel(args.LABEL)
    await targetWindow.setFocus()
}

export const closeWindowByLabelBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "closeWindowByLabel",
    text: "Close window labeled [LABEL]",
    arguments: {
        LABEL: windowLabelArgument
    }
} as const

export async function closeWindowByLabel(args: ScratchBlockArgs<typeof closeWindowByLabelBlock>) {
    const targetWindow = await getWindowByLabel(args.LABEL)
    await targetWindow.close()
}

export const evalInWindowBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "evalInWindow",
    text: "Run javascript (or eval) [SCRIPT] in window labeled [LABEL]",
    arguments: {
        SCRIPT: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "console.log('hi')"
        },
        LABEL: windowLabelArgument
    }
} as const

export async function evalInWindow(args: ScratchBlockArgs<typeof evalInWindowBlock>) {
    await invoke("eval_in_window", { label: args.LABEL, script: args.SCRIPT })
}
