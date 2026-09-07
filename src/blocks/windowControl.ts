import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"

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


// commands

export const setWindowTitleBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "setWindowTitle",
    text: "Set window title to [TITLE]",
    arguments: {
        TITLE: {
            type: Scratch.ArgumentType.STRING
        }
    }
} as const

export async function setWindowTitle(args: ScratchBlockArgs<typeof setWindowTitleBlock>) {
    await getCurrentWebviewWindow().setTitle(args.TITLE)
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
    await saveWindowState();
}

export const restoreWindowStateBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "restoreWindowState",
    text: "Restore window state",
}

export async function restoreWindowState() {
    await restoreWindowState();
}

export const closeBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "closeWindow",
    text: "Close Window (THIS WILL CLOSE YOUR SCRATCH PROJECT!)",
}

export async function closeWindow() {
    await getCurrentWebviewWindow().close()
}
