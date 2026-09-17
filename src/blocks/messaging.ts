import { emitTo, listen } from "@tauri-apps/api/event"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { registerBlock } from "../registry"
import { windowLabelArgument } from "./window/shared"

const MESSAGE_EVENT = "tauriExtension-window-message"

let lastReceivedPayload = ""

listen<string>(MESSAGE_EVENT, (event) => {
    lastReceivedPayload = event.payload
    Scratch.vm.runtime.startHats("tauriExtension_whenDataReceived")
}, { target: getCurrentWebviewWindow().label })

export const sendDataToWindowBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "sendDataToWindow",
    text: "Send data [DATA] to window labeled [LABEL]",
    arguments: {
        DATA: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "{}"
        },
        LABEL: windowLabelArgument
    }
} as const

export async function sendDataToWindow(args: ScratchBlockArgs<typeof sendDataToWindowBlock>) {
    await emitTo(args.LABEL, MESSAGE_EVENT, args.DATA)
}

export const whenDataReceivedBlock = {
    blockType: Scratch.BlockType.EVENT,
    opcode: "whenDataReceived",
    text: "when data received from another window",
    isEdgeActivated: false
} as const

export const lastReceivedDataReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "lastReceivedData",
    text: "last received data"
} as const

export function lastReceivedData() {
    return lastReceivedPayload
}

registerBlock("Cross-Window Messaging", sendDataToWindowBlock, sendDataToWindow)
registerBlock("Cross-Window Messaging", whenDataReceivedBlock)
registerBlock("Cross-Window Messaging", lastReceivedDataReporter, lastReceivedData)
