import { invoke } from "@tauri-apps/api/core"
import { LogicalSize } from "@tauri-apps/api/window"
import { registerBlock } from "../../../registry"
import { getWindowByLabel, windowLabelArgument } from "../shared"

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

export const setOtherWindowSizeBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "setOtherWindowSize",
    text: "Set width [WIDTH] height [HEIGHT] of window labeled [LABEL]",
    arguments: {
        LABEL: windowLabelArgument,
        HEIGHT: { type: Scratch.ArgumentType.NUMBER },
        WIDTH: { type: Scratch.ArgumentType.NUMBER }
    }
} satisfies Scratch.Block

export async function setOtherWindowSizeLabel(args: ScratchBlockArgs<typeof setOtherWindowSizeBlock>) {
    const window = await getWindowByLabel(args.LABEL)
    await window.setSize(new LogicalSize(args.WIDTH, args.HEIGHT))
}

export const setOtherWindowSizeMinBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "setOtherWindowMinSize",
    text: "Set minimum width [WIDTH] height [HEIGHT] of window labeled [LABEL]",
    arguments: {
        LABEL: windowLabelArgument,
        HEIGHT: { type: Scratch.ArgumentType.NUMBER },
        WIDTH: { type: Scratch.ArgumentType.NUMBER }
    }
} satisfies Scratch.Block

export async function setOtherWindowMinSize(args: ScratchBlockArgs<typeof setOtherWindowSizeBlock>) {
    const window = await getWindowByLabel(args.LABEL)
    await window.setMinSize(new LogicalSize(args.WIDTH, args.WIDTH))
}

export const setWindowDecorationsByLabelBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "setWindowDecorationsByLabel",
    text: "Set window labeled [LABEL] decorations to [DECORATIONS]",
    arguments: {
        LABEL: windowLabelArgument,
        DECORATIONS: {
            type: Scratch.ArgumentType.BOOLEAN,
            defaultValue: true
        }
    }
} as const

export async function setWindowDecorationsByLabel(args: ScratchBlockArgs<typeof setWindowDecorationsByLabelBlock>) {
    const targetWindow = await getWindowByLabel(args.LABEL)
    await targetWindow.setDecorations(args.DECORATIONS)
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

registerBlock("Other Windows", setOtherWindowSizeMinBlock, setOtherWindowMinSize)
registerBlock("Other Windows", setOtherWindowSizeBlock, setOtherWindowSizeLabel)
registerBlock("Other Windows", focusWindowByLabelBlock, focusWindowByLabel)
registerBlock("Other Windows", closeWindowByLabelBlock, closeWindowByLabel)
registerBlock("Other Windows", setWindowDecorationsByLabelBlock, setWindowDecorationsByLabel)
registerBlock("Other Windows", evalInWindowBlock, evalInWindow)
