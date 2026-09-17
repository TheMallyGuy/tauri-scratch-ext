import { registerBlock } from "../../../registry"
import { getWindowByLabel, windowLabelArgument } from "../shared"

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

registerBlock("Other Windows", isFocusedByLabelReporter, isFocusedByLabel)
registerBlock("Other Windows", isFullscreenByLabelReporter, isFullscreenByLabel)
registerBlock("Other Windows", isCloseableByLabelReporter, isCloseableByLabel)
registerBlock("Other Windows", getWWidthByLabelReporter, getWWidthByLabel)
registerBlock("Other Windows", getWHeightByLabelReporter, getWHeightByLabel)
