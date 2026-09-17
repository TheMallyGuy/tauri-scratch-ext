// reporters

import { isPermissionGranted, requestPermission, sendNotification } from "@tauri-apps/plugin-notification";
import { registerBlock } from "../registry"

export const canSendNotifReport = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "canSendNotif",
    text: "Can send notification"
}

export async function canSendNotif() {
    return await isPermissionGranted()
}

// blocks

export const requestNotifBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "reqNotifPerm",
    text: "Request notification permission"
}

export async function reqNotifPerm() {
    return await requestPermission()
}


export const sendNotifBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "sendNotif",
    text: "Notification send [TITLE] title with description [DESCRIPTION]",
    arguments: {
        TITLE: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "Tauri"
        },
        DESCRIPTION: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "Tauri is awesome!"
        }
    }
}

export async function sendNotif(args: ScratchBlockArgs<typeof sendNotifBlock>) {
    return await sendNotification({ title: args.TITLE, body: args.DESCRIPTION })
}

registerBlock("Notifications", canSendNotifReport, canSendNotif)
registerBlock("Notifications", requestNotifBlock, reqNotifPerm)
registerBlock("Notifications", sendNotifBlock, sendNotif)