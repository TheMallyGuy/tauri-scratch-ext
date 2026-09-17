import { cursorPosition, monitorFromPoint } from "@tauri-apps/api/window";
import { registerBlock } from "../registry"

export const cursorPositionReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "cursorPosition",
    text: "Get cursor position",
    func: "getCursorPosition"
} satisfies Scratch.Block


export async function getCursorPosition() {
    const position = await cursorPosition()

    return JSON.stringify(position)
}

export const monitorFromPointReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "monitorFromPoint",
    text: "Get monitor from point x: [X] y: [Y]",
    func: "getMonitorFromPoint",
    arguments: {
        X: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0
        },
        Y: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0
        }
    }
} satisfies Scratch.Block

export async function getMonitorFromPoint(args: ScratchBlockArgs<typeof monitorFromPointReporter>) {
    const monitor = await monitorFromPoint(args.X, args.Y)
    return JSON.stringify(monitor)
}

registerBlock("Cursor", cursorPositionReporter, getCursorPosition)
registerBlock("Cursor", monitorFromPointReporter, getMonitorFromPoint)
