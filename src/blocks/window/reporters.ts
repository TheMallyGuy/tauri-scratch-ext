import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { registerBlock } from "../../registry"

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

registerBlock("Window", windowWidthReporter, getWWidth)
registerBlock("Window", windowHeightReporter, getWHeight)
registerBlock("Window", isFocusedReporter, isFocused)
registerBlock("Window", isFullscreenReporter, isFullscreen)
registerBlock("Window", isCloseReporter, isCloseable)
registerBlock("Window", myWindowLabelReporter, myWindowLabel)
registerBlock("Window", isWindowLabelReporter, isWindowLabel)
