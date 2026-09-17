import { availableMonitors, currentMonitor } from "@tauri-apps/api/window";
import { registerBlock } from "../registry"

export const screenSizeReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "screenSize",
    text: "Get screen size",
    func: "getScreenSize"
} satisfies Scratch.Block


export async function getScreenSize() {
    const monitors = await currentMonitor()

    return JSON.stringify(monitors?.size)
}

export const availableMonitorsReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "availableMonitors",
    text: "Get available monitors",
    func: "getAvailableMonitors"
} satisfies Scratch.Block


export async function getAvailableMonitors() {
    const monitors = await availableMonitors()

    return JSON.stringify(monitors)
}

registerBlock("Screen", screenSizeReporter, getScreenSize)
registerBlock("Screen", availableMonitorsReporter, getAvailableMonitors)